import format from "date-fns/format";

const updateMethods = {
  updateTemp(forecast) {
    return forecast.temp?.value?.toFixed();
  },
  updateHighTemp(forecast) {
    return forecast.temp[1].max.value.toFixed();
  },
  updateLowTemp(forecast) {
    return forecast.temp[0].min.value.toFixed();
  },
  updateFeelsLike(forecast) {
    return forecast.feels_like.value.toFixed();
  },
  isNight(forecast) {
    if (!forecast.sunrise || !forecast.sunset) return "";
    // Display night version of icon before sunrise and after sunset
    const sunrise = format(new Date(forecast.sunrise?.value), "H");
    const sunset = format(new Date(forecast.sunset?.value), "H");
    return Number(format(new Date(), "H")) <= sunrise ||
      Number(format(new Date(), "H")) >= sunset
      ? "nt_"
      : "";
  },
  updateNarrative(forecast) {
    let str = forecast.weather_code.value.replace(/_/g, " ");
    if (str.includes("light") || str.includes("heavy")) {
      str = str.split(" ");
      let word = str[str.length - 1];
      str.splice(-1, 1);
      str.splice(0, 0, word);
      str = str.join(" ");
    }
    return str.charAt(0).toUpperCase() + str.slice(1);
  },
  updateWind(forecast) {
    console.log("forecast:", forecast);
    if (!forecast.wind_speed) return;

    if (forecast.wind_speed.value) {
      return forecast.wind_speed.value.toFixed();
    } else {
      const data = forecast.wind_speed;
      let wind = "";
      if (data[0].min.value.toFixed() == data[1].max.value.toFixed()) {
        wind = data[0].humidity[1].max.value.toFixed();
      } else {
        wind = data[0].min.value.toFixed() + "-" + data[1].max.value.toFixed();
      }
      return wind;
    }
  },
  updateHumidity(forecast) {
    if (!forecast.humidity) return;

    if (forecast.humidity.value) {
      return forecast.humidity?.value.toFixed() || "";
    } else {
      const data = forecast.humidity;
      let humidity = "";
      if (data[0].min.value.toFixed() == data[1].max.value.toFixed()) {
        humidity = data[0].humidity[1].max.value.toFixed();
      } else {
        humidity =
          data[0].min.value.toFixed() + "-" + data[1].max.value.toFixed();
      }
      return humidity;
    }
  },
  updateVisibility(forecast) {
    if (!forecast.visibility) return;
    
    if (forecast.visibility.value) {
      return forecast.visibility?.value.toFixed() || "";
    } else {
      const data = forecast.visibility;
      let visibility = "";
      if (data[0].min.value.toFixed() == data[1].max.value.toFixed()) {
        visibility = data[1].max.value.toFixed();
      } else {
        visibility =
          data[0].min.value.toFixed() + "-" + data[1].max.value.toFixed();
      }
      return visibility;
    }
  },
};

export default updateMethods;
