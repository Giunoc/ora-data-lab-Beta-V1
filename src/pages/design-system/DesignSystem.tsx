import Button from "../../components/Button";
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

        {/* Button Variants */}
        <section>
          <h2 className="mb-6 text-2xl font-bold text-text-primary">
            Pulsanti — Varianti
          </h2>
          <div className="flex flex-wrap items-center gap-4">
            <Button variant="primary">Primario</Button>
            <Button variant="secondary">Secondario</Button>
            <Button variant="tertiary">Terziario</Button>
            <Button variant="text">Testo</Button>
          </div>
        </section>

        {/* Button Sizes */}
        <section>
          <h2 className="mb-6 text-2xl font-bold text-text-primary">
            Pulsanti — Dimensioni
          </h2>
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-4">
              <Button size="sm">Small</Button>
              <Button size="md">Medium</Button>
              <Button size="lg">Large</Button>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <Button variant="secondary" size="sm">
                Small
              </Button>
              <Button variant="secondary" size="md">
                Medium
              </Button>
              <Button variant="secondary" size="lg">
                Large
              </Button>
            </div>
          </div>
        </section>

        {/* Button with Icons */}
        <section>
          <h2 className="mb-6 text-2xl font-bold text-text-primary">
            Pulsanti — Con Icone
          </h2>
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-4">
              <Button leadingIcon={<PlusIcon />}>Aggiungi</Button>
              <Button variant="secondary" trailingIcon={<ArrowRightIcon />}>
                Continua
              </Button>
              <Button
                variant="tertiary"
                leadingIcon={<DownloadIcon />}
                trailingIcon={<ArrowRightIcon />}
              >
                Scarica
              </Button>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <Button size="sm" leadingIcon={<PlusIcon />}>
                Small
              </Button>
              <Button size="md" leadingIcon={<PlusIcon />}>
                Medium
              </Button>
              <Button size="lg" leadingIcon={<PlusIcon />}>
                Large
              </Button>
            </div>
          </div>
        </section>

        {/* Button States */}
        <section>
          <h2 className="mb-6 text-2xl font-bold text-text-primary">
            Pulsanti — Stati
          </h2>
          <div className="flex flex-wrap items-center gap-4">
            <Button>Normale</Button>
            <Button
              disabled
              onClick={() => console.error("BUG! This button shouldn't work")}
            >
              Disabilitato
            </Button>
            <Button
              disabled
              variant="secondary"
              onClick={() => console.error("BUG! This button shouldn't work")}
            >
              Disabilitato
            </Button>
            <Button
              disabled
              variant="tertiary"
              onClick={() => console.error("BUG! This button shouldn't work")}
            >
              Disabilitato
            </Button>
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

// Demo icons (Se c'è un Icon Pack deciso, userei quello ovviamente)
function PlusIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className="size-full"
    >
      <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className="size-full"
    >
      <path
        fillRule="evenodd"
        d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className="size-full"
    >
      <path d="M10.75 2.75a.75.75 0 0 0-1.5 0v8.614L6.295 8.235a.75.75 0 1 0-1.09 1.03l4.25 4.5a.75.75 0 0 0 1.09 0l4.25-4.5a.75.75 0 0 0-1.09-1.03l-2.955 3.129V2.75Z" />
      <path d="M3.5 12.75a.75.75 0 0 0-1.5 0v2.5A2.75 2.75 0 0 0 4.75 18h10.5A2.75 2.75 0 0 0 18 15.25v-2.5a.75.75 0 0 0-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5Z" />
    </svg>
  );
}
