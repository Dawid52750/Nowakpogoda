export const mockWeather = [
  {
    id: 1,
    city: "Warszawa",
    currentTemp: 15,
    condition: "Słonecznie",
    icon: "☀️",
    precipProb: 13,
    precipType: "Brak",
    precipAmount: 0,
    windSpeed: 20,
    windDir: "NW",
    cloudiness: 10,
    forecast: [
      { day: "Jutro", temp: 16 },
      { day: "Pojutrze", temp: 14 },
      { day: "Dzień 3", temp: 18 },
      { day: "Dzień 4", temp: 19 },
      { day: "Dzień 5", temp: 15 }
    ]
  },
  {
    id: 2,
    city: "Kraków",
    currentTemp: 12,
    condition: "Zachmurzenie",
    icon: "☁️",
    precipProb: 30,
    precipType: "Mżawka",
    precipAmount: 0.5,
    windSpeed: 10,
    windDir: "S",
    cloudiness: 73,
    forecast: [
      { day: "Jutro", temp: 11 },
      { day: "Pojutrze", temp: 13 },
      { day: "Dzień 3", temp: 12 },
      { day: "Dzień 4", temp: 10 },
      { day: "Dzień 5", temp: 14 }
    ]
  },
  {
    id: 3,
    city: "Gdańsk",
    currentTemp: 10,
    condition: "Deszczowo",
    icon: "🌧️",
    precipProb: 90,
    precipType: "Deszcz",
    precipAmount: 5.0,
    windSpeed: 30,
    windDir: "N",
    cloudiness: 100,
    forecast: [ { day: "Jutro", temp: 9 }, { day: "Pojutrze", temp: 10 }, { day: "Dzień 3", temp: 11 }, { day: "Dzień 4", temp: 12 }, { day: "Dzień 5", temp: 10 } ]
  },
  {
    id: 4,
    city: "Wrocław",
    currentTemp: 18,
    condition: "Słonecznie",
    icon: "☀️",
    precipProb: 5,
    precipType: "Brak",
    precipAmount: 0,
    windSpeed: 15,
    windDir: "W",
    cloudiness: 5,
    forecast: [ { day: "Jutro", temp: 19 }, { day: "Pojutrze", temp: 20 }, { day: "Dzień 3", temp: 18 }, { day: "Dzień 4", temp: 17 }, { day: "Dzień 5", temp: 18 } ]
  },
  {
    id: 5,
    city: "Zakopane",
    currentTemp: 5,
    condition: "Śnieżnie",
    icon: "❄️",
    precipProb: 60,
    precipType: "Śnieg",
    precipAmount: 2.5,
    windSpeed: 5,
    windDir: "SW",
    cloudiness: 90,
    forecast: [ { day: "Jutro", temp: 4 }, { day: "Pojutrze", temp: 2 }, { day: "Dzień 3", temp: 0 }, { day: "Dzień 4", temp: -1 }, { day: "Dzień 5", temp: 1 } ]
  }
];