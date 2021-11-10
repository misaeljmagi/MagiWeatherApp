import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AxiosError} from 'axios';

import {getLocations} from '../../../api/api';

import {Location} from '../../../common/types/location';

export type LocationStateType = {
  currentLocation?: Location;
  selectedLocation?: Location;
  savedLocations: Location[];
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

//slice

const slice = createSlice<LocationStateType, any>({
  name: 'location',
  initialState: {
    currentLocation: undefined,
    selectedLocation: undefined,
    savedLocations: [],
    locations: [],
    locationLoading: false,
    locationError: undefined,
  },
  reducers: {
    currentLocationSet: (state: LocationStateType, action: any) => {
      state.currentLocation = action.payload;
    },
    locationSelected: (state: LocationStateType, action: any) => {
      state.savedLocations.push(state.locations[action.payload]);
    },
    locationRemove: (state: LocationStateType, action: any) => {
      state.savedLocations.splice(action.payload, 1);
    },
    listLocationSelected: (state: LocationStateType, action: any) => {
      state.selectedLocation = action.payload;
    },
  },
  extraReducers: (builder: any) => {
    builder.addCase(
      fetchLocationsAction.pending,
      (state: LocationStateType, _action: PayloadAction<Location>) => {
        state.locationLoading = true;
      },
    );

    builder.addCase(
      fetchLocationsAction.fulfilled,
      (state: LocationStateType, action: PayloadAction<Location[]>) => {
        state.locations = action?.payload;
        state.locationLoading = false;
        state.locationError = undefined;
      },
    );

    builder.addCase(
      fetchLocationsAction.rejected,
      (state: LocationStateType, action: PayloadAction<Location>) => {
        state.locationLoading = false;
        state.currentLocation = undefined;
        state.locationError = action?.payload;
      },
    );
  },
});

export const {
  currentLocationSet,
  locationSelected,
  locationRemoved,
  listLocationSelected,
} = slice.actions;

export default slice.reducer;
