# Mindful Moments - Reflection & Goal Setting App

Mindful Moments is a simple web application that helps you reflect on your day and set actionable goals. Powered by the Gemini 2.5 Flash API, it provides AI-generated insights on your reflections and helps you create step-by-step plans for your goals.

## Features

- **Daily Reflection:** Write about your day and receive warm, conversational insights.
- **Goal Setting:** Set short-term, medium-term, or long-term goals and get a simple action plan.
- **History:** View your past reflections and goals in a timeline.
- **Local Storage:** All entries are saved in your browser for privacy and convenience.

## Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Edge, etc.)
- A Gemini API key (Google Generative Language API)

### Setup

1. **Clone or download this repository.**
2. **Create a `.env` file** in the project root and add your Gemini API key:
    ```
    GEMINI_API_KEY=your_api_key_here
    ```
3. **Open `index.html` in your browser.**

> **Note:** The API key is currently hardcoded in `script.js` for demo purposes. For production, consider securing your API key.

## File Structure

- [`index.html`](index.html): Main HTML file.
- [`style.css`](style.css): App styling.
- [`script.js`](script.js): App logic and API integration.
- `.env`: API key configuration (not used directly by the browser).

## Usage

1. Enter your daily reflection and click **Get Insights** to receive feedback.
2. Set a goal, choose a timeframe, and click **Create Action Plan** for a step-by-step guide.
3. Your entries will appear in the **Your History** section.

## Technologies Used

- HTML, CSS, JavaScript
- [Google Gemini 2.5 Flash API](https://ai.google.dev/)
- [Font Awesome](https://fontawesome.com/) for icons

## Disclaimer

This app stores your data locally in your browser and does not share it with anyone. The AI-generated insights are for informational purposes only.

---

**Powered by Gemini
