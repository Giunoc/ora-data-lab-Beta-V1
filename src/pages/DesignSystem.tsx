import TopicCard from "../components/TopicCard";

export default function DesignSystem() {
  return (
    <div className="bg-background min-h-screen p-8">
      {/* Header */}
      <header className="mb-12 text-center">
        <h1 className="text-text-primary mb-2 text-4xl font-bold">
          ORA! Design System
        </h1>
        <p className="text-text-secondary text-lg">
          Palette colori e componenti del brand
        </p>
      </header>

      <main className="mx-auto max-w-6xl space-y-12">
        {/* Primary & Secondary Colors */}
        <section>
          <h2 className="text-text-primary mb-6 text-2xl font-bold">
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
          <h2 className="text-text-primary mb-6 text-2xl font-bold">
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
          <h2 className="text-text-primary mb-6 text-2xl font-bold">
            Colori Testo
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="bg-surface border-border rounded-xl border p-6">
              <p className="text-text-primary mb-2 text-lg font-semibold">
                Text Primary
              </p>
              <p className="text-text-primary">
                Testo principale per titoli e contenuti importanti.
              </p>
              <code className="text-text-secondary mt-2 block text-sm">
                --color-text-primary
              </code>
            </div>
            <div className="bg-surface border-border rounded-xl border p-6">
              <p className="text-text-secondary mb-2 text-lg font-semibold">
                Text Secondary
              </p>
              <p className="text-text-secondary">
                Testo secondario per descrizioni e caption.
              </p>
              <code className="text-text-secondary mt-2 block text-sm">
                --color-text-secondary
              </code>
            </div>
            <div className="bg-secondary rounded-xl p-6">
              <p className="text-text-inverse mb-2 text-lg font-semibold">
                Text Inverse
              </p>
              <p className="text-text-inverse">Testo chiaro su sfondi scuri.</p>
              <code className="text-text-inverse/70 mt-2 block text-sm">
                --color-text-inverse
              </code>
            </div>
          </div>
        </section>

        {/* Feedback Colors */}
        <section>
          <h2 className="text-text-primary mb-6 text-2xl font-bold">
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
          <h2 className="text-text-primary mb-6 text-2xl font-bold">
            Esempi Pulsanti
          </h2>
          <div className="flex flex-wrap gap-4">
            <button className="bg-primary hover:bg-primary-hover text-text-primary rounded-lg px-6 py-3 font-semibold transition-colors">
              Pulsante Primario
            </button>
            <button className="bg-secondary hover:bg-secondary-hover text-text-inverse rounded-lg px-6 py-3 font-semibold transition-colors">
              Pulsante Secondario
            </button>
            <button className="border-secondary hover:bg-secondary hover:text-text-inverse text-text-primary rounded-lg border-2 bg-transparent px-6 py-3 font-semibold transition-colors">
              Outline
            </button>
            <button className="bg-success rounded-lg px-6 py-3 font-semibold text-white transition-opacity hover:opacity-90">
              Conferma
            </button>
            <button className="bg-error rounded-lg px-6 py-3 font-semibold text-white transition-opacity hover:opacity-90">
              Elimina
            </button>
          </div>
        </section>

        {/* Card Example */}
        <section>
          <h2 className="text-text-primary mb-6 text-2xl font-bold">
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
      <footer className="border-border mt-16 border-t py-8 text-center">
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
      className={`overflow-hidden rounded-xl ${bordered ? "border-border border" : ""}`}
    >
      <div className={`${bgClass} flex h-24 items-end p-3`}>
        <span className={`${textClass} text-sm font-semibold`}>{name}</span>
      </div>
      <div className="bg-surface border-border border-t p-3">
        <p className="text-text-secondary text-sm">{description}</p>
        <code className="text-text-secondary mt-1 block text-xs">{cssVar}</code>
      </div>
    </div>
  );
}
