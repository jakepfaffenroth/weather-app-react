import { configureStore } from "@reduxjs/toolkit";

export default configureStore({
  reducer: {
    city: {},
    usState: {},
    latLong: {},
  },
});
