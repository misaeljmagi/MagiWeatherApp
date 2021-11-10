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
import {Header} from 'react-native-elements';
import {useDispatch, useSelector} from 'react-redux';
import {DailyForecast} from '../../common/types/forecast';
import {Location} from '../../common/types/location';
import WeatherCard from '../components/WeatherCard';
import {formatTemperature} from '../helpers/format-temperature';
import {fetchLocation} from '../helpers/geo-location';
import {LocationStateType, currentLocationSet} from '../store/location/slices';
import {
  WeatherStateType,
  fetchWeatherAction,
  fetchForecastAction,
} from '../store/weather/slices';

type WeatherDetailScreenProps = {
  location: Location;
  navigation: any;
};

const WeatherDetailScreen: React.FC<WeatherDetailScreenProps> = ({
  location,
  navigation,
  params,
}) => {
  const dispatch = useDispatch();
  const locationState = useSelector(
    (state: {locations: LocationStateType}) => state.locations,
  );
  const weatherState = useSelector(
    (state: {weather: WeatherStateType}) => state.weather,
  );

  const {locationError, locationLoading, currentLocation} = locationState;

  const {currentWeather, forecast, weatherLoading, weatherError} = weatherState;

  const fetchCurrentLocation = useCallback(async () => {
    if (!location) {
      await fetchLocation({
        onLocationObtained: value => dispatch(currentLocationSet(value)),
      });
    }
  }, [dispatch, location]);

  useEffect(() => {
    if (!location) {
      fetchCurrentLocation();
    }
  }, [fetchCurrentLocation, location]);

  useEffect(() => {
    const selectedLocation = location || currentLocation;
    if (selectedLocation) {
      dispatch(fetchWeatherAction(selectedLocation));
      dispatch(fetchForecastAction(selectedLocation));
    }
  }, [currentLocation, dispatch, fetchCurrentLocation, location]);

  if (params) {
    console.warn(params);
  }

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <StatusBar />
        <ScrollView contentInsetAdjustmentBehavior="automatic" />
      </SafeAreaView>

      {!location && currentLocation && <Text>Current Location</Text>}
      {location && <Text>{location.city}</Text>}

      {weatherLoading && <ActivityIndicator size="large" color="#144d91" />}
      {!weatherLoading && !!currentWeather && (
        <>
          <WeatherCard
            title={currentWeather.main}
            firstSubtitle={formatTemperature(currentWeather.temp)}
            secondSubtitle={formatTemperature(currentWeather.feels_like)}
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
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
  },
});

export default WeatherDetailScreen;
