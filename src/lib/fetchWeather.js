import axios from "axios";
import * as loadData from "./loadData.js";

export async function getWeatherData(forecasts, setForecasts) {
  // const isRealtimeLoaded = false;
  // const isNowcastLoaded = false;
  // const isHourlyLoaded = false;
  // const isDailyLoaded = false;

  // If Dev Mode turned on, load static data without calling server
  let isDevMode = loadData.checkIfDevMode();

  // Call server
  try {
    // Dev Mode is off; Proceed to get GPS coordinates
    // const coordinates = await this.$getLocation();
    const coordinates = { lat: 123, lng: 456 };
    const axiosRes = await axios({
      method: "POST",
      url: process.env.VUE_APP_SERVER,
      data: JSON.stringify({
        latLong: coordinates.lat.toFixed(2) + "," + coordinates.lng.toFixed(2),
        isDevMode: isDevMode,
      }),
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });

    // Server available but responded with error msg
    if (axiosRes.status !== 200) {
      console.log(
        "Error! Server is online but returned ",
        axiosRes.status,
        axiosRes.statusText
      );
      isDevMode = true;
      return loadData.loadStaticData(forecasts, setForecasts);
    }
    // Server response and weather data are good
    else {
      return axiosRes.data;
    }
  } catch (err) {
    console.log("err:", err);

    // Server unavailable, load static data
    console.log("Error! Server is offline");
    isDevMode = true;
    return loadData.loadStaticData(forecasts, setForecasts);
  }
}
