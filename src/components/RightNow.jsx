// import format from "date-fns/format";
import WeatherIcon from "./WeatherIcon.jsx";

import updateData from "../lib/updateData";

// let narrative = "";

const RightNow = ({ forecasts, isLoaded, isRealtimeLoaded }) => {
  const degreeSymbol = `&#176;`;
  const nowcast = forecasts.nowcast[0];

  return isRealtimeLoaded ? (
    <div className="flex-grow">
      <h2 className="text-2xl font-medium">Right Now</h2>
      {/* Weather info */}
      <div className="flex flex-wrap sm:flex-no-wrap ml-2 w-full items-center sm:text-lg text-xl">
        {/* Main weather info */}
        <div className="flex">
          {/* Weather icon */}
          <WeatherIcon
            isLoaded={isLoaded}
            narrative={updateData.updateNarrative(nowcast)}
            isNight={updateData.isNight(nowcast)}
            className={"sm:h-16 h-20 pb-1"}
          />
          {/* Current temp */}
          <p className="pb-px ml-4 sm:text-4xl text-4xl">
            {updateData.updateTemp(nowcast)}°
          </p>
          {/* Feels like & narrative */}
          <div className="ml-6 sm:ml-6 sm:w-full">
            <p className="pb-px font-thin">
              Feels like
              <span className="ml-2 font-light">
                {updateData.updateFeelsLike(nowcast)}°
              </span>
            </p>
            <p className="font-light">{updateData.updateNarrative(nowcast)}</p>
          </div>
        </div>
        {/* Other weather data */}
        <div className="flex w-full sm:w-1/4  sm:block text-sm ml-2 mr-6 sm:ml-8 justify-between">
          <div className="flex items-end">
            <p>
              Wind:
              <span className="ml-2 font-light">
                {updateData.updateWind(nowcast)} mph
              </span>
            </p>
            <p className="ml-2 font-light pb-px"></p>
          </div>
          <div className="flex items-end">
            <p>
              Humidity:
              <span className="ml-2 font-light">
                {updateData.updateHumidity(nowcast)}%
              </span>
            </p>
            <p className="ml-2 font-light pb-px"></p>
          </div>
          <div className="flex items-end">
            <p>
              Visibility:
              <span className="ml-2 font-light">
                {updateData.updateVisibility(nowcast)} mi
              </span>
            </p>
            <p className="ml-2 font-light pb-px"></p>
          </div>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
};

// {
//   /* <script>
// import WeatherIcon from './WeatherIcon.vue';
// import format from 'date-fns/format';
// export default {
//   // props: {
//   //   isRealtimeLoaded: Boolean,
//   // },
//   components: {
//     WeatherIcon,
//   },
//   data() {
//     return {
//       narrative: '',
//       degreeSymbol: '&#176',
//       isLoaded: false,
//     };
//   },
//   computed: {
//     updateTemp() {
//       return this.$store.getters.realtimeForecast.temp.value.toFixed();
//     },
//     updateFeelsLike: function () {
//       return this.$store.getters.realtimeForecast.feels_like.value.toFixed();
//     },
//     isNight() {
//       // Display night version of icon before sunrise and after sunset
//       const sunrise = format(new Date(this.$store.getters.realtimeForecast.sunrise.value), 'H');
//       const sunset = format(new Date(this.$store.getters.realtimeForecast.sunset.value), 'H');
//       return Number(format(new Date(), 'H')) <= sunrise || Number(format(new Date(), 'H')) >= sunset ? 'nt_' : '';
//     },
//     updateNarrative() {
//       let str = this.$store.getters.realtimeForecast.weather_code.value.replace(/_/g, ' ');
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
//       return this.$store.getters.realtimeForecast.wind_speed.value.toFixed();
//     },
//     updateHumidity() {
//       return this.$store.getters.realtimeForecast.humidity.value.toFixed();
//     },
//     updateVisibility() {
//       return this.$store.getters.realtimeForecast.visibility.value.toFixed();
//     },
//   },
//   methods: {

//     // updateNarrative() {
//     //   let str = this.$store.getters.realtimeForecast.weather_code.value.replace('_', ' ');
//     //   this.narrative = str.charAt(0).toUpperCase() + str.slice(1);
//     // },
//   },
//   async created() {
//     // this.updateTemp();
//     // this.updateFeelsLike();
//     // this.updateNarrative(˝);
//   },
//   mounted() {
//     this.isLoaded = true;
//   },
// };
// </script>

// <style></style> */
// }

export default RightNow;
