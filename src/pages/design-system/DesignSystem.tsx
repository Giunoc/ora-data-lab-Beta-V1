import TopicCard from "../../components/TopicCard";

export default function DesignSystem() {
  return (
    <div className="min-h-screen bg-background p-8">
      {/* Header */}
      <header className="mb-12 text-center">
        <h1 className="mb-2 text-4xl font-bold text-text-primary">
          ORA! Design System
        </h1>
        <p className="text-lg text-text-secondary">
          Palette colori e componenti del brand
        </p>
      </header>

      <main className="mx-auto max-w-6xl space-y-12">
        {/* Primary & Secondary Colors */}
        <section>
          <h2 className="mb-6 text-2xl font-bold text-text-primary">
            Colori Principali
          </h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <ColorCard
              name="Primary"
              cssVar="--color-primary"
              bgClass="bg-primary"
              description="Giallo ORA"
            />
            <ColorCard
              name="Primary Hover"
              cssVar="--color-primary-hover"
              bgClass="bg-primary-hover"
              description="Giallo Chiaro"
            />
            <ColorCard
              name="Secondary"
              cssVar="--color-secondary"
              bgClass="bg-secondary"
              textClass="text-text-inverse"
              description="Nero ORA"
            />
            <ColorCard
              name="Secondary Hover"
              cssVar="--color-secondary-hover"
              bgClass="bg-secondary-hover"
              textClass="text-text-inverse"
              description="Blu Scuro"
            />
          </div>
        </section>

        {/* Surface & Background Colors */}
        <section>
          <h2 className="mb-6 text-2xl font-bold text-text-primary">
            Superfici & Sfondi
          </h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <ColorCard
              name="Background"
              cssVar="--color-background"
              bgClass="bg-background"
              description="Sfondo pagina"
              bordered
            />
            <ColorCard
              name="Surface"
              cssVar="--color-surface"
              bgClass="bg-surface"
              description="Card / Pannelli"
              bordered
            />
            <ColorCard
              name="Surface Darker"
              cssVar="--color-surface-darker"
              bgClass="bg-surface-darker"
              description="Superfici scure"
            />
            <ColorCard
              name="Border"
              cssVar="--color-border"
              bgClass="bg-border"
              description="Bordi elementi"
            />
          </div>
        </section>

        {/* Text Colors */}
        <section>
          <h2 className="mb-6 text-2xl font-bold text-text-primary">
            Colori Testo
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-xl border border-border bg-surface p-6">
              <p className="mb-2 text-lg font-semibold text-text-primary">
                Text Primary
              </p>
              <p className="text-text-primary">
                Testo principale per titoli e contenuti importanti.
              </p>
              <code className="mt-2 block text-sm text-text-secondary">
                --color-text-primary
              </code>
            </div>
            <div className="rounded-xl border border-border bg-surface p-6">
              <p className="mb-2 text-lg font-semibold text-text-secondary">
                Text Secondary
              </p>
              <p className="text-text-secondary">
                Testo secondario per descrizioni e caption.
              </p>
              <code className="mt-2 block text-sm text-text-secondary">
                --color-text-secondary
              </code>
            </div>
            <div className="rounded-xl bg-secondary p-6">
              <p className="mb-2 text-lg font-semibold text-text-inverse">
                Text Inverse
              </p>
              <p className="text-text-inverse">Testo chiaro su sfondi scuri.</p>
              <code className="mt-2 block text-sm text-text-inverse/70">
                --color-text-inverse
              </code>
            </div>
          </div>
        </section>

        {/* Feedback Colors */}
        <section>
          <h2 className="mb-6 text-2xl font-bold text-text-primary">
            Colori Feedback
          </h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <ColorCard
              name="Success"
              cssVar="--color-success"
              bgClass="bg-success"
              textClass="text-white"
              description="Conferme"
            />
            <ColorCard
              name="Warning"
              cssVar="--color-warning"
              bgClass="bg-warning"
              textClass="text-white"
              description="Avvisi"
            />
            <ColorCard
              name="Error"
              cssVar="--color-error"
              bgClass="bg-error"
              textClass="text-white"
              description="Errori"
            />
            <ColorCard
              name="Info"
              cssVar="--color-info"
              bgClass="bg-info"
              textClass="text-white"
              description="Informazioni"
            />
          </div>
        </section>

        {/* Button Examples */}
        <section>
          <h2 className="mb-6 text-2xl font-bold text-text-primary">
            Esempi Pulsanti
          </h2>
          <div className="flex flex-wrap gap-4">
            <button className="rounded-lg bg-primary px-6 py-3 font-semibold text-text-primary transition-colors hover:bg-primary-hover">
              Pulsante Primario
            </button>
            <button className="rounded-lg bg-secondary px-6 py-3 font-semibold text-text-inverse transition-colors hover:bg-secondary-hover">
              Pulsante Secondario
            </button>
            <button className="rounded-lg border-2 border-secondary bg-transparent px-6 py-3 font-semibold text-text-primary transition-colors hover:bg-secondary hover:text-text-inverse">
              Outline
            </button>
            <button className="rounded-lg bg-success px-6 py-3 font-semibold text-white transition-opacity hover:opacity-90">
              Conferma
            </button>
            <button className="rounded-lg bg-error px-6 py-3 font-semibold text-white transition-opacity hover:opacity-90">
              Elimina
            </button>
          </div>
        </section>

        {/* Card Example */}
        <section>
          <h2 className="mb-6 text-2xl font-bold text-text-primary">
            Esempio Card
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <TopicCard
              title="🏦 Sistema Pensionistico"
              description="Esplora i dati e le statistiche con visualizzazioni interattive."
            />
            <TopicCard
              title="⚡ Settore Energetico"
              description="Esplora i dati e le statistiche con visualizzazioni interattive."
            />
            <TopicCard
              title="🎓 Scuola & Istruzione"
              description="Esplora i dati e le statistiche con visualizzazioni interattive."
            />
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-16 border-t border-border py-8 text-center">
        <p className="text-text-secondary">
          <strong className="text-text-primary">ORA! Data Lab</strong> — Design
          System Demo
        </p>
      </footer>
    </div>
  );
}

interface ColorCardProps {
  name: string;
  cssVar: string;
  bgClass: string;
  textClass?: string;
  description: string;
  bordered?: boolean;
}

function ColorCard({
  name,
  cssVar,
  bgClass,
  textClass = "text-text-primary",
  description,
  bordered,
}: ColorCardProps) {
  return (
    <div
      className={`overflow-hidden rounded-xl ${bordered ? "border border-border" : ""}`}
    >
      <div className={`${bgClass} flex h-24 items-end p-3`}>
        <span className={`${textClass} text-sm font-semibold`}>{name}</span>
      </div>
      <div className="border-t border-border bg-surface p-3">
        <p className="text-sm text-text-secondary">{description}</p>
        <code className="mt-1 block text-xs text-text-secondary">{cssVar}</code>
      </div>
    </div>
  );
}
