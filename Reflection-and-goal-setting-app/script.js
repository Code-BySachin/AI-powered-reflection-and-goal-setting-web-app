// Configuration
const API_KEY = window.GEMINI_API_KEY;
const BASE_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

// DOM Elements
const reflectionInput = document.getElementById('reflection-input');
const analyzeReflectionBtn = document.getElementById('analyze-reflection');
const reflectionAnalysis = document.getElementById('reflection-analysis');
const goalInput = document.getElementById('goal-input');
const timeframeSelect = document.getElementById('timeframe');
const planGoalBtn = document.getElementById('plan-goal');
const goalPlan = document.getElementById('goal-plan');
const entriesContainer = document.getElementById('entries-container');

// Store entries in localStorage
let entries = JSON.parse(localStorage.getItem('mindfulMomentsEntries')) || [];

// Initialize the app
function init() {
    renderEntries();
    setupEventListeners();
}

// Set up event listeners
function setupEventListeners() {
    analyzeReflectionBtn.addEventListener('click', handleReflectionAnalysis);
    planGoalBtn.addEventListener('click', handleGoalPlanning);
}

// Handle reflection analysis
async function handleReflectionAnalysis() {
    const reflectionText = reflectionInput.value.trim();
    
    if (!reflectionText) {
        alert('Please enter your reflection before analyzing.');
        return;
    }
    
    // Disable button during processing
    analyzeReflectionBtn.disabled = true;
    analyzeReflectionBtn.textContent = 'Analyzing...';
    
    try {
        const prompt = `Respond to this daily reflection in a warm, conversational tone (3-4 sentences): "${reflectionText}"`;
        const analysis = await callGeminiAPI(prompt);
        
        reflectionAnalysis.innerHTML = formatResponse(analysis);
        reflectionAnalysis.classList.remove('hidden');
        
        saveEntry({
            type: 'reflection',
            content: reflectionText,
            insights: analysis,
            date: new Date().toISOString()
        });
        
    } catch (error) {
        console.error('Error:', error);
        reflectionAnalysis.innerHTML = `Sorry, I couldn't analyze your reflection. Please try again later.`;
        reflectionAnalysis.classList.remove('hidden');
    } finally {
        analyzeReflectionBtn.disabled = false;
        analyzeReflectionBtn.innerHTML = '<i class="fas fa-lightbulb"></i> Get Insights';
        reflectionInput.value = '';
    }
}

// Handle goal planning
async function handleGoalPlanning() {
    const goalText = goalInput.value.trim();
    const timeframe = timeframeSelect.value;
    
    if (!goalText) {
        alert('Please describe your goal before creating a plan.');
        return;
    }
    
    // Disable button during processing
    planGoalBtn.disabled = true;
    planGoalBtn.textContent = 'Planning...';
    
    try {
        const timeframeDescription = {
            'short-term': 'this week',
            'medium-term': 'this month',
            'long-term': 'this year'
        }[timeframe] || '';
        
        const prompt = `Create a simple action plan (4-5 steps) for this ${timeframeDescription} goal: "${goalText}"`;
        const plan = await callGeminiAPI(prompt);
        
        goalPlan.innerHTML = formatResponse(plan);
        goalPlan.classList.remove('hidden');
        
        saveEntry({
            type: 'goal',
            content: goalText,
            insights: plan,
            timeframe: timeframe,
            date: new Date().toISOString()
        });
        
    } catch (error) {
        console.error('Error:', error);
        goalPlan.innerHTML = `Sorry, I couldn't create a plan. Please try again later.`;
        goalPlan.classList.remove('hidden');
    } finally {
        planGoalBtn.disabled = false;
        planGoalBtn.innerHTML = '<i class="fas fa-magic"></i> Create Action Plan';
        goalInput.value = '';
    }
}

// Basic API call without timeout
async function callGeminiAPI(prompt) {
    const response = await fetch(`${BASE_URL}?key=${API_KEY}`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            contents: [{parts: [{text: prompt}]}]
        })
    });
    
    if (!response.ok) {
        throw new Error('API request failed');
    }
    
    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || 
           'Received empty response from the API';
}

// Format response
function formatResponse(text) {
    return text
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/^-\s(.*$)/gm, '<li>$1</li>')
        .replace(/(<li>.*<\/li>)/g, '<ul>$1</ul>')
        .replace(/\n/g, '<br>')
        .replace(/<\/ul><br><ul>/g, '');
}

// Save entry
function saveEntry(entry) {
    entries.unshift(entry);
    localStorage.setItem('mindfulMomentsEntries', JSON.stringify(entries));
    renderEntries();
}

// Render entries
function renderEntries() {
    entriesContainer.innerHTML = entries.length ? '' : '<p>No entries yet</p>';
    
    entries.forEach(entry => {
        const entryCard = document.createElement('div');
        entryCard.className = 'entry-card';
        entryCard.innerHTML = `
            <h3>${entry.type === 'reflection' ? 'Reflection' : 'Goal'}</h3>
            <div class="date">${new Date(entry.date).toLocaleString()}</div>
            <div class="content">${entry.content}</div>
            <div class="insights">${formatResponse(entry.insights)}</div>
        `;
        entriesContainer.appendChild(entryCard);
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', init);
