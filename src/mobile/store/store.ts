import {configureStore} from '@reduxjs/toolkit';
import locationReducer from './location/slices';
import weatherReducer from './weather/slices';

const store = configureStore({
  reducer: {
    locations: locationReducer,
    weather: weatherReducer,
  },
});

export default store;
