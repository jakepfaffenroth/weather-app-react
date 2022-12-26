import format from "date-fns/format";
import WeatherIcon from "./WeatherIcon.jsx";

import updateData from "../lib/updateData";

const formatData = {
  getHour(x) {
    return format(new Date(x), "ha").toLowerCase();
  },
  getDate(x) {
    if (format(new Date(x), "H").toLowerCase() == 0) {
      return format(new Date(x), "E");
    }
  },
  getPrecipProbability(x) {
    if (x.precipitation_probability.value > 0) {
      return x.precipitation_probability.value + "%";
    }
  },
  getPrecipVolume(x) {
    if (x.precipitation_probability.value > 0 && x.precipitation.value < 0.01) {
      return "<0.01";
    } else if (
      x.precipitation_probability.value > 0 &&
      x.precipitation.value > 0
    ) {
      return x.precipitation.value.toFixed(2);
    }
  },
};

const Hourly = ({ hourly, isLoaded }) => {
  const hours = hourly.map((hourIndex) => {
    return (
      <div className="text-center" key={hourIndex.myId}>
        <p className="text-xs font-light h-4 overflow-x-auto">
          {formatData.getDate(hourIndex.observation_time.value)}
        </p>
        <h3 className="text-md font-medium">
          {formatData.getHour(hourIndex.observation_time.value)}
        </h3>
        {/* <!-- Weather icons --> */}
        <WeatherIcon
          isLoaded={isLoaded}
          narrative={updateData.updateNarrative(hourIndex)}
          isNight={updateData.isNight(hourIndex)}
          className={"h-8 mx-auto"}
        />
        {/* <!-- Hourly temp --> */}
        <p className="text-sm">
          {hourIndex.temp.value.toFixed()}
          <span v-html="degreeSymbol"></span>
        </p>
        {/* <!-- Precip info --> */}
        <p className="text-xs text-blue-500">
          {formatData.getPrecipProbability(hourIndex)}
        </p>
        <p className="text-xs text-blue-500">
          {formatData.getPrecipVolume(hourIndex)}
        </p>
      </div>
    );
  });

  return (
    <div className="sm:mt-6 mt-4">
      {/* <!-- <h3 className="ml-2 text-lg  font-medium">Hourly</h3> --> */}
      <div
        id="hourly-scroller"
        className="mb-4 overflow-x-auto scrolling-touch"
      >
        <div className="flex space-x-10 mb-4">
          {hours}
        </div>
        {/* <!-- Hourly chart --> */}
        {/* <hourly-chart :isHourlyLoaded="isHourlyLoaded"></hourly-chart> */}
      </div>
    </div>
  );
};

export default Hourly;

// <script>
// import HourlyChart from './HourlyChart.vue';
// import WeatherIcon from './WeatherIcon.vue';
// import format from 'date-fns/format';
// export default {
//   components: {
//     HourlyChart,
//     WeatherIcon,
//   },
//   props: {
//     forecastObj: Array,
//   },
//   data() {
//     return {
//       degreeSymbol: '&#176',
//       isHourlyLoaded: false,
//       isLoaded: false,
//     };
//   },
//   computed: {
//     updateTemp: function () {
//       return this.$store.getters.hourlyForecast.temp.toFixed();
//     },
//   },
//   methods: {
//     getHour(x) {
//       return format(new Date(x), 'ha').toLowerCase();
//     },
//     getDate(x) {
//       if (format(new Date(x), 'H').toLowerCase() == 0) {
//         return format(new Date(x), 'E');
//       }
//     },
//     getPrecipProbability(x) {
//       if (x.precipitation_probability.value > 0) {
//         return x.precipitation_probability.value + '%';
//       }
//     },
//     getPrecipVolume(x) {
//       if (x.precipitation_probability.value > 0 && x.precipitation.value < 0.01) {
//         return '<0.01';
//       } else if (x.precipitation_probability.value > 0 && x.precipitation.value > 0) {
//         return x.precipitation.value.toFixed(2);
//       }
//     },
//     updateNarrative(hourIndex) {
//       let str = hourIndex.weather_code.value.replace(/_/g, ' ');
//       if (str.includes('light') || str.includes('heavy')) {
//         str = str.split(' ');
//         let word = str[str.length-1];
//         str.splice(-1, 1)
//         str.splice(0, 0, word);
//         str = str.join(' ');
//       }

//       return str.charAt(0).toUpperCase() + str.slice(1);
//     },
//     isNight(hourIndex) {
//       // Display night version of icon before sunrise and after sunset
//       const time = hourIndex.observation_time.value;
//       const sunrise = format(new Date(hourIndex.sunrise.value), 'H')
//       const sunset = format(new Date(hourIndex.sunset.value), 'H')
//       return Number(format(new Date(time), 'H')) <= sunrise || Number(format(new Date(time), 'H')) >= sunset ? 'nt_' : '';
//     },
//   },
//   mounted() {
//     this.isHourlyLoaded = true;
//     this.isLoaded = true;
//   },
// };
// </script>

// <style></style>
