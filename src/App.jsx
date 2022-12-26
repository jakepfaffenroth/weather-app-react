import { useEffect, useState } from "react";

import "./App.css";
import RightNow from "./components/RightNow.jsx";
import TodayTomorrow from "./components/TodayTomorrow.jsx";
import TenDay from "./components/TenDay.jsx";
import Footer from "./components/Footer.jsx";

import { getWeatherData } from "./lib/fetchWeather.js";
import { updateDisplay } from "./lib/loadData";

function updateLocation(geoLoc) {
  return geoLoc.city + ", " + geoLoc.usState;
}
function updateLatLong(geoLoc) {
  return geoLoc.latLong.replace(",", ", ");
}

const App = () => {
  let isDevMode = true;

  const [isLoaded, setIsLoaded] = useState(false);
  const [dataLoaded, setDataLoaded] = useState({
    isRealtimeLoaded: false,
    isNowcastLoaded: false,
    isHourlyLoaded: false,
    isDailyLoaded: false,
  });
  const [forecasts, setForecasts] = useState({
    realtime: [],
    nowcast: [],
    hourly: [],
    daily: [],
  });

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    (async function () {
      const weatherData = await getWeatherData(forecasts, setForecasts);
      if (!weatherData) return;

      setForecasts({
        ...forecasts,
        ...weatherData,
      });
      setDataLoaded({
        isRealtimeLoaded: true,
        isNowcastLoaded: true,
        isHourlyLoaded: true,
        isDailyLoaded: true,
      });
      console.log("weatherData:", weatherData);
    })();
  }, []);

  const [geoLoc, setGeoLoc] = useState({
    city: "Bellingham",
    usState: "WA",
    latLong: "123,456",
  });

  return (
    <div
      id="app"
      className="xl:mx-56 lg:mx-40 md:my-10 md:mx-16 sm:mx-12 sm:my- mx-4 my-4"
    >
      <h1 className="text-4xl font-semibold hidden sm:block">
        Your weather
        {isDevMode ? <span className="text-red-500">*</span> : ""}
      </h1>
      <div className="sm:flex sm:justify-between my-4 sm:pb-2 sm:border-b sm:border-blue-400">
        <div className="flex sm:hidden">
          <div className="flex justify-between pb-1 mb-2 w-full border-b border-blue-400">
            <div className="flex items-center">
              <h2 className="sm:mt-0 sm:ml-2 text-sm sm:text-lg">
                {updateLocation(geoLoc)}
              </h2>
              <div className="ml-4 flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 30 23"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-map-pin self-center h-auto"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                <h2 className="text-sm  flex"></h2>
              </div>
            </div>
            <search-location
              onSubmit={() => {
                getWeatherData();
                updateDisplay();
              }}
              className="justify-end"
            ></search-location>
          </div>
        </div>
        <RightNow
          isRealtimeLoaded={dataLoaded.isRealtimeLoaded}
          isLoaded={isLoaded}
          forecasts={forecasts}
        />
        <div className="hidden sm:block">
          <div>
            <h2 className="mt-6 ml-2 sm:mt-0 sm:text-lg text-sm ">
              {updateLocation(geoLoc)}
            </h2>
            <div className="ml-2 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-map-pin"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              <h2 className="text-sm ml-2 flex">{updateLatLong(geoLoc)}</h2>
            </div>
          </div>
          {/* <search-location
            v-on:update-display="updateDisplay"
            v-on:get-weather-data="getWeatherData"
          ></search-location> */}
        </div>
      </div>
      <TodayTomorrow
        isDailyLoaded={dataLoaded.isDailyLoaded}
        isLoaded={isLoaded}
        forecasts={forecasts}
      />
      <TenDay isLoaded={isLoaded} daily={forecasts.daily} />
      <Footer isDevMode={isDevMode} />
    </div>
  );
};

export default App;
