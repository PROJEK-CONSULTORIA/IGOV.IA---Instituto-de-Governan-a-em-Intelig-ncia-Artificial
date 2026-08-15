import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/publicacoes")({
  beforeLoad: () => {
    throw redirect({ to: "/knowledge-hub" });
  },
});
