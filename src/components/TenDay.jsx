import format from "date-fns/format";
import WeatherIcon from "./WeatherIcon";

import updateData from "../lib/updateData";

const formatData = {
  getDayName(x) {
    return format(new Date(x), "E");
  },
  getDate(x) {
    let month = "";
    if (format(new Date(x), "d") == 1) {
      month = format(new Date(x), "MMM");
    }
    let date = month + format(new Date(x), " do");
    return date;
  },
  getPrecip(x) {
    if (
      x.precipitation[0].max.value > 0 &&
      x.precipitation[0].max.value < 0.005
    ) {
      return "<0.01 in";
    } else if (x.precipitation[0].max.value > 0) {
      return x.precipitation[0].max.value.toFixed(2) + " in";
    }
  },
};

const TenDay = ({ isLoaded, daily }) => {
  const days = daily.map((dayIndex) => {
    return (
      <div className="text-center">
        <h3 className="text-lg">{formatData.getDayName(dayIndex.date)}</h3>
        {/* <!-- Weather icons --> */}
        <WeatherIcon
          isLoaded={isLoaded}
          narrative={updateData.updateNarrative(dayIndex)}
          isNight={updateData.isNight(dayIndex)}
          className={"h-8 mx-auto"}
        />
        <p className="mb-2 text-xs font-light">
          {formatData.getDate(dayIndex.date)}
        </p>
        <div className="flex items-end pb-2 space-x-2">
          <p className="text-md">
            {dayIndex.temp[1].max.value.toFixed()}
            <span v-html="degreeSymbol"></span>
          </p>
          <p className="pb-px text-sm text-gray-700">
            {dayIndex.temp[0].min.value.toFixed()}
            <span v-html="degreeSymbol"></span>
          </p>
        </div>
        <p className="text-xs text-blue-500">
          {formatData.getPrecip(dayIndex)}
        </p>
      </div>
    );
  });

  return (
    <div className="mb-16">
      <h2 className="text-2xl font-medium">What's Ahead</h2>
      <div
        id="ten-day-scroller"
        className="mb-4 overflow-x-auto scrolling-touch"
      >
        <div className="flex space-x-10 mb-4">{days}</div>
        {/* <!-- Daily chart --> */}
        {/* <daily-chart :isDailyLoaded="isDailyLoaded"></daily-chart> */}
      </div>
    </div>
  );
};

export default TenDay;

// <!--
// <script>
// import DailyChart from './DailyChart.vue';
// import WeatherIcon from './WeatherIcon.vue';
// import format from 'date-fns/format';

// export default {
//   components: {
//     DailyChart,
//     WeatherIcon,
//   },
//   data() {
//     return {
//       daysObj: {},
//       daysData: [],
//       days: [
//         [
//           { dow: 'Friday', temp: '60' },
//           { dow: 'Saturday', temp: '64' },
//         ],
//       ],
//       degreeSymbol: '&#176',
//       isDailyLoaded: false,
//       isLoaded: false,
//     };
//   },
//   methods: {
//     getDayName(x) {
//       return format(new Date(x), 'E');
//     },
//     getDate(x) {
//       let month = '';
//       if (format(new Date(x), 'd') == 1) {
//         month = format(new Date(x), 'MMM');
//       }
//       let date = month + format(new Date(x), ' do');
//       return date;
//     },
//     getPrecip(x) {
//       if (x.precipitation[0].max.value > 0 && x.precipitation[0].max.value < 0.005) {
//         return '<0.01 in';
//       } else if (x.precipitation[0].max.value > 0) {
//         return x.precipitation[0].max.value.toFixed(2) + ' in';
//       }
//     },
//     updateNarrative(dayIndex) {
//       let str = dayIndex.weather_code.value.replace(/_/g, ' ');
//       if (str.includes('light') || str.includes('heavy')) {
//         str = str.split(' ');
//         let word = str[str.length - 1];
//         str.splice(-1, 1);
//         str.splice(0, 0, word);
//         str = str.join(' ');
//       }
//       return str.charAt(0).toUpperCase() + str.slice(1);
//     },
//     isNight(dayIndex) {
//       // Display night version of icon before sunrise and after sunset
//       const time = dayIndex.observation_time.value;
//       const sunrise = format(new Date(dayIndex.sunrise.value), 'H');
//       const sunset = format(new Date(dayIndex.sunset.value), 'H');
//       return Number(format(new Date(time), 'H')) <= sunrise || Number(format(new Date(time), 'H')) >= sunset
//         ? 'nt_'
//         : '';
//     },
//     // getPrecipProbability(x) {
//     //   if (x.precipitation_probability.value > 0) {
//     //     return x.precipitation_probability.value + '%';
//     //   }
//     // },
//     // getPrecipVolume(x) {
//     //   if (x.precipitation_probability.value > 0 && x.precipitation.value < 0.01) {
//     //     return '<0.01';
//     //   } else if (x.precipitation_probability.value > 0 && x.precipitation.value > 0) {
//     //     return x.precipitation.value.toFixed(2);
//     //   }
//     // },
//   },
//   created() {
//     // this.daysData = this.$store.getters.dailyForecast.forecasts;
//     // /**/ console.log(this.daysData);
//     // for (let index = 0; index < this.daysData.length; index++) {
//     //   this.daysData[index].myId = index;
//     // const object = Object.entries(dayObj);
//     // object.forEach((key) => {
//     //   console.log(key);
//     // });
//     // }
//     // this.daysData.forEach((index) => {
//     //   /**/ console.log(this.daysData);
//     //   const object = Object.entries(index);
//     //   object.forEach((key) => {
//     //     this.days[index] = key;
//     // });
//     //   // console.log(key);
//     // });
//   },
//   mounted() {
//     this.isDailyLoaded = true;
//     this.isLoaded = true;
//   },
// };
// </script>

// <style></style> -->
