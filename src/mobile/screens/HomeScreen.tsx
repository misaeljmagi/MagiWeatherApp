import {NavigationProp} from '@react-navigation/core';
import {NavigationAction, NavigationState} from '@react-navigation/routers';
import moment from 'moment';
import React, {useCallback, useEffect} from 'react';
import {
  SafeAreaView,
  StatusBar,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {DailyForecast} from '../../common/types/forecast';

import WeatherCard from '../components/WeatherCard';
import {fetchLocation} from '../helpers/geo-location';
import {LocationStateType, currentLocationSet} from '../store/location/slices';
import {
  WeatherStateType,
  fetchWeatherAction,
  fetchForecastAction,
} from '../store/weather/slices';

const HomeScreen: React.FC = () => {
  const dispatch = useDispatch();
  const locationState = useSelector(
    (state: {locations: LocationStateType}) => state.locations,
  );
  const weatherState = useSelector(
    (state: {weather: WeatherStateType}) => state.weather,
  );

  const {
    locationError,
    locationLoading,
    savedLocations,
    locations,
    currentLocation,
  } = locationState;

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

  return (
    <>
      <SafeAreaView>
        <StatusBar />
        <ScrollView contentInsetAdjustmentBehavior="automatic" />
      </SafeAreaView>

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

export default HomeScreen;
