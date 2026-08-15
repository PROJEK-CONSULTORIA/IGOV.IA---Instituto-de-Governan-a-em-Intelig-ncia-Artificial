import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/eventos")({
  beforeLoad: () => {
    throw redirect({ to: "/forum" });
  },
});
