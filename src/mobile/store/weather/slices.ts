import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AxiosError} from 'axios';

import {
  getCurrentWeatherForLocation,
  getForecastForLocation,
} from '../../../api/api';
import {CurrentWeather} from '../../../common/types/current-weather';
import {DailyForecast} from '../../../common/types/forecast';

import {Location} from '../../../common/types/location';

export type WeatherStateType = {
  currentWeather?: CurrentWeather;
  forecast?: DailyForecast[];
  weatherLoading: boolean;
  weatherError: any;
};

//actions

export const fetchWeatherAction = createAsyncThunk(
  'weather/fetch',
  async ({lat, lon}: Location, {rejectWithValue}) => {
    try {
      return getCurrentWeatherForLocation(lat, lon);
    } catch (error) {
      if (!(error as AxiosError)?.response) {
        throw error;
      }
      return rejectWithValue((error as AxiosError)?.response?.data);
    }
  },
);

export const fetchForecastAction = createAsyncThunk(
  'forecast/fetch',
  async ({lat, lon}: Location, {rejectWithValue}) => {
    try {
      return getForecastForLocation(lat, lon);
    } catch (error) {
      if (!(error as AxiosError)?.response) {
        throw error;
      }
      return rejectWithValue((error as AxiosError)?.response?.data);
    }
  },
);

//slice

const slice = createSlice({
  name: 'weather',
  initialState: {
    currentWeather: undefined,
    forecast: [],
    weatherLoading: false,
    weatherError: undefined,
  },
  reducers: {},
  extraReducers: (builder: any) => {
    builder.addCase(
      fetchWeatherAction.pending,
      (state: WeatherStateType, _action: PayloadAction<CurrentWeather>) => {
        state.weatherLoading = true;
      },
    );

    builder.addCase(
      fetchWeatherAction.fulfilled,
      (state: WeatherStateType, action: PayloadAction<CurrentWeather>) => {
        state.currentWeather = action.payload;
        state.weatherLoading = false;
        state.weatherError = undefined;
      },
    );

    builder.addCase(
      fetchWeatherAction.rejected,
      (state: WeatherStateType, action: PayloadAction<CurrentWeather>) => {
        state.weatherLoading = false;
        state.currentWeather = undefined;
        state.weatherError = action?.payload;
      },
    );

    builder.addCase(
      fetchForecastAction.pending,
      (state: WeatherStateType, _action: PayloadAction<DailyForecast[]>) => {
        state.weatherLoading = true;
      },
    );

    builder.addCase(
      fetchForecastAction.fulfilled,
      (state: WeatherStateType, action: PayloadAction<DailyForecast[]>) => {
        state.forecast = action.payload;
        state.weatherLoading = false;
        state.weatherError = undefined;
      },
    );

    builder.addCase(
      fetchForecastAction.rejected,
      (state: WeatherStateType, action: PayloadAction<DailyForecast[]>) => {
        state.weatherLoading = false;
        state.forecast = undefined;
        state.weatherError = action?.payload;
      },
    );
  },
});

export default slice.reducer;
