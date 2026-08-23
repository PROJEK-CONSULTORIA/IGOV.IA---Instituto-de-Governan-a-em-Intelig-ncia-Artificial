# Plano FREE IGOV.IA — cadastro, diagnóstico e relatório

Entrega única, cobrindo do banco de dados até a interface, preservando o design atual do site e a página /precos.

## 1. Backend (Lovable Cloud)

Ativação do backend do projeto (banco, autenticação, storage). Hoje o site é 100% estático — nada disso existe ainda.

Tabelas:

- `profiles` (nome, telefone, e-mail, organização), `organizations`
- `user_roles` (`USER`, `ADMIN`, `SUPER_ADMIN`) em tabela separada + função `has_role`
- `plans` (apenas FREE: 14 dias, 1 diagnóstico), `subscriptions` (início, expiração, status, limite snapshot)
- `dimensions`, `questions`, `answer_options` (nível 1–9, score, interpretação, ação recomendada)
- `diagnostics`, `diagnostic_answers` (com snapshots de score/interpretação/ação), `dimension_scores`, `diagnostic_scores`
- `maturity_levels` (faixas 1–9, configurável), `report_priority_rules` (Crítica/Alta/Evolução/Otimização/Melhoria contínua)
- `reports` (id público tipo `IGOVIA-2026-A8F29C`, status, storage_path, versão do framework)
- `consent_records` (Termos e Privacidade), `audit_logs`

RLS em todas as tabelas: usuário lê/escreve apenas os próprios dados; ADMIN/SUPER_ADMIN via `has_role`. Grants explícitos por tabela. Constraint única `(diagnostic_id, question_id)` e unicidade parcial de diagnóstico ativo por usuário para impedir duplicidade (dois cliques, duas abas).

Conteúdo do framework: as 10 dimensões são cadastradas; perguntas e alternativas ficam vazias, para você cadastrar pelo Admin. O diagnóstico só habilita quando existirem 50 perguntas ativas com 9 alternativas cada — antes disso o Dashboard mostra aviso de conteúdo não publicado.

Admin inicial: `fabio.martins@igovia.com.br` recebe SUPER_ADMIN automaticamente ao se cadastrar.

## 2. Contas e acesso

- `/cadastro`: nome, telefone (máscara brasileira), e-mail, organização, senha, confirmar senha, aceite de Termos e de Privacidade. Validação no front e no backend; sem confirmação de e-mail (entra direto no Dashboard).
- Ao criar a conta, o backend cria perfil, organização e assinatura FREE com `expires_at = agora + 14 dias`.
- `/login` e `/recuperar-senha` (mensagem genérica, sem revelar se o e-mail existe).
- Botão “Experimentar grátis” em /precos passa a decidir o destino: visitante → `/cadastro`; usuário ativo → `/dashboard`; diagnóstico concluído → `/dashboard` com “Ver relatório”.

## 3. Dashboard `/dashboard`

Saudação, organização, selo Plano FREE, contador de dias calculado no servidor. Card do diagnóstico com os três estados: não iniciado (Iniciar), em andamento (X de 50, %, Continuar), concluído (score, nível, data, Ver relatório + Baixar PDF). Nunca oferece um segundo diagnóstico. Expirado sem conclusão: bloqueio com CTA “Conhecer outros planos”. Expirado com conclusão: modo restrito, só leitura do relatório.

## 4. Motor do diagnóstico

Rota `/diagnostico/{id}/dimensao/{n}`: cabeçalho IGOV.IA + “Salvar e sair”, “Dimensão X de 10”, nome, barra de progresso (respostas persistidas / 50), “Questões X a Y de 50”, 5 cards de pergunta com 9 radio cards (sem score, sem interpretação, sem ação). Autosave por resposta com “✓ Resposta salva” e estado de erro. Voltar sempre habilitado; “Próxima dimensão” só com as 5 respondidas — e o backend redireciona para a primeira dimensão incompleta se a URL for manipulada. Dimensão 10: modal de confirmação e finalização.

Finalização no servidor: valida propriedade, status, 50 respostas válidas e coerentes; calcula score por dimensão (média de 5, 1 casa), score geral, percentual, nível de maturidade; grava snapshots; torna tudo imutável.

## 5. Relatório web `/diagnosticos/{id}/relatorio`

Cabeçalho com organização, responsável, data, ID do relatório, botões “Baixar relatório em PDF” e “Voltar ao Dashboard”. Resumo executivo (score / 9, nível, % secundário), scores das 10 dimensões, gráfico de barras horizontal 1–9 com linha do score geral, “Principais orientações” (ações cadastradas nas alternativas escolhidas, priorizadas por score), “Prioridades para evolução” (3 menores dimensões, desempate por quantidade de respostas Crítica/Alta) e CTA para /precos.

## 6. PDF

Geração no servidor (documento estruturado com texto selecionável e gráfico vetorial — nada de print de tela): capa institucional, resumo executivo, tabela das 10 dimensões, gráfico de barras, análise resumida por dimensão, principais orientações, três prioridades, próximos passos, rodapé com paginação. Nome do arquivo `Relatorio-Maturidade-IGOVIA-{organizacao}-{dd-mm-aaaa}.pdf`. Armazenado em storage privado (`reports/{user_id}/{diagnostic_id}/...`), download por URL assinada temporária, apenas dono e admins. Sempre baseado nos snapshots — mudanças futuras no framework não alteram relatórios antigos. Estados PENDING/GENERATING/READY/FAILED e feedback “Preparando relatório...”.

## 7. Admin `/admin`

Protegido por role no backend e RLS (não só ocultando links): dashboard com métricas (usuários, organizações, FREE ativos/expirados, diagnósticos por status, taxa de conclusão, score médio), `/admin/usuarios` com busca e filtros e detalhe do usuário, `/admin/diagnosticos` com filtros, detalhe, 50 respostas, scores, relatório e download do PDF, e `/admin/framework` + `/admin/questoes` para cadastrar dimensões, 50 perguntas, 9 alternativas com interpretação e ação. Logs de auditoria nas alterações relevantes.

## 8. Design e qualidade

Mesmo design system do site (branco/preto/grafite/verde institucional, tipografia, raios, botões). Foco total durante o questionário — sem upsell. Acessibilidade (teclado, foco visível, labels, radios acessíveis, hierarquia de headings) e estados de loading/erro/sucesso em todas as operações, com skeletons no relatório.

## Notas técnicas

Rotas protegidas sob o layout `_authenticated`; toda lógica sensível em server functions com middleware de autenticação; regras de limite e sequência validadas por transação/constraint no banco; nenhuma pergunta hardcoded em componentes.

## Teste de ponta a ponta

Cenário 1: visitante → /precos → Experimentar grátis → cadastro → dashboard → 50 respostas → finalizar → relatório → PDF. Cenário 2: usuário concluído tenta novo diagnóstico → bloqueado, apenas Ver relatório e Conhecer os planos. (Requer o conteúdo das 50 perguntas cadastrado no Admin; até lá o teste usa conteúdo temporário criado e removido no ambiente de teste.)
