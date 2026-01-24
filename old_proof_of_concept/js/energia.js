/**
 * ORA! Data Lab - Energy Logic (Beta v2.0 - Interactive Mix)
 * Includes: Quiz Engine, Energy Mix Manipulator (Doughnut Chart), and Decarbonization Metrics
 */

// --- 1. DATASETS ---
const energyData = {
  // Starting 2024 Energy Mix (Percentages totaling 100)
  base_mix: {
    gas: 45, // Natural Gas (High Emissions)
    oil_coal: 15, // Oil and Coal (Very High Emissions)
    hydro: 10, // Hydroelectric (Clean, limited growth)
    solar_wind: 20, // Solar and Wind (Clean, high growth potential)
    nuclear: 0, // Current Italian Nuclear (None)
    other: 10, // Biomass, Geothermal, Imports, etc.
  },
  // Emissions factor (Mt CO2 per % share) and Cost Index (Cost per % share, relative to 1.0)
  factors: {
    gas: { co2: 5.5, cost: 1.0 },
    oil_coal: { co2: 7.0, cost: 1.2 },
    hydro: { co2: 0.1, cost: 0.8 },
    solar_wind: { co2: 0.2, cost: 0.9 },
    nuclear: { co2: 0.1, cost: 1.1 }, // Nuclear is expensive investment, low running cost
    other: { co2: 2.0, cost: 1.0 },
  },
  // Quiz Questions
  quiz: [
    {
      question:
        "Qual è la fonte energetica primaria usata in Italia per produrre elettricità?",
      options: [
        "Idroelettrico",
        "Gas Naturale",
        "Carbone",
        "Nucleare (importato)",
      ],
      correct: 1,
      explanation:
        "Il Gas Naturale (circa 45% del mix) è la nostra fonte primaria.",
    },
    {
      question:
        "L'Italia è al momento autosufficiente nella produzione di gas naturale?",
      options: [
        "Sì, al 100%",
        "No, importiamo oltre il 90%",
        "No, importiamo circa il 50%",
      ],
      correct: 1,
      explanation: "No. L'Italia importa oltre il 90% del gas consumato.",
    },
    {
      question: "Quale fonte ha il minor impatto di emissioni CO2?",
      options: ["Gas Naturale", "Petrolio", "Nucleare ed Eolico", "Biomasse"],
      correct: 2,
      explanation:
        "Nucleare, Eolico e Solare hanno le emissioni più basse per kWh prodotto.",
    },
  ],
};

let currentMix = { ...energyData.base_mix };
let mixChart = null;

// --- 2. ENERGY MIX MANIPULATOR (Interactive Chart Logic) ---

function initEnergyMixSimulator() {
  // Initialize the chart
  createEnergyMixChart("mixChart", currentMix);

  // Attach listeners to sliders
  ["solar_wind", "nuclear", "gas", "oil_coal"].forEach((source) => {
    const slider = document.getElementById(`${source}Slider`);
    if (slider) {
      slider.addEventListener("input", updateEnergyMix);
    }
  });

  // Run once on load to populate metrics
  updateEnergyMix();
}

// Function that handles the 100% constraint and updates the chart
function updateEnergyMix(event) {
  if (event) {
    const source = event.target.id.replace("Slider", "");
    let newValue = parseFloat(event.target.value);

    // Calculate the current total contribution from user-controlled sources
    let controlledSources = ["solar_wind", "nuclear", "gas", "oil_coal"];

    // Logic to maintain 100% total
    // If we increase one source, we must decrease the highest polluting source available (Coal/Oil then Gas)

    const fixedTotal = energyData.base_mix.hydro + energyData.base_mix.other; // 20%
    const maxControlled = 100 - fixedTotal; // 80% available for sliders

    // Temporarily set the new value in our state
    currentMix[source] = newValue;

    // Calculate current total of sliders
    let currentControlledTotal = controlledSources.reduce(
      (sum, key) => sum + currentMix[key],
      0,
    );

    let difference = currentControlledTotal - maxControlled;

    // If total > 100% (overshoot), reduce other sources
    if (difference > 0) {
      // Priority for reduction: Oil/Coal -> Gas -> Nuclear -> Solar
      const reductionPriority = ["oil_coal", "gas", "nuclear", "solar_wind"];

      for (let key of reductionPriority) {
        if (key !== source && difference > 0) {
          if (currentMix[key] >= difference) {
            currentMix[key] -= difference;
            difference = 0;
          } else {
            difference -= currentMix[key];
            currentMix[key] = 0;
          }
        }
      }

      // If still difference (edge case), cap the moved slider
      if (difference > 0) {
        currentMix[source] -= difference;
      }
    }
    // If total < 100% (undershoot), increase Gas (as "transition fuel")
    else if (difference < 0) {
      currentMix["gas"] += Math.abs(difference);
    }

    // Update Slider UI positions to match the new forced values
    controlledSources.forEach((key) => {
      const slider = document.getElementById(`${key}Slider`);
      if (slider) slider.value = currentMix[key].toFixed(1);
    });
  }

  // Ensure fixed sources are represented
  currentMix.hydro = energyData.base_mix.hydro;
  currentMix.other = energyData.base_mix.other;

  // --- METRIC CALCULATION (CO2 and COST) ---
  let totalCO2 = 0;
  let totalCostIndex = 0;

  for (const source in currentMix) {
    totalCO2 += currentMix[source] * energyData.factors[source].co2;
    totalCostIndex += currentMix[source] * energyData.factors[source].cost;
  }

  // Normalize CO2 (approximate sizing for Mt CO2e)
  const normalizedCO2 = totalCO2;
  const normalizedCost = totalCostIndex;

  // --- Update Metrics UI ---
  document.getElementById("co2EmissionsValue").textContent =
    normalizedCO2.toFixed(1) + " Mt CO2e";
  document.getElementById("costIndexValue").textContent =
    normalizedCost.toFixed(0);

  // Update Cost Index Color
  const costElement = document.getElementById("costIndexValue");
  let costColor = "var(--ora-black)";
  if (normalizedCost > 115) costColor = "#FF0000";
  else if (normalizedCost < 95) costColor = "#006400";
  costElement.style.color = costColor;

  // Update Chart UI
  updateEnergyMixChart(currentMix);

  // Update slider label text
  for (const key in currentMix) {
    const valueSpan = document.getElementById(`${key}Value`);
    if (valueSpan) {
      valueSpan.textContent = currentMix[key].toFixed(1) + "%";
    }
  }
}

function createEnergyMixChart(canvasId, initialMix) {
  const ctx = document.getElementById(canvasId);
  if (!ctx) return;
  if (mixChart) mixChart.destroy();

  const labels = {
    gas: "Gas Naturale",
    oil_coal: "Petrolio & Carbone",
    hydro: "Idroelettrico",
    solar_wind: "Solare & Eolico",
    nuclear: "Nucleare",
    other: "Altro/Import",
  };

  const colors = {
    gas: "#FFA500", // Orange
    oil_coal: "#333333", // Dark Gray
    hydro: "#00BFFF", // Light Blue
    solar_wind: "#32CD32", // Lime Green
    nuclear: "#4169E1", // Royal Blue
    other: "#D3D3D3", // Light Gray
  };

  mixChart = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: Object.keys(initialMix).map((key) => labels[key]),
      datasets: [
        {
          data: Object.values(initialMix),
          backgroundColor: Object.keys(initialMix).map((key) => colors[key]),
          borderColor: "#ffffff",
          borderWidth: 2,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position: "bottom" },
        tooltip: {
          callbacks: {
            label: function (context) {
              return context.label + ": " + context.parsed.toFixed(1) + "%";
            },
          },
        },
      },
    },
  });
}

function updateEnergyMixChart(newMix) {
  if (mixChart) {
    mixChart.data.datasets[0].data = Object.values(newMix);
    mixChart.update();
  }
}

function resetDecarbSimulator() {
  currentMix = { ...energyData.base_mix };
  // Reset sliders to base values
  document.getElementById("solar_windSlider").value =
    energyData.base_mix.solar_wind;
  document.getElementById("nuclearSlider").value = energyData.base_mix.nuclear;
  document.getElementById("gasSlider").value = energyData.base_mix.gas;
  document.getElementById("oil_coalSlider").value =
    energyData.base_mix.oil_coal;

  // Trigger update
  updateEnergyMix({ target: { id: "dummy", value: 0 } }); // Dummy event to trigger recalc
}

// --- 3. QUIZ ENGINE ---
const quizEngine = {
  currentQuestion: 0,
  score: 0,
  answeredQuestions: 0,
  selectedAnswers: new Array(energyData.quiz.length).fill(null),
};

function initQuiz() {
  renderQuestion();
}

function renderQuestion() {
  const quizContent = document.getElementById("quizContent");
  if (!quizContent) return;

  const question = energyData.quiz[quizEngine.currentQuestion];
  const isAnswered =
    quizEngine.selectedAnswers[quizEngine.currentQuestion] !== null;

  document.getElementById("quizProgress").textContent =
    `Domanda ${quizEngine.currentQuestion + 1} di ${energyData.quiz.length}`;
  document.getElementById("scoreDisplay").textContent =
    `Punteggio: ${quizEngine.score}/${quizEngine.answeredQuestions}`;

  let html = `<div class="question-card"><div class="question-text">${question.question}</div><div class="options">`;

  question.options.forEach((option, index) => {
    let optionClass = "option";
    if (isAnswered) {
      if (index === question.correct) optionClass += " correct";
      else if (
        index === quizEngine.selectedAnswers[quizEngine.currentQuestion] &&
        index !== question.correct
      )
        optionClass += " incorrect";
    } else if (
      quizEngine.selectedAnswers[quizEngine.currentQuestion] === index
    ) {
      optionClass += " selected";
    }

    html += `<div class="${optionClass}" onclick="${isAnswered ? "" : `selectAnswer(${index})`}">${option}</div>`;
  });

  html += "</div>";

  if (isAnswered) {
    const isCorrect =
      quizEngine.selectedAnswers[quizEngine.currentQuestion] ===
      question.correct;
    html += `<div class="feedback ${isCorrect ? "correct" : "incorrect"}">
                <strong>${isCorrect ? "✓ Corretto!" : "✗ Sbagliato."}</strong>
                <p>${question.explanation}</p>
            </div>`;
  }
  html += "</div>";
  quizContent.innerHTML = html;

  // Button Logic
  document
    .getElementById("prevBtn")
    .classList.toggle("hidden", quizEngine.currentQuestion === 0);
  const nextBtn = document.getElementById("nextBtn");
  if (quizEngine.currentQuestion === energyData.quiz.length - 1) {
    nextBtn.textContent = "Vedi Risultati";
  } else {
    nextBtn.textContent = "Successiva →";
  }
  nextBtn.classList.remove("hidden");
  document.getElementById("restartBtn").classList.add("hidden");
}

function selectAnswer(index) {
  if (quizEngine.selectedAnswers[quizEngine.currentQuestion] !== null) return;
  quizEngine.selectedAnswers[quizEngine.currentQuestion] = index;
  if (index === energyData.quiz[quizEngine.currentQuestion].correct)
    quizEngine.score++;
  quizEngine.answeredQuestions++;
  renderQuestion();
}
function nextQuestion() {
  if (quizEngine.selectedAnswers[quizEngine.currentQuestion] === null) {
    alert("Seleziona una risposta.");
    return;
  }
  if (quizEngine.currentQuestion < energyData.quiz.length - 1) {
    quizEngine.currentQuestion++;
    renderQuestion();
  } else {
    showResults();
  }
}
function previousQuestion() {
  if (quizEngine.currentQuestion > 0) {
    quizEngine.currentQuestion--;
    renderQuestion();
  }
}
function showResults() {
  const quizContent = document.getElementById("quizContent");
  const percentage = Math.round(
    (quizEngine.score / energyData.quiz.length) * 100,
  );

  quizContent.innerHTML = `
        <div class="results-summary">
            <h2>Risultati</h2>
            <div class="score">${percentage}%</div>
            <p>Risposte corrette: ${quizEngine.score}/${energyData.quiz.length}</p>
        </div>
    `;
  document.getElementById("prevBtn").classList.add("hidden");
  document.getElementById("nextBtn").classList.add("hidden");
  document.getElementById("restartBtn").classList.remove("hidden");
}
function restartQuiz() {
  quizEngine.currentQuestion = 0;
  quizEngine.score = 0;
  quizEngine.answeredQuestions = 0;
  quizEngine.selectedAnswers.fill(null);
  renderQuestion();
}

// --- 4. INITIALIZATION ---
document.addEventListener("DOMContentLoaded", function () {
  initQuiz();
  initEnergyMixSimulator();
});
