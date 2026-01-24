/**
 * ORA! Data Lab - Pension Logic (Beta v1.0)
 * Includes: Quiz Engine, Pension Simulator, Demographic Pyramids, Spending Projections
 */

// --- 1. DATASETS ---
const pensionData = {
    // Projections for Line Chart
    spending_projections: {
        years: [2024, 2030, 2035, 2040, 2045, 2050, 2055, 2060, 2065, 2070],
        rgs_scenario: [16.2, 16.5, 16.8, 17.2, 17.5, 17.3, 16.8, 16.2, 15.5, 14.8], // Baseline
        awg_scenario: [16.2, 16.7, 17.1, 17.6, 18.0, 17.8, 17.2, 16.5, 15.8, 15.0], // Pessimistic
        optimistic_scenario: [16.2, 16.0, 15.8, 15.5, 15.2, 14.8, 14.3, 13.8, 13.3, 12.8] // Optimistic
    },
    // Data for Population Pyramids
    demographic_pyramid_2024: {
        age_groups: ["0-4", "5-9", "10-14", "15-19", "20-24", "25-29", "30-34", "35-39", "40-44", "45-49", "50-54", "55-59", "60-64", "65-69", "70-74", "75-79", "80-84", "85+"],
        males: [1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.9, 2.1, 2.3, 2.4, 2.5, 2.3, 2.1, 1.9, 1.6, 1.3, 0.9, 0.7],
        females: [1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.8, 2.0, 2.2, 2.3, 2.4, 2.2, 2.0, 1.8, 1.7, 1.5, 1.2, 1.1]
    },
    demographic_pyramid_2070: {
        age_groups: ["0-4", "5-9", "10-14", "15-19", "20-24", "25-29", "30-34", "35-39", "40-44", "45-49", "50-54", "55-59", "60-64", "65-69", "70-74", "75-79", "80-84", "85+"],
        males: [1.0, 1.0, 1.1, 1.1, 1.2, 1.2, 1.3, 1.3, 1.4, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 1.8, 1.5, 1.3],
        females: [0.9, 0.9, 1.0, 1.0, 1.1, 1.1, 1.2, 1.2, 1.3, 1.3, 1.4, 1.5, 1.6, 1.7, 1.9, 2.0, 1.9, 1.8]
    }
};

const quizQuestions = [
    {
        question: "Quale percentuale del PIL italiano è dedicata oggi alla spesa pensionistica?",
        options: ["Circa 10%", "Circa 16.2%", "Circa 22%", "Circa 28%"],
        correct: 1,
        explanation: "Esatto (o quasi). La spesa è al 16,2% del PIL (2024), una delle più alte in Europa."
    },
    {
        question: "Quando raggiungerà il picco massimo la spesa pensionistica?",
        options: ["2030", "2045", "2060", "Mai, scenderà sempre"],
        correct: 1,
        explanation: "Corretto. Il picco è previsto intorno al 2045 (circa 17.5% PIL) a causa del pensionamento dei Baby Boomers."
    },
    {
        question: "Qual è l'età media *effettiva* di pensionamento in Italia?",
        options: ["62,5 anni", "64,8 anni", "67,0 anni", "69,2 anni"],
        correct: 1,
        explanation: "Giusto. L'età legale è 67 anni, ma quella effettiva è 64,8 a causa di uscite anticipate (es. Quota 103)."
    }
];

// --- 2. QUIZ ENGINE ---
let currentQuestion = 0;
let score = 0;
let answeredQuestions = 0;
let selectedAnswers = new Array(quizQuestions.length).fill(null);

function initQuiz() {
    renderQuestion();
}

function renderQuestion() {
    const quizContent = document.getElementById('quizContent');
    if (!quizContent) return;

    const question = quizQuestions[currentQuestion];
    const isAnswered = selectedAnswers[currentQuestion] !== null;
    
    // Update Progress UI
    document.getElementById('quizProgress').textContent = `Domanda ${currentQuestion + 1} di ${quizQuestions.length}`;
    document.getElementById('scoreDisplay').textContent = `Punteggio: ${score}/${answeredQuestions}`;
    
    // Build HTML
    let html = `
        <div class="question-card">
            <div class="question-text">${question.question}</div>
            <div class="options">
    `;
    
    question.options.forEach((option, index) => {
        let optionClass = 'option';
        // Logic to show colors if answered
        if (isAnswered) {
            if (index === question.correct) optionClass += ' correct';
            else if (index === selectedAnswers[currentQuestion] && index !== question.correct) optionClass += ' incorrect';
        } else if (selectedAnswers[currentQuestion] === index) {
            optionClass += ' selected';
        }
        
        // Accessibility attributes
        html += `<div class="${optionClass}" tabindex="0" role="button" 
                  onclick="${isAnswered ? '' : `selectAnswer(${index})`}"
                  onkeypress="${isAnswered ? '' : `if(event.key==='Enter') selectAnswer(${index})`}">
                  ${option}</div>`;
    });
    
    html += '</div>'; // Close options
    
    // Show Feedback if answered
    if (isAnswered) {
        const isCorrect = selectedAnswers[currentQuestion] === question.correct;
        html += `
            <div class="feedback ${isCorrect ? 'correct' : 'incorrect'}">
                <strong>${isCorrect ? '✓ Corretto!' : '✗ Sbagliato.'}</strong>
                <p>${question.explanation}</p>
            </div>
        `;
    }
    
    html += '</div>'; // Close card
    quizContent.innerHTML = html;
    
    // Button States
    document.getElementById('prevBtn').classList.toggle('hidden', currentQuestion === 0);
    const nextBtn = document.getElementById('nextBtn');
    if (currentQuestion === quizQuestions.length - 1) {
        nextBtn.textContent = 'Vedi Risultati';
    } else {
        nextBtn.textContent = 'Successiva →';
    }
    nextBtn.classList.remove('hidden');
    document.getElementById('restartBtn').classList.add('hidden');
}

function selectAnswer(index) {
    if (selectedAnswers[currentQuestion] !== null) return; // Prevent changing answer
    selectedAnswers[currentQuestion] = index;
    if (index === quizQuestions[currentQuestion].correct) score++;
    answeredQuestions++;
    renderQuestion();
}

function nextQuestion() {
    if (selectedAnswers[currentQuestion] === null) {
        alert('Per favore, seleziona una risposta.');
        return;
    }
    if (currentQuestion < quizQuestions.length - 1) {
        currentQuestion++;
        renderQuestion();
    } else {
        showResults();
    }
}

function previousQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        renderQuestion();
    }
}

function showResults() {
    const quizContent = document.getElementById('quizContent');
    const percentage = Math.round((score / quizQuestions.length) * 100);
    
    let message = percentage >= 60 ? 'Ottimo lavoro! Hai una buona base di partenza.' : 'Non preoccuparti! I simulatori qui sotto ti aiuteranno a capire meglio.';
    
    quizContent.innerHTML = `
        <div class="results-summary">
            <h2>Risultati del Quiz</h2>
            <div class="score">${percentage}%</div>
            <p style="font-size: 1.2rem;">Risposte corrette: ${score} su ${quizQuestions.length}</p>
            <p style="margin-top: 20px;">${message}</p>
        </div>
    `;
    
    document.getElementById('prevBtn').classList.add('hidden');
    document.getElementById('nextBtn').classList.add('hidden');
    document.getElementById('restartBtn').classList.remove('hidden');
}

function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    answeredQuestions = 0;
    selectedAnswers = new Array(quizQuestions.length).fill(null);
    renderQuestion();
}


// --- 3. SUSTAINABILITY SIMULATOR ---
let gaugeChart = null;

function initSustainabilitySimulator() {
    // Attach listeners to sliders
    ['employment', 'productivity', 'retirement', 'fertility'].forEach(type => {
        const slider = document.getElementById(`${type}Slider`);
        if(slider) {
            slider.addEventListener('input', function() {
                // Update label text
                const suffix = type === 'fertility' ? '' : (type === 'retirement' ? ' anni' : '%');
                document.getElementById(`${type}Value`).textContent = this.value + suffix;
                updateSustainability();
            });
        }
    });
    
    updateSustainability(); // Run once on load
}

function updateSustainability() {
    // Get values
    const employment = parseFloat(document.getElementById('employmentSlider').value);
    const productivity = parseFloat(document.getElementById('productivitySlider').value);
    const retirement = parseFloat(document.getElementById('retirementSlider').value);
    const fertility = parseFloat(document.getElementById('fertilitySlider').value);
    
    // SIMPLIFIED MATH MODEL for demonstration
    // Base Ratio (Workers per Pensioner) starts at ~1.43
    // Each factor improves or worsens this ratio
    const baseRatio = 1.43; 
    const employmentEffect = (employment / 61.5); // Baseline 61.5%
    const retirementEffect = ((retirement - 67) * 0.08 + 1); // Baseline 67 years
    const fertilityEffect = ((fertility - 1.24) * 0.15 + 1); // Baseline 1.24
    
    // Productivity affects GDP, not the ratio directly, but we factor it into "Health"
    const productivityBonus = (productivity - 0.5) * 0.2;

    const sustainabilityRatio = (baseRatio * employmentEffect * retirementEffect * fertilityEffect + productivityBonus).toFixed(2);
    
    // Spending Calculation (inverse to sustainability)
    const baseSpending = 16.2;
    const spendingChange = (1.43 / sustainabilityRatio - 1) * 10; 
    let spending = baseSpending + spendingChange;
    // Clamp spending between 10% and 22%
    spending = Math.max(10, Math.min(22, spending));
    
    // Determine Health
    let health = 'CRITICO';
    let healthColor = '#FF0000'; // Red
    
    if (sustainabilityRatio >= 1.9) { health = 'OTTIMO'; healthColor = '#90EE90'; } // Green
    else if (sustainabilityRatio >= 1.6) { health = 'BUONO'; healthColor = '#FFD958'; } // Yellow
    else if (sustainabilityRatio >= 1.4) { health = 'ACCETTABILE'; healthColor = '#FFA500'; } // Orange
    
    // Update UI
    document.getElementById('sustainabilityRatio').textContent = sustainabilityRatio;
    document.getElementById('spendingPct').textContent = spending.toFixed(1) + '%';
    const healthEl = document.getElementById('systemHealth');
    healthEl.textContent = health;
    healthEl.style.color = healthColor;
    
    updateGaugeChart(sustainabilityRatio);
}

function updateGaugeChart(ratio) {
    const ctx = document.getElementById('gaugeChart');
    if (!ctx) return;
    
    if (gaugeChart) gaugeChart.destroy();
    
    // Map ratio (1.0 to 2.5) to percentage (0 to 100)
    const percentage = Math.max(0, Math.min(100, ((ratio - 1.0) / 1.5) * 100));
    
    gaugeChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            datasets: [{
                data: [percentage, 100 - percentage],
                backgroundColor: [
                    percentage < 33 ? '#FF0000' : percentage < 66 ? '#FFD958' : '#90EE90',
                    '#E0E0E0'
                ],
                borderWidth: 0
            }]
        },
        options: {
            circumference: 180,
            rotation: 270,
            cutout: '70%',
            responsive: true,
            plugins: { tooltip: { enabled: false }, legend: { display: false } }
        }
    });
}

function resetSustainability() {
    document.getElementById('employmentSlider').value = 61.5; document.getElementById('employmentValue').textContent = '61.5%';
    document.getElementById('productivitySlider').value = 0.5; document.getElementById('productivityValue').textContent = '0.5%';
    document.getElementById('retirementSlider').value = 67; document.getElementById('retirementValue').textContent = '67 anni';
    document.getElementById('fertilitySlider').value = 1.24; document.getElementById('fertilityValue').textContent = '1.24';
    updateSustainability();
}

// --- 4. CHARTS: PYRAMIDS & PROJECTIONS ---

function initDemographicPyramids() {
    createPyramid('pyramid2024', pensionData.demographic_pyramid_2024);
    createPyramid('pyramid2070', pensionData.demographic_pyramid_2070);
}

function createPyramid(canvasId, data) {
    const ctx = document.getElementById(canvasId);
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: data.age_groups,
            datasets: [
                {
                    label: 'Uomini',
                    data: data.males.map(v => -v), // Negative for left side
                    backgroundColor: '#000000',
                    barPercentage: 1.0, categoryPercentage: 1.0
                },
                {
                    label: 'Donne',
                    data: data.females,
                    backgroundColor: '#FFD958',
                    barPercentage: 1.0, categoryPercentage: 1.0
                }
            ]
        },
        options: {
            indexAxis: 'y', // Horizontal bars
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: 'bottom' },
                tooltip: {
                    callbacks: { label: (c) => `${c.dataset.label}: ${Math.abs(c.raw)}M` }
                }
            },
            scales: {
                x: {
                    ticks: { callback: (v) => Math.abs(v) },
                    grid: { color: '#f0f0f0' },
                    suggestedMin: -3, suggestedMax: 3
                },
                y: { grid: { display: false }, stacked: true }
            }
        }
    });
}

function initProjectionsChart() {
    const ctx = document.getElementById('projectionsChart');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: pensionData.spending_projections.years,
            datasets: [
                {
                    label: 'Scenario Attuale (RGS)',
                    data: pensionData.spending_projections.rgs_scenario,
                    borderColor: '#000000', borderWidth: 3, tension: 0.3, pointRadius: 4
                },
                {
                    label: 'Scenario Pessimistico (AWG)',
                    data: pensionData.spending_projections.awg_scenario,
                    borderColor: '#FF0000', borderWidth: 2, borderDash: [5,5], tension: 0.3, pointRadius: 0
                },
                {
                    label: 'Scenario Ottimistico',
                    data: pensionData.spending_projections.optimistic_scenario,
                    borderColor: '#FFD958', borderWidth: 3, tension: 0.3, pointRadius: 0
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                tooltip: { mode: 'index', intersect: false },
                legend: { position: 'top' }
            },
            scales: {
                y: {
                    title: { display: true, text: 'Spesa (% PIL)' },
                    min: 12, max: 19
                }
            }
        }
    });
}

// --- INITIALIZATION ---
document.addEventListener('DOMContentLoaded', function() {
    initQuiz();
    initSustainabilitySimulator();
    initDemographicPyramids();
    initProjectionsChart();
});