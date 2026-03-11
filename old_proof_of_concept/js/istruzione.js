/**
 * ORA! Data Lab - Education Logic
 * Focus: Social Mobility, Skills Gap, Teacher Salaries
 */

// --- 1. DATASETS ---
const eduData = {
  // Chart 1: The "Classist" School System (Gapminder Style Bubble Chart)
  // X: ESCS (Socio-Economic Background Index), Y: Math Score (INVALSI), R: Number of Students
  social_mobility: [
    { x: 1.2, y: 230, r: 15, label: "Liceo Classico", type: "Liceo" },
    { x: 0.8, y: 220, r: 25, label: "Liceo Scientifico", type: "Liceo" },
    { x: 0.1, y: 205, r: 10, label: "Liceo Umanistico", type: "Liceo" },
    { x: -0.3, y: 195, r: 30, label: "Istituti Tecnici", type: "Tecnico" },
    {
      x: -0.8,
      y: 175,
      r: 20,
      label: "Istituti Professionali",
      type: "Professionale",
    },
  ],

  // Chart 2: Teacher Salaries vs Europe (Purchasing Power Standard)
  salaries: {
    labels: ["Germania", "Olanda", "Spagna", "Media UE", "Francia", "Italia"],
    values: [72000, 67000, 49000, 45000, 36000, 34000], // Annual gross after 15 years
    colors: ["#cccccc", "#cccccc", "#cccccc", "#FFD958", "#cccccc", "#000000"], // Highlight Italy & EU
  },

  // Quiz Questions based on "Tesi Istruzione"
  quiz: [
    {
      question:
        "Qual è la percentuale di studenti degli Istituti Professionali con genitori non diplomati?",
      options: ["Circa 15%", "Circa 25%", "Circa 42%", "Oltre il 60%"],
      correct: 2,
      explanation:
        "Il 42% degli studenti dei professionali ha genitori senza diploma, contro meno del 10% nei licei. L'origine determina il percorso.",
    },
    {
      question:
        "Come si posiziona l'Italia per numero di laureati (25-34 anni) rispetto alla media OCSE?",
      options: [
        "Sopra la media",
        "In linea con la media",
        "Tra gli ultimi posti",
      ],
      correct: 2,
      explanation:
        "L'Italia è penultima in Europa per numero di laureati, superata solo dalla Romania.",
    },
    {
      question:
        "Quanto guadagna un docente italiano di scuola superiore rispetto a un collega tedesco (a parità di potere d'acquisto)?",
      options: ["Lo stesso", "Circa il 10% in meno", "Meno della metà"],
      correct: 2,
      explanation:
        "Un docente tedesco guadagna oltre il doppio (€72k vs €34k) dopo 15 anni di carriera.",
    },
  ],
};

// --- 2. QUIZ ENGINE ---
// (Standard Logic reused from previous modules)
const quizState = {
  current: 0,
  score: 0,
  answers: new Array(eduData.quiz.length).fill(null),
};

function initQuiz() {
  renderQuestion();
}

function renderQuestion() {
  const container = document.getElementById("quizContent");
  if (!container) return;

  const q = eduData.quiz[quizState.current];
  const isAnswered = quizState.answers[quizState.current] !== null;

  document.getElementById("quizProgress").textContent =
    `Domanda ${quizState.current + 1} di ${eduData.quiz.length}`;

  let html = `<div class="question-card"><div class="question-text">${q.question}</div><div class="options">`;
  q.options.forEach((opt, i) => {
    let cls = "option";
    if (isAnswered) {
      if (i === q.correct) cls += " correct";
      else if (i === quizState.answers[quizState.current]) cls += " incorrect";
    }
    html += `<div class="${cls}" onclick="${isAnswered ? "" : `selectAnswer(${i})`}">${opt}</div>`;
  });

  if (isAnswered) {
    const isCorrect = quizState.answers[quizState.current] === q.correct;
    html += `<div class="feedback ${isCorrect ? "correct" : "incorrect"}"><strong>${isCorrect ? "Esatto!" : "Sbagliato."}</strong><p>${q.explanation}</p></div>`;
  }

  html += "</div></div>";
  container.innerHTML = html;

  document.getElementById("nextBtn").textContent =
    quizState.current === eduData.quiz.length - 1
      ? "Vedi Risultati"
      : "Successiva →";
  document.getElementById("nextBtn").classList.remove("hidden");
}

function selectAnswer(i) {
  if (quizState.answers[quizState.current] !== null) return;
  quizState.answers[quizState.current] = i;
  if (i === eduData.quiz[quizState.current].correct) quizState.score++;
  renderQuestion();
}

function nextQuestion() {
  if (quizState.answers[quizState.current] === null)
    return alert("Seleziona una risposta.");
  if (quizState.current < eduData.quiz.length - 1) {
    quizState.current++;
    renderQuestion();
  } else {
    showResults();
  }
}

function showResults() {
  const container = document.getElementById("quizContent");
  const pct = Math.round((quizState.score / eduData.quiz.length) * 100);
  container.innerHTML = `<div class="results-summary"><h2>Risultato</h2><div class="score">${pct}%</div><p>Risposte corrette: ${quizState.score}/${eduData.quiz.length}</p></div>`;
  document.getElementById("nextBtn").classList.add("hidden");
  document.getElementById("restartBtn").classList.remove("hidden");
}

function restartQuiz() {
  quizState.current = 0;
  quizState.score = 0;
  quizState.answers.fill(null);
  renderQuestion();
  document.getElementById("restartBtn").classList.add("hidden");
}

// --- 3. CHARTS ---

function initMobilityChart() {
  const ctx = document.getElementById("mobilityChart");
  if (!ctx) return;

  new Chart(ctx, {
    type: "bubble",
    data: {
      datasets: [
        {
          label: "Tipologie di Scuole",
          data: eduData.social_mobility,
          backgroundColor: (ctx) => {
            const type = ctx.raw?.type;
            return type === "Liceo"
              ? "#FFD958"
              : type === "Tecnico"
                ? "#000000"
                : "#FF0000";
          },
          borderColor: "#333",
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        tooltip: {
          callbacks: {
            label: (ctx) =>
              `${ctx.raw.label}: Punteggio ${ctx.raw.y} (ESCS: ${ctx.raw.x})`,
          },
        },
        legend: { display: false },
      },
      scales: {
        x: {
          title: {
            display: true,
            text: "Background Socio-Economico (Indice ESCS)",
          },
          min: -1.5,
          max: 1.5,
        },
        y: {
          title: {
            display: true,
            text: "Punteggio Medio INVALSI (Matematica)",
          },
          min: 150,
          max: 250,
        },
      },
    },
  });
}

function initSalaryChart() {
  const ctx = document.getElementById("salaryChart");
  if (!ctx) return;

  new Chart(ctx, {
    type: "bar",
    data: {
      labels: eduData.salaries.labels,
      datasets: [
        {
          label: "Stipendio Annuo Lordo (PPS)",
          data: eduData.salaries.values,
          backgroundColor: eduData.salaries.colors,
          borderRadius: 4,
        },
      ],
    },
    options: {
      indexAxis: "y",
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: { x: { grid: { color: "#f0f0f0" } } },
    },
  });
}

// --- INIT ---
document.addEventListener("DOMContentLoaded", () => {
  initQuiz();
  initMobilityChart();
  initSalaryChart();
});
