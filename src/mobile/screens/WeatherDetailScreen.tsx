import moment from 'moment';
import React, {useCallback, useEffect} from 'react';
import {
  SafeAreaView,
  StatusBar,
  ScrollView,
  ActivityIndicator,
  Text,
  StyleSheet,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {DailyForecast} from '../../common/types/forecast';
import WeatherCard from '../components/WeatherCard';
import {formatTemperature} from '../helpers/format-temperature';
import {fetchLocation} from '../helpers/geo-location';
import {
  LocationStateType,
  currentLocationSet,
  listLocationSelected,
} from '../store/location/slices';
import {
  WeatherStateType,
  fetchWeatherAction,
  fetchForecastAction,
} from '../store/weather/slices';
import Button from '../components/Button';

import ServiceUnavailable from '../components/ServiceUnavailable';

const WeatherDetailScreen: React.FC = () => {
  const dispatch = useDispatch();
  const locationState = useSelector(
    (state: {locations: LocationStateType}) => state.locations,
  );
  const weatherState = useSelector(
    (state: {weather: WeatherStateType}) => state.weather,
  );

  const {currentLocation, selectedLocation, locationError} = locationState;

  const {currentWeather, forecast, weatherLoading, weatherError} = weatherState;

  const fetchCurrentLocation = useCallback(
    async () =>
      fetchLocation({
        onLocationObtained: value => dispatch(currentLocationSet(value)),
      }),
    [dispatch],
  );

  const handleCurrentLocationButtonPress = useCallback(() => {
    dispatch(listLocationSelected(undefined));
    fetchCurrentLocation();
  }, [dispatch, fetchCurrentLocation]);

  useEffect(() => {
    if (!selectedLocation) {
      fetchCurrentLocation();
    }
  }, [fetchCurrentLocation, selectedLocation]);

  useEffect(() => {
    const location = selectedLocation || currentLocation;
    if (location) {
      dispatch(fetchWeatherAction(location));
      dispatch(fetchForecastAction(location));
    }
  }, [currentLocation, dispatch, fetchCurrentLocation, selectedLocation]);

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <StatusBar />
        <ScrollView contentInsetAdjustmentBehavior="automatic" />
      </SafeAreaView>

      {!selectedLocation && currentLocation && (
        <Text style={styles.header}>Current Location</Text>
      )}
      {selectedLocation && (
        <View>
          <Text style={styles.header}>{selectedLocation.city}</Text>
        </View>
      )}

      {!weatherLoading && !currentWeather && (
        <ServiceUnavailable
          title={
            'Sorry, service is currently not available, please try again later'
          }
          onRetryButtonPress={fetchCurrentLocation}
        />
      )}

      {weatherLoading && <ActivityIndicator size="large" color="#144d91" />}
      {!weatherLoading && !weatherError && !!currentWeather && (
        <>
          <WeatherCard
            title={currentWeather.main}
            firstSubtitle={`Temperature: ${formatTemperature(
              currentWeather.temp,
            )}`}
            secondSubtitle={`Feels like: ${formatTemperature(
              currentWeather.feels_like,
            )}`}
            isMainCard
          />
          {forecast &&
            forecast.map((f: DailyForecast, index) => (
              <WeatherCard
                key={index}
                title={moment(f.dt * 1000).format('dddd D')}
                firstSubtitle={`Max: ${formatTemperature(f.temp.max)}`}
                secondSubtitle={`Min: ${formatTemperature(f.temp.min)}`}
              />
            ))}
          {selectedLocation && (
            <Button
              iconName={'location-pin'}
              label={'Current location'}
              onPress={handleCurrentLocationButtonPress}
            />
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
  },
  header: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 20,
  },
});

export default WeatherDetailScreen;
