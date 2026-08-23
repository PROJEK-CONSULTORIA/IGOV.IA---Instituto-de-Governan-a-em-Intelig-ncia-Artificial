-- ENUMS
CREATE TYPE public.app_role AS ENUM ('USER','ADMIN','SUPER_ADMIN');
CREATE TYPE public.subscription_status AS ENUM ('ACTIVE','EXPIRED');
CREATE TYPE public.diagnostic_status AS ENUM ('IN_PROGRESS','COMPLETED','CANCELLED');
CREATE TYPE public.report_status AS ENUM ('PENDING','GENERATING','READY','FAILED');
CREATE TYPE public.content_status AS ENUM ('DRAFT','ACTIVE','ARCHIVED');

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

-- ORGANIZATIONS
CREATE TABLE public.organizations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.organizations TO authenticated;
GRANT ALL ON public.organizations TO service_role;
ALTER TABLE public.organizations ENABLE ROW LEVEL SECURITY;

-- PROFILES
CREATE TABLE public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text NOT NULL,
  phone text NOT NULL,
  email text NOT NULL,
  organization_id uuid REFERENCES public.organizations(id) ON DELETE SET NULL,
  organization_name text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- USER ROLES
CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL DEFAULT 'USER',
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role);
$$;

CREATE OR REPLACE FUNCTION public.is_admin(_user_id uuid)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role IN ('ADMIN','SUPER_ADMIN'));
$$;

CREATE POLICY "roles_select_own" ON public.user_roles FOR SELECT TO authenticated
  USING (user_id = auth.uid() OR public.is_admin(auth.uid()));

CREATE POLICY "org_select" ON public.organizations FOR SELECT TO authenticated
  USING (public.is_admin(auth.uid()) OR EXISTS (
    SELECT 1 FROM public.profiles p WHERE p.organization_id = organizations.id AND p.id = auth.uid()));

CREATE POLICY "profiles_select_own" ON public.profiles FOR SELECT TO authenticated
  USING (id = auth.uid() OR public.is_admin(auth.uid()));
CREATE POLICY "profiles_update_own" ON public.profiles FOR UPDATE TO authenticated
  USING (id = auth.uid()) WITH CHECK (id = auth.uid());

-- PLANS
CREATE TABLE public.plans (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text NOT NULL UNIQUE,
  access_days integer NOT NULL,
  diagnostics_limit integer NOT NULL,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.plans TO authenticated;
GRANT ALL ON public.plans TO service_role;
ALTER TABLE public.plans ENABLE ROW LEVEL SECURITY;
CREATE POLICY "plans_select" ON public.plans FOR SELECT TO authenticated USING (true);
INSERT INTO public.plans (name, slug, access_days, diagnostics_limit)
VALUES ('Free','free',14,1);

-- SUBSCRIPTIONS
CREATE TABLE public.subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  plan_id uuid NOT NULL REFERENCES public.plans(id),
  started_at timestamptz NOT NULL DEFAULT now(),
  expires_at timestamptz NOT NULL,
  status public.subscription_status NOT NULL DEFAULT 'ACTIVE',
  diagnostics_limit_snapshot integer NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE UNIQUE INDEX subscriptions_one_per_user ON public.subscriptions(user_id);
GRANT SELECT ON public.subscriptions TO authenticated;
GRANT ALL ON public.subscriptions TO service_role;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "subs_select_own" ON public.subscriptions FOR SELECT TO authenticated
  USING (user_id = auth.uid() OR public.is_admin(auth.uid()));

-- FRAMEWORK
CREATE TABLE public.dimensions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  position integer NOT NULL UNIQUE,
  name text NOT NULL,
  description text,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.dimensions TO authenticated;
GRANT INSERT, UPDATE, DELETE ON public.dimensions TO authenticated;
GRANT ALL ON public.dimensions TO service_role;
ALTER TABLE public.dimensions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "dimensions_select" ON public.dimensions FOR SELECT TO authenticated USING (true);
CREATE POLICY "dimensions_admin_write" ON public.dimensions FOR ALL TO authenticated
  USING (public.is_admin(auth.uid())) WITH CHECK (public.is_admin(auth.uid()));

CREATE TABLE public.questions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  dimension_id uuid NOT NULL REFERENCES public.dimensions(id) ON DELETE CASCADE,
  number integer NOT NULL,
  statement text NOT NULL,
  position integer NOT NULL,
  status public.content_status NOT NULL DEFAULT 'ACTIVE',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (dimension_id, position)
);
CREATE UNIQUE INDEX questions_number_unique ON public.questions(number);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.questions TO authenticated;
GRANT ALL ON public.questions TO service_role;
ALTER TABLE public.questions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "questions_select" ON public.questions FOR SELECT TO authenticated USING (true);
CREATE POLICY "questions_admin_write" ON public.questions FOR ALL TO authenticated
  USING (public.is_admin(auth.uid())) WITH CHECK (public.is_admin(auth.uid()));

CREATE TABLE public.answer_options (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  question_id uuid NOT NULL REFERENCES public.questions(id) ON DELETE CASCADE,
  level integer NOT NULL CHECK (level BETWEEN 1 AND 9),
  answer_text text NOT NULL,
  score integer NOT NULL CHECK (score BETWEEN 1 AND 9),
  interpretation text,
  recommended_action text,
  status public.content_status NOT NULL DEFAULT 'ACTIVE',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (question_id, level)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.answer_options TO authenticated;
GRANT ALL ON public.answer_options TO service_role;
ALTER TABLE public.answer_options ENABLE ROW LEVEL SECURITY;
CREATE POLICY "answer_options_select" ON public.answer_options FOR SELECT TO authenticated USING (true);
CREATE POLICY "answer_options_admin_write" ON public.answer_options FOR ALL TO authenticated
  USING (public.is_admin(auth.uid())) WITH CHECK (public.is_admin(auth.uid()));

-- MATURITY LEVELS
CREATE TABLE public.maturity_levels (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  level integer NOT NULL UNIQUE CHECK (level BETWEEN 1 AND 9),
  min_score numeric(3,2) NOT NULL,
  max_score numeric(3,2) NOT NULL,
  name text NOT NULL,
  interpretation text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.maturity_levels TO authenticated;
GRANT ALL ON public.maturity_levels TO service_role;
ALTER TABLE public.maturity_levels ENABLE ROW LEVEL SECURITY;
CREATE POLICY "maturity_select" ON public.maturity_levels FOR SELECT TO authenticated USING (true);
CREATE POLICY "maturity_admin_write" ON public.maturity_levels FOR ALL TO authenticated
  USING (public.is_admin(auth.uid())) WITH CHECK (public.is_admin(auth.uid()));

INSERT INTO public.maturity_levels (level, min_score, max_score, name, interpretation) VALUES
 (1,1.00,1.99,'Nível 1','Estágio inicial de maturidade em Governança de IA.'),
 (2,2.00,2.99,'Nível 2','Práticas incipientes e pontuais de Governança de IA.'),
 (3,3.00,3.99,'Nível 3','Iniciativas isoladas, ainda sem padronização.'),
 (4,4.00,4.99,'Nível 4','Práticas em estruturação, com lacunas relevantes.'),
 (5,5.00,5.99,'Nível 5','Base estabelecida, com evolução necessária em várias dimensões.'),
 (6,6.00,6.99,'Nível 6','Práticas consolidadas em boa parte das dimensões.'),
 (7,7.00,7.99,'Nível 7','Governança de IA madura e integrada à gestão.'),
 (8,8.00,8.99,'Nível 8','Governança de IA otimizada e monitorada continuamente.'),
 (9,9.00,9.00,'Nível 9','Referência em Governança de Inteligência Artificial.');

-- PRIORITY RULES
CREATE TABLE public.report_priority_rules (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  min_score integer NOT NULL,
  max_score integer NOT NULL,
  label text NOT NULL,
  rank integer NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.report_priority_rules TO authenticated;
GRANT ALL ON public.report_priority_rules TO service_role;
ALTER TABLE public.report_priority_rules ENABLE ROW LEVEL SECURITY;
CREATE POLICY "priority_select" ON public.report_priority_rules FOR SELECT TO authenticated USING (true);
CREATE POLICY "priority_admin_write" ON public.report_priority_rules FOR ALL TO authenticated
  USING (public.is_admin(auth.uid())) WITH CHECK (public.is_admin(auth.uid()));
INSERT INTO public.report_priority_rules (min_score, max_score, label, rank) VALUES
 (1,3,'Prioridade Crítica',1),(4,5,'Prioridade Alta',2),(6,7,'Evolução',3),(8,8,'Otimização',4),(9,9,'Melhoria contínua',5);

-- DIAGNOSTICS
CREATE TABLE public.diagnostics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  organization_id uuid REFERENCES public.organizations(id) ON DELETE SET NULL,
  subscription_id uuid REFERENCES public.subscriptions(id) ON DELETE SET NULL,
  status public.diagnostic_status NOT NULL DEFAULT 'IN_PROGRESS',
  framework_version text NOT NULL DEFAULT '1.0',
  started_at timestamptz NOT NULL DEFAULT now(),
  last_activity_at timestamptz NOT NULL DEFAULT now(),
  completed_at timestamptz,
  current_dimension integer NOT NULL DEFAULT 1,
  answered_count integer NOT NULL DEFAULT 0,
  progress_percentage numeric(5,2) NOT NULL DEFAULT 0,
  global_score numeric(3,2),
  global_percentage numeric(5,2),
  maturity_level integer,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE UNIQUE INDEX diagnostics_one_per_user ON public.diagnostics(user_id) WHERE status <> 'CANCELLED';
GRANT SELECT, INSERT, UPDATE ON public.diagnostics TO authenticated;
GRANT ALL ON public.diagnostics TO service_role;
ALTER TABLE public.diagnostics ENABLE ROW LEVEL SECURITY;
CREATE POLICY "diag_select_own" ON public.diagnostics FOR SELECT TO authenticated
  USING (user_id = auth.uid() OR public.is_admin(auth.uid()));
CREATE POLICY "diag_insert_own" ON public.diagnostics FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid());
CREATE POLICY "diag_update_own" ON public.diagnostics FOR UPDATE TO authenticated
  USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());

CREATE TABLE public.diagnostic_answers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  diagnostic_id uuid NOT NULL REFERENCES public.diagnostics(id) ON DELETE CASCADE,
  question_id uuid NOT NULL REFERENCES public.questions(id) ON DELETE CASCADE,
  answer_option_id uuid NOT NULL REFERENCES public.answer_options(id),
  score_snapshot integer NOT NULL,
  answer_text_snapshot text NOT NULL,
  interpretation_snapshot text,
  recommended_action_snapshot text,
  answered_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (diagnostic_id, question_id)
);
GRANT SELECT, INSERT, UPDATE ON public.diagnostic_answers TO authenticated;
GRANT ALL ON public.diagnostic_answers TO service_role;
ALTER TABLE public.diagnostic_answers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "answers_select_own" ON public.diagnostic_answers FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM public.diagnostics d WHERE d.id = diagnostic_id
    AND (d.user_id = auth.uid() OR public.is_admin(auth.uid()))));
CREATE POLICY "answers_write_own" ON public.diagnostic_answers FOR INSERT TO authenticated
  WITH CHECK (EXISTS (SELECT 1 FROM public.diagnostics d WHERE d.id = diagnostic_id AND d.user_id = auth.uid()));
CREATE POLICY "answers_update_own" ON public.diagnostic_answers FOR UPDATE TO authenticated
  USING (EXISTS (SELECT 1 FROM public.diagnostics d WHERE d.id = diagnostic_id AND d.user_id = auth.uid()))
  WITH CHECK (EXISTS (SELECT 1 FROM public.diagnostics d WHERE d.id = diagnostic_id AND d.user_id = auth.uid()));

CREATE TABLE public.dimension_scores (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  diagnostic_id uuid NOT NULL REFERENCES public.diagnostics(id) ON DELETE CASCADE,
  dimension_id uuid NOT NULL REFERENCES public.dimensions(id) ON DELETE CASCADE,
  dimension_position integer NOT NULL,
  dimension_name text NOT NULL,
  score numeric(3,2) NOT NULL,
  maturity_level integer NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (diagnostic_id, dimension_id)
);
GRANT SELECT, INSERT ON public.dimension_scores TO authenticated;
GRANT ALL ON public.dimension_scores TO service_role;
ALTER TABLE public.dimension_scores ENABLE ROW LEVEL SECURITY;
CREATE POLICY "dimscores_select_own" ON public.dimension_scores FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM public.diagnostics d WHERE d.id = diagnostic_id
    AND (d.user_id = auth.uid() OR public.is_admin(auth.uid()))));

CREATE TABLE public.diagnostic_scores (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  diagnostic_id uuid NOT NULL UNIQUE REFERENCES public.diagnostics(id) ON DELETE CASCADE,
  global_score numeric(3,2) NOT NULL,
  percentage numeric(5,2) NOT NULL,
  maturity_level integer NOT NULL,
  maturity_name text NOT NULL,
  maturity_interpretation text,
  computed_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.diagnostic_scores TO authenticated;
GRANT ALL ON public.diagnostic_scores TO service_role;
ALTER TABLE public.diagnostic_scores ENABLE ROW LEVEL SECURITY;
CREATE POLICY "scores_select_own" ON public.diagnostic_scores FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM public.diagnostics d WHERE d.id = diagnostic_id
    AND (d.user_id = auth.uid() OR public.is_admin(auth.uid()))));

-- REPORTS
CREATE TABLE public.reports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  public_report_id text NOT NULL UNIQUE,
  diagnostic_id uuid NOT NULL UNIQUE REFERENCES public.diagnostics(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  organization_id uuid REFERENCES public.organizations(id) ON DELETE SET NULL,
  report_type text NOT NULL DEFAULT 'FREE_SIMPLIFIED_MATURITY_REPORT',
  framework_version text NOT NULL DEFAULT '1.0',
  generated_at timestamptz,
  storage_path text,
  file_name text,
  status public.report_status NOT NULL DEFAULT 'PENDING',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.reports TO authenticated;
GRANT ALL ON public.reports TO service_role;
ALTER TABLE public.reports ENABLE ROW LEVEL SECURITY;
CREATE POLICY "reports_select_own" ON public.reports FOR SELECT TO authenticated
  USING (user_id = auth.uid() OR public.is_admin(auth.uid()));

-- CONSENTS + AUDIT
CREATE TABLE public.consent_records (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  consent_type text NOT NULL,
  accepted boolean NOT NULL DEFAULT true,
  accepted_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.consent_records TO authenticated;
GRANT ALL ON public.consent_records TO service_role;
ALTER TABLE public.consent_records ENABLE ROW LEVEL SECURITY;
CREATE POLICY "consents_select_own" ON public.consent_records FOR SELECT TO authenticated
  USING (user_id = auth.uid() OR public.is_admin(auth.uid()));

CREATE TABLE public.audit_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  actor_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  action text NOT NULL,
  entity text NOT NULL,
  entity_id text,
  previous_values jsonb,
  new_values jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.audit_logs TO authenticated;
GRANT ALL ON public.audit_logs TO service_role;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "audit_admin_select" ON public.audit_logs FOR SELECT TO authenticated
  USING (public.is_admin(auth.uid()));

-- TRIGGERS: updated_at
CREATE TRIGGER t_org_upd BEFORE UPDATE ON public.organizations FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER t_prof_upd BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER t_sub_upd BEFORE UPDATE ON public.subscriptions FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER t_dim_upd BEFORE UPDATE ON public.dimensions FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER t_q_upd BEFORE UPDATE ON public.questions FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER t_ao_upd BEFORE UPDATE ON public.answer_options FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER t_diag_upd BEFORE UPDATE ON public.diagnostics FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER t_ans_upd BEFORE UPDATE ON public.diagnostic_answers FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER t_rep_upd BEFORE UPDATE ON public.reports FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- TRIGGER: new user -> org + profile + role + FREE subscription
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  v_org_id uuid;
  v_plan public.plans%ROWTYPE;
  v_org_name text;
BEGIN
  v_org_name := COALESCE(NULLIF(NEW.raw_user_meta_data->>'organization_name',''), 'Organização');
  INSERT INTO public.organizations (name) VALUES (v_org_name) RETURNING id INTO v_org_id;

  INSERT INTO public.profiles (id, full_name, phone, email, organization_id, organization_name)
  VALUES (NEW.id,
          COALESCE(NULLIF(NEW.raw_user_meta_data->>'full_name',''), NEW.email),
          COALESCE(NEW.raw_user_meta_data->>'phone',''),
          NEW.email, v_org_id, v_org_name);

  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, CASE WHEN lower(NEW.email) = 'fabio.martins@igovia.com.br' THEN 'SUPER_ADMIN'::public.app_role ELSE 'USER'::public.app_role END);

  SELECT * INTO v_plan FROM public.plans WHERE slug = 'free';
  INSERT INTO public.subscriptions (user_id, plan_id, started_at, expires_at, diagnostics_limit_snapshot)
  VALUES (NEW.id, v_plan.id, now(), now() + (v_plan.access_days || ' days')::interval, v_plan.diagnostics_limit);

  IF COALESCE(NEW.raw_user_meta_data->>'accepted_terms','') = 'true' THEN
    INSERT INTO public.consent_records (user_id, consent_type) VALUES (NEW.id, 'TERMS_OF_USE');
  END IF;
  IF COALESCE(NEW.raw_user_meta_data->>'accepted_privacy','') = 'true' THEN
    INSERT INTO public.consent_records (user_id, consent_type) VALUES (NEW.id, 'PRIVACY_POLICY');
  END IF;
  RETURN NEW;
END; $$;

CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- TRIGGER: block answers when completed or access expired; keep progress in sync
CREATE OR REPLACE FUNCTION public.guard_diagnostic_answer()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE v_diag public.diagnostics%ROWTYPE; v_expires timestamptz; v_q_dim uuid; v_opt_q uuid;
BEGIN
  SELECT * INTO v_diag FROM public.diagnostics WHERE id = NEW.diagnostic_id;
  IF v_diag.status <> 'IN_PROGRESS' THEN
    RAISE EXCEPTION 'Diagnóstico concluído: respostas imutáveis';
  END IF;
  SELECT expires_at INTO v_expires FROM public.subscriptions WHERE user_id = v_diag.user_id;
  IF v_expires IS NOT NULL AND now() > v_expires THEN
    RAISE EXCEPTION 'Período de acesso gratuito expirado';
  END IF;
  SELECT question_id INTO v_opt_q FROM public.answer_options WHERE id = NEW.answer_option_id;
  IF v_opt_q IS DISTINCT FROM NEW.question_id THEN
    RAISE EXCEPTION 'Alternativa não pertence à pergunta';
  END IF;
  RETURN NEW;
END; $$;

CREATE TRIGGER t_guard_answer BEFORE INSERT OR UPDATE ON public.diagnostic_answers
FOR EACH ROW EXECUTE FUNCTION public.guard_diagnostic_answer();

CREATE OR REPLACE FUNCTION public.block_answer_delete()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN RAISE EXCEPTION 'Respostas não podem ser removidas'; END; $$;
CREATE TRIGGER t_block_answer_delete BEFORE DELETE ON public.diagnostic_answers
FOR EACH ROW EXECUTE FUNCTION public.block_answer_delete();

CREATE OR REPLACE FUNCTION public.sync_diagnostic_progress()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE v_count integer; v_total integer;
BEGIN
  SELECT count(*) INTO v_count FROM public.diagnostic_answers WHERE diagnostic_id = NEW.diagnostic_id;
  SELECT count(*) INTO v_total FROM public.questions WHERE status = 'ACTIVE';
  IF v_total = 0 THEN v_total := 50; END IF;
  UPDATE public.diagnostics
     SET answered_count = v_count,
         progress_percentage = round((v_count::numeric / v_total) * 100, 2),
         last_activity_at = now()
   WHERE id = NEW.diagnostic_id;
  RETURN NEW;
END; $$;

CREATE TRIGGER t_sync_progress AFTER INSERT OR UPDATE ON public.diagnostic_answers
FOR EACH ROW EXECUTE FUNCTION public.sync_diagnostic_progress();

-- TRIGGER: completed diagnostics are immutable except report metadata
CREATE OR REPLACE FUNCTION public.guard_diagnostic_update()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF OLD.status = 'COMPLETED' AND NEW.status <> 'COMPLETED' THEN
    RAISE EXCEPTION 'Diagnóstico concluído não pode ser reaberto';
  END IF;
  RETURN NEW;
END; $$;
CREATE TRIGGER t_guard_diag BEFORE UPDATE ON public.diagnostics
FOR EACH ROW EXECUTE FUNCTION public.guard_diagnostic_update();

-- 10 DIMENSÕES OFICIAIS
INSERT INTO public.dimensions (position, name) VALUES
 (1,'Estratégia e Governança'),
 (2,'Cultura, Pessoas e Comunicação'),
 (3,'Estrutura Tecnológica e Automação'),
 (4,'Investimentos, Custos e Despesas'),
 (5,'Qualidade de Dados'),
 (6,'Impacto no Usuário Final'),
 (7,'Compliance, Riscos e Ética'),
 (8,'Segurança da Informação'),
 (9,'Fornecedores e Integrações'),
 (10,'Monitoramento e Melhoria Contínua');