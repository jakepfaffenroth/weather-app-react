import WeatherIcon from "./WeatherIcon";

import updateData from "../lib/updateData";

const Tomorrow = (props) => {
  const { isLoaded, updateNarrative, isDailyLoaded, tomorrow } = props;
  // const tomorrow = props.forecasts.daily[1];

  return (
    <div className="mt-4 sm:mt-0">
      <h2 className="flex items-end mb-2 text-2xl font-medium">Tomorrow</h2>
      <div className="flex">
        <WeatherIcon
          isLoaded={isLoaded}
          narrative={updateData.updateNarrative(tomorrow)}
          isNight={""}
          className={"h-10 self-center"}
        />
        {/* <!-- Temps and narrative --> */}
        <div className="ml-2">
          <div className="flex items-end pb-2 space-x-2">
            <p className="text-lg">
              {updateData.updateHighTemp(tomorrow)}°
            </p>
            <p className="pb-px text-sm font-light">
              {updateData.updateLowTemp(tomorrow)}°
            </p>
          </div>
          <p className="text-md">{updateData.updateNarrative(tomorrow)}</p>
        </div>
        {/* <!-- Other info --> */}
        <div className="ml-8">
          <p className="text-sm">
            Wind:
            <span className="ml-2 font-light">
              {updateData.updateWind(tomorrow)}
              mph
            </span>
          </p>
          <p className="text-sm">
            Humidity:
            <span className="ml-2 font-light">
              {" "}
              {updateData.updateHumidity(tomorrow)}%{" "}
            </span>
          </p>
          <p className="text-sm">
            Visibility:
            <span className="ml-2 font-light">
              {updateData.updateVisibility(tomorrow)}
              mi
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Tomorrow;

// <script>
// import format from 'date-fns/format';
// import WeatherIcon from './WeatherIcon.vue';
// export default {
//   components: {
//     WeatherIcon,
//   },
//   data() {
//     return {
//       temps: {
//         currentTemp: '',
//         highTemp: '',
//         lowTemp: '',
//       },
//       format,
//       isCelcius: false,
//       degreeSymbol: '&#176',
//       isLoaded: false,
//     };
//   },
//   computed: {
//     updateHighTemp() {
//       return this.$store.getters.dailyForecast[1].temp[1].max.value.toFixed();
//     },
//     updateLowTemp() {
//       return this.$store.getters.dailyForecast[1].temp[0].min.value.toFixed();
//     },
//     updateNarrative() {
//       let str = this.$store.getters.dailyForecast[1].weather_code.value.replace(/_/g, ' ');
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
//       const data = this.$store.getters.dailyForecast[1].wind_speed;
//       let wind = '';
//       if (data[0].min.value.toFixed() == data[1].max.value.toFixed()) {
//         wind = data[0].humidity[1].max.value.toFixed();
//       } else {
//         wind = data[0].min.value.toFixed() + '-' + data[1].max.value.toFixed();
//       }
//       return wind;
//     },
//     updateHumidity() {
//       const data = this.$store.getters.dailyForecast[1].humidity;
//       let humidity = '';
//       if (data[0].min.value.toFixed() == data[1].max.value.toFixed()) {
//         humidity = data[0].humidity[1].max.value.toFixed();
//       } else {
//         humidity = data[0].min.value.toFixed() + '-' + data[1].max.value.toFixed();
//       }
//       return humidity;
//     },
//     updateVisibility() {
//       const data = this.$store.getters.dailyForecast[1].visibility;
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
// </script>
