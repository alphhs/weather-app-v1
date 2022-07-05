import { Footer } from "./Footer";
import { useState } from "react";
import axios from "axios";
import { Content } from "./Content";

const defaultData = {
  positionName: "0",
  currentTemp: "0",
  description: "0",
  feelsLike: "0",
};

function App() {
  const [long, setLong] = useState("0");
  const [lat, setLat] = useState("0");
  const [data, setData] = useState(defaultData);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      console.log("Error");
    }
  };
  const findCity = (city) => {
    console.log(city);
  };

  const showPosition = (position) => {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    setLat(latitude);

    setLong(longitude);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLong("0");
    setLat("0");
    getLocation();
  };
  const handleSearch = (e) => {
    e.preventDefault();
    if (lat === "0" || long === "0") {
      alert(
        "Enter your location information, or press on the current position button"
      );
    }
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&details=true&appid=2285dba8e74ee81394cc704c56bdf277`
      )
      .then((res) => {
        setData(() => {
          return {
            positionName: res.data.name,
            currentTemp: res.data.main.temp,
            description: res.data.weather[0].description,
            feelsLike: res.data.main.feels_like,
          };
        });
      });
  };

  return (
    <>
      <div className="header">
        <h1>What's the temperature?</h1>
        <form className="form-control">
          <label id="searchbar">Enter your location</label>
          <div className="position longitude">
            <label htmlFor="longitude">Longitude</label>
            <input
              type="number"
              id="longitude"
              placeholder={long}
              value={long}
              onChange={(e) => setLong(e.target.value)}
            />
          </div>
          <div className="position latitude">
            <label htmlFor="latitude">latitude</label>
            <input
              type="number"
              id="latitude"
              value={lat}
              placeholder={lat}
              onChange={(e) => setLat(e.target.value)}
            />
          </div>
          <button className="btn" onClick={handleSubmit}>
            Get current position
          </button>
          <button className="btn" onClick={handleSearch}>
            Search
          </button>
        </form>
      </div>
      <Content data={data} long={long} lat={lat} findCity={findCity} />
      <Footer />
    </>
  );
}

export default App;
