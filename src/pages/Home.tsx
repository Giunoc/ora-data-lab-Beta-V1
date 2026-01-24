import { Link } from "react-router";

export default function Home() {
  return (
    <div className="bg-background min-h-screen">
      {/* Header */}
      <header className="bg-primary py-16 text-center">
        <div className="mx-auto max-w-4xl px-4">
          <h1 className="text-text-primary mb-4 text-5xl font-bold">
            ORA! Data Lab
          </h1>
          <p className="text-text-primary/80 text-xl">
            Sfida le tue convinzioni. Esplora i dati reali.
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-4xl px-4 py-12">
        <p className="text-text-secondary mb-12 text-center">
          Una piattaforma interattiva per capire l'Italia oltre i luoghi comuni.
        </p>

        {/* Navigation */}
        <nav className="flex flex-wrap justify-center gap-4">
          <Link
            to="/design-system"
            className="bg-secondary hover:bg-secondary-hover text-text-inverse rounded-lg px-6 py-3 font-semibold transition-colors"
          >
            Design System →
          </Link>
        </nav>
      </main>
    </div>
  );
}
