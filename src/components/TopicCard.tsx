import { Link } from "react-router";
import { cn } from "../utils/theme";

interface TopicCardProps {
  title: string;
  description: string;
  to: string;
  ctaText?: string;
  className?: string;
}

export default function TopicCard({
  title,
  description,
  to,
  ctaText = "Esplora i dati →",
  className,
}: TopicCardProps) {
  return (
    <Link
      to={to}
      className={cn(
        "border-border bg-surface hover:border-primary group block cursor-pointer rounded-2xl border p-6 transition-all hover:shadow-lg",
        className,
      )}
    >
      <h3 className="text-text-primary group-hover:text-secondary mb-3 text-xl font-bold">
        {title}
      </h3>
      <p className="text-text-secondary mb-4">{description}</p>
      <span className="bg-primary text-text-primary group-hover:bg-primary-hover inline-block rounded-lg px-4 py-2 font-semibold transition-colors">
        {ctaText}
      </span>
    </Link>
  );
}
