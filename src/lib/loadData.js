// import { useState } from "react";
import addDays from "date-fns/addDays";
import * as devJson from "../assets/devJSON.js";

// const data = {
//   // TODO - remove all the unused data
//   isDevMode: false,
//   readyToRender: false,
//   units: "imperial",
//   todayData: [],
//   apiFullUrl: "",
//   lat: "",
//   long: "",
//   latLong: "",
//   weatherData: {},
//   location: "",
//   gridURL: "",
//   forecastURL: "",
//   rawForecastData: "",
//   currentURL: "",
//   forecastObj: [],
//   forecastName: "",
//   forecastSummary: "",
//   isRealtimeLoaded: false,
//   isNowcastLoaded: false,
//   isHourlyLoaded: false,
//   isDailyLoaded: false,
//   pointsURL: "",
// };

function checkIfDevMode(isDevMode) {
  if (isDevMode) {
    console.log("Manual Dev Mode");
    loadStaticData();
    return true;
  }
}

function loadStaticData(forecasts, setForecasts) {
  console.log("DEV MODE - Loading static weather data");

  // Adds myId to each hour of hourlyForecast
  for (let index = 0; index < devJson.hourlyDevJson.length; index++) {
    devJson.hourlyDevJson[index].myId = index;
  }
  // Adds myId to each day of dailyForecast
  for (let index = 0; index < devJson.dailyDevJson.length; index++) {
    devJson.dailyDevJson[index].date = addDays(new Date(), index);
    devJson.dailyDevJson[index].myId = index;
  }
  // this.$store.commit("updateLatLong", "48.71, -122.45");
  // this.$store.commit("updateCity", "Bellingham");
  // this.$store.commit("updateUsState", "WA");
  const staticGeoLoc = {
    updateLatLong: "48.71, -122.45",
    updateCity: "Bellingham",
    updateUsState: "WA",
  };
  this.location = "Bellingham, WA";
  const staticData = {
    realtime: devJson.realtimeDevJson,
    nowcast: devJson.nowcastDevJson,
    hourly: devJson.hourlyDevJson,
    daily: devJson.dailyDevJson,
  };

  // this.$store.commit("updateRealtimeForecast", devJson.realtimeDevJson);
  // this.$store.commit("updateNowcastForecast", devJson.nowcastDevJson);
  // this.$store.commit("updateHourlyForecast", devJson.hourlyDevJson);
  // this.$store.commit("updateDailyForecast", devJson.dailyDevJson);

  // this.readyToRender = true;
  // this.sectionsAreLoaded();

  return staticData;
}

// Renders data on the screen
function updateDisplay(data) {
  checkIfDevMode();

  // If any recieved data is static then isDevMode = true
  if (data.isStatic) {
    console.log("Error! Server is online, but weather API call failed");
    console.log("... Probably exceeded rate limit");
    // isDevMode = true;
    return loadStaticData();
  }
  this.$store.commit("updateLatLong", data.geo.lat + ", " + data.geo.long);
  this.$store.commit("updateCity", data.geo.city);
  this.$store.commit("updateUsState", data.geo.state);
  this.location = data.geo.city + ", " + data.geo.state;

  this.$store.commit("updateRealtimeForecast", data.realtime);
  this.$store.commit("updateNowcastForecast", data.nowcast);
  this.$store.commit("updateHourlyForecast", data.hourly);
  this.$store.commit("updateDailyForecast", data.daily);
  return sectionsAreLoaded();
}

// Marks that all sections are loaded and ready to render
function sectionsAreLoaded() {
  return {
    isRealtimeLoaded: true,
    isNowcastLoaded: true,
    isHourlyLoaded: true,
    isDailyLoaded: true,
  };
}

export { checkIfDevMode, loadStaticData, updateDisplay, sectionsAreLoaded };
