import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { COURSE_ENROLLMENT_URL } from "@/content/cursos";

type Props = {
  className?: string;
  children?: React.ReactNode;
  showArrow?: boolean;
};

const base =
  "group inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-[0_16px_40px_-16px_var(--color-primary)]";

/**
 * Todos os CTAs de inscrição apontam para COURSE_ENROLLMENT_URL.
 * Enquanto o link oficial não for informado, o botão leva à página de contato.
 */
export function EnrollButton({ className = "", children = "Inscreva-se", showArrow = true }: Props) {
  const arrow = showArrow ? (
    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
  ) : null;

  if (COURSE_ENROLLMENT_URL) {
    return (
      <a href={COURSE_ENROLLMENT_URL} target="_blank" rel="noopener noreferrer" className={`${base} ${className}`}>
        {children}
        {arrow}
      </a>
    );
  }

  return (
    <Link to="/contato" className={`${base} ${className}`}>
      {children}
      {arrow}
    </Link>
  );
}
