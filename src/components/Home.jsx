import { useState } from "react";

function Home() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  // Replace with your actual API key from weatherapi.com
  const API_KEY = "312bbc5e1eeb4ec1b7e180813251911";

  const handleSearch = async () => {
    if (!city.trim()) return;
    setLoading(true);
    setWeather(null);

    try {
      const res = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`
      );
      if (!res.ok) throw new Error();
      const data = await res.json();
      setWeather({
        temperature: data.current.temp_c + "°C",
        humidity: data.current.humidity + "%",
        condition: data.current.condition.text,
        wind: data.current.wind_kph + " kph"
      });
      setLoading(false);
    } catch {
      setLoading(false);
      window.alert("Failed to fetch weather data");
    }
  };

  return (
    <div style={{ background: "#eef6fb", minHeight: "100vh", paddingTop: 70 }}>
      <div style={{ textAlign: "center" }}>
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={e => setCity(e.target.value)}
          style={{
            padding: "12px 16px",
            borderRadius: 6,
            border: "1px solid #cbe5fa",
            fontSize: "1.15em",
            marginRight: 8,
            marginBottom: 28,
            width: 250,
            background: "white"
          }}
        />
        <button
          style={{
            padding: "10px 32px",
            borderRadius: 6,
            background: "#42b44d",
            color: "white",
            fontWeight: "bold",
            fontSize: "1.12em",
            border: "none",
            cursor: "pointer"
          }}
          onClick={handleSearch}
        >
          Search
        </button>
        {loading && (
          <p style={{ marginTop: 38, fontSize: "1.1em", color: "#333" }}>
            Loading data...
          </p>
        )}
      </div>

      {weather && (
        <div
          className="weather-cards"
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "30px",
            marginTop: 24
          }}
        >
          <div className="weather-card" style={cardStyle}>
            <strong>Temperature</strong>
            <div>{weather.temperature}</div>
          </div>
          <div className="weather-card" style={cardStyle}>
            <strong>Humidity</strong>
            <div>{weather.humidity}</div>
          </div>
          <div className="weather-card" style={cardStyle}>
            <strong>Condition</strong>
            <div>{weather.condition}</div>
          </div>
          <div className="weather-card" style={cardStyle}>
            <strong>Wind Speed</strong>
            <div>{weather.wind}</div>
          </div>
        </div>
      )}
    </div>
  );
}

// Simple card style used above
const cardStyle = {
  background: "white",
  borderRadius: 8,
  boxShadow: "0 2px 16px rgba(0,0,0,0.08)",
  padding: "30px 32px",
  textAlign: "center",
  minWidth: 170,
  fontSize: "1.1em"
};

export default Home;
