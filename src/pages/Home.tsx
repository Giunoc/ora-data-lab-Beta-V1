import TopicCard from "../components/TopicCard";

export default function Home() {
  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="bg-primary py-16 text-center">
        <div className="mx-auto max-w-4xl px-4">
          <h1 className="mb-4 text-5xl font-bold">ORA! Data Lab</h1>
          <p className="text-xl">
            Sfida le tue convinzioni. Esplora i dati reali.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        <p className="mb-12 text-center text-text-secondary">
          Una piattaforma interattiva per capire l'Italia oltre i luoghi comuni.
        </p>

        {/* Topic Cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <TopicCard
            title="🏦 Sistema Pensionistico"
            description="È davvero insostenibile? Mettiti alla prova con il nostro simulatore e scopri come demografia e produttività influenzano il tuo futuro."
            to="/pensioni"
          />
          <TopicCard
            title="⚡ Settore Energetico"
            description="Analisi del mix energetico italiano, il costo della transizione e l'impatto delle rinnovabili sulle emissioni."
            to="/energia"
          />
          <TopicCard
            title="🎓 Scuola & Istruzione"
            description="L'ascensore sociale è rotto? Dati su disuguaglianze, competenze e stipendi dei docenti in Italia."
            to="/istruzione"
          />
        </div>
      </section>
    </div>
  );
}
