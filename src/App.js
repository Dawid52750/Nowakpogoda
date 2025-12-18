import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Link, useParams } from 'react-router-dom';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { store, setUnit, toggleFavorite } from './store';
import './App.css';

const API_KEY = '2f15a54286d524de71eae8330be72415';

const Temperature = ({ kelvin }) => {
  const unit = useSelector((state) => state.settings.unit);
  const convert = (k) => {
    if (unit === 'F') return ((k - 273.15) * 9/5 + 32).toFixed(1);
    if (unit === 'K') return k.toFixed(1);
    return (k - 273.15).toFixed(1);
  };
  return <span>{convert(kelvin)}°{unit}</span>;
};

const Home = () => {
  const [search, setSearch] = useState('');
  const [weatherData, setWeatherData] = useState([]);
  const dispatch = useDispatch();
  const { unit, favorites } = useSelector(state => state.settings);
  const cities = ["Warszawa", "Kraków", "Gdańsk", "Wrocław", "Zakopane"];

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const results = await Promise.all(cities.map(city =>
          axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&lang=pl`)
        ));
        setWeatherData(results.map(r => r.data));
      } catch (err) {
        console.error(err);
      }
    };
    fetchWeather();
  }, []);

  const filtered = weatherData.filter(w => w.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="container">
      <div className="controls">
        <input placeholder="Szukaj miasta..." onChange={(e) => setSearch(e.target.value)} />
        <select value={unit} onChange={(e) => dispatch(setUnit(e.target.value))}>
          <option value="C">Celsjusz</option>
          <option value="F">Fahrenheit</option>
          <option value="K">Kelvin</option>
        </select>
      </div>
      <div className="list">
        {filtered.map(w => (
          <div key={w.id} className="card">
            <h3>
              {w.name}
              <span onClick={() => dispatch(toggleFavorite(w.name))} style={{cursor:'pointer', marginLeft: '10px'}}>
                {favorites.includes(w.name) ? '★' : '☆'}
              </span>
            </h3>
            <p className="temp-big"><Temperature kelvin={w.main.temp} /></p>
            <Link to={`/details/${w.name}`}><button>Szczegóły</button></Link>
          </div>
        ))}
      </div>
    </div>
  );
};

const Details = () => {
  const { name } = useParams();
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);

  useEffect(() => {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${API_KEY}&lang=pl`)
      .then(res => setWeather(res.data));

    axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${name}&appid=${API_KEY}&lang=pl`)
      .then(res => {
        const daily = res.data.list.filter((item, index) => index % 8 === 0);
        setForecast(daily);
      });
  }, [name]);

  if (!weather) return <div className="container">Ładowanie...</div>;

  return (
    <div className="container">
      <Link to="/" className="back-link">← Wróć do listy</Link>
      <div className="detail-layout">
        <div className="main-weather-card">
          <p>Aktualna pogoda</p>
          <h2>{weather.name}</h2>
          <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`} alt="weather" />
          <p className="temp-huge"><Temperature kelvin={weather.main.temp} /></p>
          <p className="description">{weather.weather[0].description}</p>
        </div>
        <div className="stats-grid-modern">
          <div className="stat-box-modern"><span>💧 Wilgotność</span><strong>{weather.main.humidity}%</strong></div>
          <div className="stat-box-modern"><span>💨 Wiatr</span><strong>{weather.wind.speed} m/s</strong></div>
          <div className="stat-box-modern"><span>☁️ Zachmurzenie</span><strong>{weather.clouds.all}%</strong></div>
          <div className="stat-box-modern"><span>📉 Ciśnienie</span><strong>{weather.main.pressure} hPa</strong></div>
        </div>
        <div className="forecast-section">
          <h3>Prognoza 5-dniowa</h3>
          <div className="forecast-grid">
            {forecast.map((day, idx) => (
              <div key={idx} className="forecast-item">
                <span>{new Date(day.dt * 1000).toLocaleDateString('pl-PL', {weekday: 'short'})}</span>
                <img src={`http://openweathermap.org/img/wn/${day.weather[0].icon}.png`} alt="icon" />
                <strong><Temperature kelvin={day.main.temp} /></strong>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/details/:name" element={<Details />} />
        </Routes>
      </Router>
    </Provider>
  );
}