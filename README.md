# 🌤️ Weather App React

A simple weather application built with React that displays current weather information for any city using the OpenWeatherMap API.

<figure>
  <a href="./images/demo.png" target="_blank" rel="noopener noreferrer">
    <img src="./images/demo.png" alt="Weather App demo showing search and current weather for a city" loading="lazy" decoding="async" style="max-width:100%;height:auto;border-radius:8px;box-shadow:0 8px 24px rgba(0,0,0,0.12);" />
  </a>
  <figcaption style="text-align:center;font-size:0.9rem;color:#666;margin-top:0.5rem;">Click to view full-size screenshot</figcaption>
</figure>

## 🚀 Features

- Search for weather by city name
- Displays temperature (°C), humidity, wind speed, and weather condition
- Responsive and modern UI
- Weather icons for different conditions
- Fast development & build using Vite

## 💻 Tech Stack

- **React** (with Hooks)
- **Vite** (for fast development and build)
- **OpenWeatherMap API** (for weather data)
- **CSS** (custom styling, responsive design)
- **ESLint** (code linting)

## Getting Started

1. **📥 Clone the repository:**
   ```sh
   git clone https://github.com/Balaji-R-05/weather-app-react.git
   cd weather-app-react
   ```

2. **🔑 Add your OpenWeatherMap API key**
   - Create a `.env` file in the project root with the following content:
     ```env
     VITE_WEATHER_API_KEY=************
     ```
   - Get an API key from https://openweathermap.org/ and restart the dev server if it's running.

3. **📦 Install dependencies**
    ```sh
    npm install
    ```

4. **🚀 Run the development server:**
    ```sh
    npm run dev
    ```