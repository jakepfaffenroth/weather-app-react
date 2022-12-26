import { useEffect } from "react";
import format from "date-fns/format";
import WeatherIcon from "./WeatherIcon.jsx";
import updateData from "../lib/updateData";

const data = {
  realtimeForecast: {},
  dailyForecast: {},
  temps: {
    currentTemp: "",
    highTemp: "",
    lowTemp: "",
  },
  narrative: "",
  format,
  isCelcius: false,
  degreeSymbol: "&#176",
  isLoaded: false,
};

const methods = {
  updateTemp: function () {
    return this.$store.getters.realtimeForecast.feels_like.value.toFixed();
  },
  updateHighTemp() {
    return this.$store.getters.dailyForecast[0].temp[1].max.value.toFixed();
  },
  updateLowTemp() {
    return this.$store.getters.dailyForecast[0].temp[0].min.value.toFixed();
  },
  updateNarrative() {
    let str = this.$store.getters.dailyForecast[0].weather_code.value.replace(
      /_/g,
      " "
    );
    if (str.includes("light") || str.includes("heavy")) {
      str = str.split(" ");
      let word = str[str.length - 1];
      str.splice(-1, 1);
      str.splice(0, 0, word);
      str = str.join(" ");
    }

    return str.charAt(0).toUpperCase() + str.slice(1);
  },
  updateWind() {
    const data = this.$store.getters.dailyForecast[0].wind_speed;
    let wind = "";
    if (data[0].min.value.toFixed() == data[1].max.value.toFixed()) {
      wind = data[0].humidity[1].max.value.toFixed();
    } else {
      wind = data[0].min.value.toFixed() + "-" + data[1].max.value.toFixed();
    }
    return wind;
  },
  updateHumidity() {
    const data = this.$store.getters.dailyForecast[0].humidity;
    let humidity = "";
    if (data[0].min.value.toFixed() == data[1].max.value.toFixed()) {
      humidity = data[0].humidity[1].max.value.toFixed();
    } else {
      humidity =
        data[0].min.value.toFixed() + "-" + data[1].max.value.toFixed();
    }
    return humidity;
  },
  updateVisibility() {
    const data = this.$store.getters.dailyForecast[0].visibility;
    let visibility = "";
    if (data[0].min.value.toFixed() == data[1].max.value.toFixed()) {
      visibility = data[1].max.value.toFixed();
    } else {
      visibility =
        data[0].min.value.toFixed() + "-" + data[1].max.value.toFixed();
    }
    return visibility;
  },
};

const Today = (props) => {
  const { isLoaded, updateNarrative, isDailyLoaded, today } = props;
  // const today = props.forecasts.daily[0];

  return isDailyLoaded ? (
    <div>
      <h2 className="flex items-end mb-2 text-2xl font-medium">Today</h2>
      <div className="flex">
        <WeatherIcon
          isLoaded={isLoaded}
          narrative={updateData.updateNarrative(today)}
          isNight={""}
          className="h-10 self-center"
        />
        <div className="ml-2">
          <div className="flex items-end pb-2 space-x-2">
            <p className="text-lg">{updateData.updateHighTemp(today)}°</p>
            <p className="pb-px text-sm font-light">
              {updateData.updateLowTemp(today)}°
            </p>
          </div>
          <p className="text-md">{updateData.updateNarrative(today)}</p>
        </div>
        <div className="ml-8">
          <p className="text-sm">
            Wind:
            <span className="ml-2 font-light">
              {updateData.updateWind(today)}
              mph
            </span>
          </p>
          <p className="text-sm">
            Humidity:
            <span className="ml-2 font-light">
              {updateData.updateHumidity(today)}%
            </span>
          </p>
          <p className="text-sm">
            Visibility:
            <span className="ml-2 font-light">
              {updateData.updateVisibility(today)}
              mi
            </span>
          </p>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
};

export default Today;
// {
//   /* <script>

// import WeatherIcon from './WeatherIcon.vue';
// export default {
//   components: {
//     WeatherIcon,
//   },
//   data() {
//     return {
//       realtimeForecast: {},
//       dailyForecast: {},
//       temps: {
//         currentTemp: '',
//         highTemp: '',
//         lowTemp: '',
//       },
//       narrative: '',
//       format,
//       isCelcius: false,
//       degreeSymbol: '&#176',
//       isLoaded: false,
//     };
//   },
//   computed: {
//     updateTemp: function () {
//       return this.$store.getters.realtimeForecast.feels_like.value.toFixed();
//     },
//     updateHighTemp() {
//       return this.$store.getters.dailyForecast[0].temp[1].max.value.toFixed();
//     },
//     updateLowTemp() {
//       return this.$store.getters.dailyForecast[0].temp[0].min.value.toFixed();
//     },
//     updateNarrative() {
//       let str = this.$store.getters.dailyForecast[0].weather_code.value.replace(/_/g, ' ');
//       if (str.includes('light') || str.includes('heavy')) {
//         str = str.split(' ');
//         let word = str[str.length-1];
//         str.splice(-1, 1)
//         str.splice(0, 0, word);
//         str = str.join(' ');
//       }

//       return str.charAt(0).toUpperCase() + str.slice(1);
//     },
//     updateWind() {
//       const data = this.$store.getters.dailyForecast[0].wind_speed;
//       let wind = '';
//       if (data[0].min.value.toFixed() == data[1].max.value.toFixed()) {
//         wind = data[0].humidity[1].max.value.toFixed();
//       } else {
//         wind = data[0].min.value.toFixed() + '-' + data[1].max.value.toFixed();
//       }
//       return wind;
//     },
//     updateHumidity() {
//       const data = this.$store.getters.dailyForecast[0].humidity;
//       let humidity = '';
//       if (data[0].min.value.toFixed() == data[1].max.value.toFixed()) {
//         humidity = data[0].humidity[1].max.value.toFixed();
//       } else {
//         humidity = data[0].min.value.toFixed() + '-' + data[1].max.value.toFixed();
//       }
//       return humidity;
//     },
//     updateVisibility() {
//       const data = this.$store.getters.dailyForecast[0].visibility;
//       let visibility = '';
//       if (data[0].min.value.toFixed() == data[1].max.value.toFixed()) {
//         visibility = data[1].max.value.toFixed();
//       } else {
//         visibility = data[0].min.value.toFixed() + '-' + data[1].max.value.toFixed();
//       }
//       return visibility;
//     },
//   },
//   created() {
//     for (var key in this.temps) {
//       if (this.isCelcius) {
//         this.temps[key] = ((5 / 9) * (this.temps[key] - 32)).toFixed();
//         this.degreeSymbol = 'C';
//       }
//     }
//   },
//   mounted() {
//     this.isLoaded = true;
//   },
// };
// </script> */
// }
