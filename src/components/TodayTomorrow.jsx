import Today from "./Today";
import Tomorrow from "./Tomorrow";
import Hourly from "./Hourly";

const TodayTomorrow = ({ isDailyLoaded, isLoaded, forecasts }) => {
  return isDailyLoaded ? (
    <div className="mb-6">
      {/* <!-- Display Forecast --> */}
      <div className="sm:grid sm:grid-cols-2 sm:gap-16 space-y">
        <Today
          isDailyLoaded={isDailyLoaded}
          isLoaded={isLoaded}
          forecasts={forecasts}
          today={forecasts.daily[0]}
        />
        <Tomorrow
          isDailyLoaded={isDailyLoaded}
          isLoaded={isLoaded}
          forecasts={forecasts}
          tomorrow={forecasts.daily[1]}
        />
      </div>

      <Hourly
        isDailyLoaded={isDailyLoaded}
        isLoaded={isLoaded}
        forecasts={forecasts}
        tomorrow={forecasts.daily[1]}
        hourly={forecasts.hourly}
      />
    </div>
  ) : (
    ""
  );
};

export default TodayTomorrow;

// <script>
// import Hourly from './Hourly.vue';
// import Today from './Today.vue';
// import Tomorrow from './Tomorrow.vue';

// export default {
//   props: {
//     todayData: Object,
//   },
//   data() {
//     return {};
//   },
//   components: {
//     Hourly,
//     Today,
//     Tomorrow,
//   },
// };
// </script>
