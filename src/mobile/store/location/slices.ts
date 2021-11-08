import {
  createAction,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import {AxiosError} from 'axios';

import {getLocations} from '../../../api/api';

import {Location} from '../../../common/types/location';

export type LocationStateType = {
  currentLocation?: Location;
  locations: Location[];
  locationLoading: boolean;
  locationError: any;
};

//actions

export const fetchLocationsAction = createAsyncThunk(
  'locations/fetch',
  async (city: string, {rejectWithValue}) => {
    try {
      return getLocations(city);
    } catch (error) {
      if (!(error as AxiosError)?.response) {
        throw error;
      }
      return rejectWithValue((error as AxiosError)?.response?.data);
    }
  },
);

export const addLocationAction = createAction('location/add');

//slice

const slice = createSlice({
  name: 'store',
  initialState: {
    currentLocation: undefined,
    locations: [],
    locationLoading: false,
    locationError: undefined,
    currentWeather: undefined,
    forecast: [],
    weatherLoading: false,
    weatherError: undefined,
  },
  reducers: {
    currentLocationSet(state, action) {
      state.currentLocation = action.payload;
    },
  },
  extraReducers: (builder: any) => {
    //pending
    builder.addCase(
      fetchLocationsAction.pending,
      (state: LocationStateType, _action: PayloadAction<Location>) => {
        state.locationLoading = true;
      },
    );
    //fulfilled
    builder.addCase(
      fetchLocationsAction.fulfilled,
      (state: LocationStateType, action: PayloadAction<Location>) => {
        state.currentLocation = action?.payload;
        state.locationLoading = false;
        state.locationError = undefined;
      },
    );
    //rejected
    builder.addCase(
      fetchLocationsAction.rejected,
      (state: LocationStateType, action: PayloadAction<Location>) => {
        state.locationLoading = false;
        state.currentLocation = undefined;
        state.locationError = action?.payload;
      },
    );

    builder.addCase(
      addLocationAction.type,
      (state: LocationStateType, action: PayloadAction<Location>) => {
        state.locationLoading = true;
        state.locations?.push(action.payload);
        state.locationLoading = false;
        state.locationError = undefined;
      },
    );
  },
});

export const {currentLocationSet} = slice.actions;

export default slice.reducer;
