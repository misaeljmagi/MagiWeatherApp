import React, {useCallback, useEffect} from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StatusBar,
} from 'react-native';

import moment from 'moment';

import {fetchLocation} from './src/mobile/helpers/geo-location';
import {useDispatch, useSelector} from 'react-redux';
import {
  currentLocationSet,
  LocationStateType,
} from './src/mobile/store/location/slices';
import {
  fetchForecastAction,
  fetchWeatherAction,
  WeatherStateType,
} from './src/mobile/store/weather/slices';
import WeatherCard from './src/mobile/components/WeatherCard';
import {DailyForecast} from './src/common/types/forecast';

const App = () => {
  const dispatch = useDispatch();
  const locationState = useSelector(
    (state: {locations: LocationStateType}) => state.locations,
  );
  const weatherState = useSelector(
    (state: {weather: WeatherStateType}) => state.weather,
  );

  const {locationError, locationLoading, locations, currentLocation} =
    locationState;

  const {currentWeather, forecast, weatherLoading, weatherError} = weatherState;

  const fetchCurrentLocation = useCallback(async () => {
    await fetchLocation({
      onLocationObtained: value => dispatch(currentLocationSet(value)),
    });
  }, [dispatch]);

  useEffect(() => {
    fetchCurrentLocation();
  }, [fetchCurrentLocation]);

  useEffect(() => {
    if (currentLocation) {
      dispatch(fetchWeatherAction(currentLocation));
      dispatch(fetchForecastAction(currentLocation));
    }
  }, [currentLocation, dispatch, fetchCurrentLocation]);

  // const handleChangeText = useCallback(
  //   async (value: string) => {
  //     if (value?.length > 3) {
  //       dispatch(fetchLocationsAction(value));
  //     }
  //   },
  //   [dispatch],
  // );

  return (
    <>
      <SafeAreaView>
        <StatusBar />
        <ScrollView contentInsetAdjustmentBehavior="automatic" />
      </SafeAreaView>
      {/* <SearchBar
        data={locations}
        onChangeText={handleChangeText}
        onResultPress={index => setSelectedLocations(locations[index])}
      /> */}
      {weatherLoading && <ActivityIndicator size="large" color="#144d91" />}
      {!weatherLoading && !!currentWeather && (
        <>
          <WeatherCard
            title={currentWeather.main}
            subtitle={String(currentWeather.temp)}
            summary={'SUMMARY'}
            isMainCard
          />
          {forecast &&
            forecast.map((f: DailyForecast, index) => (
              <WeatherCard
                key={index}
                title={moment(f.dt * 1000).format('dddd D')}
                subtitle={`${String(f.temp.max).replace('.', ',')}°C`}
                summary={String(f.temp.min)}
              />
            ))}
        </>
      )}
    </>
  );
};

export default App;
