import { useCallback, useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";

import { PageShell } from "@/components/PageShell";
import { formatScore } from "@/lib/igovia-domain";
import {
  adminGetDiagnostic,
  adminGetFramework,
  adminGetOverview,
  adminListAuditLogs,
  adminListDiagnostics,
  adminListUsers,
  adminSaveQuestion,
} from "@/lib/admin.functions";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({
    meta: [
      { title: "Administração | IGOV.IA" },
      { name: "description", content: "Módulo administrativo da plataforma IGOV.IA." },
      { property: "og:title", content: "Administração | IGOV.IA" },
      { property: "og:description", content: "Módulo administrativo da plataforma IGOV.IA." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminPage,
});

type Tab = "overview" | "users" | "diagnostics" | "framework" | "logs";

const TABS: { id: Tab; label: string }[] = [
  { id: "overview", label: "Visão geral" },
  { id: "users", label: "Usuários" },
  { id: "diagnostics", label: "Diagnósticos" },
  { id: "framework", label: "Framework" },
  { id: "logs", label: "Auditoria" },
];

function AdminPage() {
  const [tab, setTab] = useState<Tab>("overview");
  const [denied, setDenied] = useState(false);

  return (
    <PageShell>
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Administração</p>
            <h1 className="mt-2 text-3xl font-bold">Painel IGOV.IA</h1>
          </div>
          <Link
            to="/dashboard"
            className="rounded-full border border-border px-4 py-2 text-sm font-semibold hover:bg-muted"
          >
            Meu painel
          </Link>
        </div>

        {denied ? (
          <p className="mt-8 rounded-xl border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">
            Você não possui permissão para acessar esta área.
          </p>
        ) : (
          <>
            <nav className="mt-8 flex flex-wrap gap-2">
              {TABS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setTab(item.id)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                    tab === item.id
                      ? "bg-primary text-primary-foreground"
                      : "border border-border hover:bg-muted"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            <div className="mt-8">
              {tab === "overview" && <OverviewTab onDenied={() => setDenied(true)} />}
              {tab === "users" && <UsersTab />}
              {tab === "diagnostics" && <DiagnosticsTab />}
              {tab === "framework" && <FrameworkTab />}
              {tab === "logs" && <LogsTab />}
            </div>
          </>
        )}
      </section>
    </PageShell>
  );
}

function OverviewTab({ onDenied }: { onDenied: () => void }) {
  const load = useServerFn(adminGetOverview);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    load({})
      .then(setData)
      .catch(() => onDenied());
  }, [load, onDenied]);

  if (!data) return <Loading />;

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <Metric label="Usuários cadastrados" value={String(data.totalUsers)} />
      <Metric label="Organizações" value={String(data.totalOrganizations)} />
      <Metric label="Free ativos" value={String(data.activeFree)} />
      <Metric label="Free expirados" value={String(data.expiredFree)} />
      <Metric label="Não iniciados" value={String(data.notStarted)} />
      <Metric label="Em andamento" value={String(data.inProgress)} />
      <Metric label="Concluídos" value={String(data.completed)} />
      <Metric
        label="Score médio"
        value={data.averageScore != null ? `${formatScore(data.averageScore)} / 9` : "—"}
        hint={`Taxa de conclusão: ${data.completionRate}%`}
      />
    </div>
  );
}

function UsersTab() {
  const load = useServerFn(adminListUsers);
  const [rows, setRows] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const refresh = useCallback(() => {
    load({ data: { search, filter } })
      .then(setRows)
      .catch(() => setRows([]));
  }, [filter, load, search]);

  useEffect(() => {
    const timeout = setTimeout(refresh, 250);
    return () => clearTimeout(timeout);
  }, [refresh]);

  return (
    <div>
      <div className="flex flex-wrap gap-3">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar por nome, e-mail, organização ou telefone"
          className="min-w-[260px] flex-1 rounded-xl border border-border bg-card px-4 py-2.5 text-sm outline-none focus:border-primary"
        />
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="rounded-xl border border-border bg-card px-4 py-2.5 text-sm outline-none focus:border-primary"
        >
          <option value="all">Todos</option>
          <option value="active">Acesso ativo</option>
          <option value="expired">Acesso expirado</option>
          <option value="not_started">Não iniciado</option>
          <option value="in_progress">Em andamento</option>
          <option value="completed">Concluído</option>
        </select>
      </div>

      <Table
        headers={["Nome", "Organização", "E-mail", "Acesso", "Expira em", "Diagnóstico", "Score"]}
        rows={rows.map((row) => [
          row.fullName,
          row.organization,
          row.email,
          row.accessStatus,
          row.expiresAt,
          `${row.diagnosticStatus}${row.progress ? ` (${row.progress}%)` : ""}`,
          row.globalScore != null ? formatScore(row.globalScore) : "—",
        ])}
      />
    </div>
  );
}

function DiagnosticsTab() {
  const load = useServerFn(adminListDiagnostics);
  const loadDetail = useServerFn(adminGetDiagnostic);
  const [rows, setRows] = useState<any[]>([]);
  const [filter, setFilter] = useState("all");
  const [detail, setDetail] = useState<any>(null);

  useEffect(() => {
    load({ data: { filter } })
      .then(setRows)
      .catch(() => setRows([]));
  }, [filter, load]);

  return (
    <div>
      <select
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="rounded-xl border border-border bg-card px-4 py-2.5 text-sm outline-none focus:border-primary"
      >
        <option value="all">Todos</option>
        <option value="in_progress">Em andamento</option>
        <option value="completed">Concluídos</option>
      </select>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-border">
        <table className="w-full min-w-[720px] border-collapse text-left text-sm">
          <caption className="sr-only">Diagnósticos da plataforma</caption>
          <thead>
            <tr className="bg-secondary">
              {["Usuário", "Organização", "Início", "Progresso", "Status", "Conclusão", "Score", ""].map(
                (header) => (
                  <th key={header} scope="col" className="px-4 py-3 font-semibold">
                    {header}
                  </th>
                ),
              )}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} className="border-t border-border">
                <td className="px-4 py-3">{row.user}</td>
                <td className="px-4 py-3">{row.organization}</td>
                <td className="px-4 py-3">{row.startedAt}</td>
                <td className="px-4 py-3">{row.progress}%</td>
                <td className="px-4 py-3">{row.status}</td>
                <td className="px-4 py-3">{row.completedAt}</td>
                <td className="px-4 py-3">{row.globalScore != null ? formatScore(row.globalScore) : "—"}</td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => loadDetail({ data: { diagnosticId: row.id } }).then(setDetail)}
                    className="text-sm font-semibold text-primary hover:underline"
                  >
                    Detalhes
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {detail && (
        <div className="mt-8 rounded-2xl border border-border bg-card p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold">{detail.user}</h2>
              <p className="text-sm text-muted-foreground">{detail.organization}</p>
            </div>
            <button onClick={() => setDetail(null)} className="text-sm text-muted-foreground hover:text-foreground">
              Fechar
            </button>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            Início {detail.startedAt} · Última atividade {detail.lastActivityAt} · Conclusão{" "}
            {detail.completedAt} · {detail.answeredCount}/50 respostas
          </p>
          {detail.dimensionScores.length > 0 && (
            <Table
              headers={["Dimensão", "Score", "Nível"]}
              rows={detail.dimensionScores.map((row: any) => [
                `${row.position}. ${row.name}`,
                formatScore(row.score),
                String(row.level),
              ])}
            />
          )}
          <Table
            headers={["#", "Dimensão", "Pergunta", "Resposta", "Score"]}
            rows={detail.answers.map((row: any) => [
              String(row.number),
              row.dimension,
              row.statement,
              row.answer,
              String(row.score),
            ])}
          />
        </div>
      )}
    </div>
  );
}

function FrameworkTab() {
  const load = useServerFn(adminGetFramework);
  const save = useServerFn(adminSaveQuestion);
  const [dimensions, setDimensions] = useState<any[]>([]);
  const [editing, setEditing] = useState<any>(null);
  const [message, setMessage] = useState<string | null>(null);

  const refresh = useCallback(() => {
    load({})
      .then(setDimensions)
      .catch(() => setDimensions([]));
  }, [load]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  function startEdit(dimension: any, question: any | null, position: number) {
    setMessage(null);
    setEditing({
      dimensionId: dimension.id,
      questionId: question?.id,
      number: question?.number ?? (dimension.position - 1) * 5 + position,
      statement: question?.statement ?? "",
      position,
      options: Array.from({ length: 9 }, (_, index) => {
        const level = index + 1;
        const option = question?.options?.find((o: any) => o.level === level);
        return {
          level,
          text: option?.text ?? "",
          interpretation: option?.interpretation ?? "",
          action: option?.action ?? "",
        };
      }),
    });
  }

  async function handleSave() {
    try {
      await save({ data: editing });
      setEditing(null);
      setMessage("Pergunta salva com sucesso.");
      refresh();
    } catch {
      setMessage("Não foi possível salvar. Verifique se todos os 9 níveis foram preenchidos.");
    }
  }

  return (
    <div>
      {message && (
        <p className="mb-6 rounded-xl border border-border bg-card px-4 py-3 text-sm">{message}</p>
      )}

      {editing ? (
        <div className="rounded-2xl border border-border bg-card p-6">
          <h2 className="text-xl font-bold">Pergunta {editing.number}</h2>
          <label className="mt-4 block">
            <span className="mb-1.5 block text-sm font-medium text-foreground/80">Enunciado</span>
            <textarea
              value={editing.statement}
              onChange={(e) => setEditing({ ...editing, statement: e.target.value })}
              rows={3}
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary"
            />
          </label>

          <div className="mt-6 space-y-4">
            {editing.options.map((option: any, index: number) => (
              <div key={option.level} className="rounded-xl border border-border bg-background p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                  Nível {option.level} · Score {option.level}
                </p>
                <input
                  value={option.text}
                  placeholder="Texto da alternativa"
                  onChange={(e) => {
                    const options = [...editing.options];
                    options[index] = { ...option, text: e.target.value };
                    setEditing({ ...editing, options });
                  }}
                  className="mt-2 w-full rounded-lg border border-border bg-card px-3 py-2 text-sm outline-none focus:border-primary"
                />
                <input
                  value={option.interpretation}
                  placeholder="Interpretação"
                  onChange={(e) => {
                    const options = [...editing.options];
                    options[index] = { ...option, interpretation: e.target.value };
                    setEditing({ ...editing, options });
                  }}
                  className="mt-2 w-full rounded-lg border border-border bg-card px-3 py-2 text-sm outline-none focus:border-primary"
                />
                <input
                  value={option.action}
                  placeholder="Recomendação associada"
                  onChange={(e) => {
                    const options = [...editing.options];
                    options[index] = { ...option, action: e.target.value };
                    setEditing({ ...editing, options });
                  }}
                  className="mt-2 w-full rounded-lg border border-border bg-card px-3 py-2 text-sm outline-none focus:border-primary"
                />
              </div>
            ))}
          </div>

          <div className="mt-6 flex gap-3">
            <button
              onClick={handleSave}
              className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
            >
              Salvar pergunta
            </button>
            <button
              onClick={() => setEditing(null)}
              className="rounded-full border border-border px-6 py-3 text-sm font-semibold hover:bg-muted"
            >
              Cancelar
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {dimensions.map((dimension) => (
            <div key={dimension.id} className="rounded-2xl border border-border bg-card p-5">
              <h2 className="font-semibold">
                {dimension.position}. {dimension.name}
              </h2>
              <ul className="mt-3 space-y-2">
                {[1, 2, 3, 4, 5].map((position) => {
                  const question = dimension.questions.find((q: any) => q.position === position);
                  return (
                    <li
                      key={position}
                      className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-background px-4 py-3 text-sm"
                    >
                      <span className={question ? "" : "text-muted-foreground"}>
                        {question ? `${question.number}. ${question.statement}` : `Pergunta ${position} — não cadastrada`}
                      </span>
                      <button
                        onClick={() => startEdit(dimension, question ?? null, position)}
                        className="font-semibold text-primary hover:underline"
                      >
                        {question ? "Editar" : "Cadastrar"}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function LogsTab() {
  const load = useServerFn(adminListAuditLogs);
  const [rows, setRows] = useState<any[]>([]);

  useEffect(() => {
    load({})
      .then(setRows)
      .catch(() => setRows([]));
  }, [load]);

  return (
    <Table
      headers={["Data", "Responsável", "Ação", "Entidade"]}
      rows={rows.map((row) => [row.createdAt, row.actor, row.action, row.entity])}
    />
  );
}

function Metric({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">{label}</p>
      <p className="mt-2 text-2xl font-bold">{value}</p>
      {hint && <p className="mt-1 text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}

function Table({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <div className="mt-6 overflow-x-auto rounded-2xl border border-border">
      <table className="w-full min-w-[720px] border-collapse text-left text-sm">
        <caption className="sr-only">Dados administrativos</caption>
        <thead>
          <tr className="bg-secondary">
            {headers.map((header) => (
              <th key={header} scope="col" className="px-4 py-3 font-semibold">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr className="border-t border-border">
              <td colSpan={headers.length} className="px-4 py-6 text-muted-foreground">
                Nenhum registro encontrado.
              </td>
            </tr>
          ) : (
            rows.map((row, index) => (
              <tr key={index} className="border-t border-border">
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex} className="px-4 py-3">
                    {cell}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

function Loading() {
  return <p className="text-sm text-muted-foreground">Carregando...</p>;
}
