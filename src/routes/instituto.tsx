import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/instituto")({
  beforeLoad: () => {
    throw redirect({ to: "/" });
  },
});
