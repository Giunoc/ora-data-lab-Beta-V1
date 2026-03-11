import { Link } from "react-router";
import { cn } from "../utils/theme";

interface TopicCardProps {
  title: string;
  description: string;
  to?: string;
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
  const classes = cn(
    "group block cursor-pointer rounded-2xl border border-border bg-surface p-6 transition-all hover:border-primary hover:shadow-lg",
    className,
  );
  const content = (
    <>
      <h3 className="mb-3 text-xl font-bold text-text-primary group-hover:text-secondary">
        {title}
      </h3>
      <p className="mb-4 text-text-secondary">{description}</p>
      <span className="inline-block rounded-lg bg-primary px-4 py-2 font-semibold text-text-primary transition-colors group-hover:bg-primary-hover">
        {ctaText}
      </span>
    </>
  );

  return to ? (
    <Link to={to} className={classes}>
      {content}
    </Link>
  ) : (
    <div className={classes}>{content}</div>
  );
}
