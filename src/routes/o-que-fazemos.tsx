import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/o-que-fazemos")({
  beforeLoad: () => {
    throw redirect({ to: "/solucoes" });
  },
});
