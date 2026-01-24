interface TopicCardProps {
  title: string;
  description: string;
  ctaText?: string;
}

export default function TopicCard({
  title,
  description,
  ctaText = "Esplora i dati →",
}: TopicCardProps) {
  return (
    <div className="bg-surface border-border hover:border-primary group cursor-pointer rounded-2xl border p-6 transition-all hover:shadow-lg">
      <h3 className="text-text-primary group-hover:text-secondary mb-3 text-xl font-bold">
        {title}
      </h3>
      <p className="text-text-secondary mb-4">{description}</p>
      <span className="bg-primary text-text-primary group-hover:bg-primary-hover inline-block rounded-lg px-4 py-2 font-semibold transition-colors">
        {ctaText}
      </span>
    </div>
  );
}
