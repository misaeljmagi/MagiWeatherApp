import React, {useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StatusBar,
} from 'react-native';

import SearchBar from './src/mobile/components/SearchBar';
import {Location} from './src/common/types/location';
import Card from './src/mobile/components/Card';
import {getLocations, getWeatherForLocation} from './src/api/api';
import {CurrentWeather} from './src/common/types/current-weather';
import {fetchLocation} from './src/mobile/helpers/geo-location';

const App = () => {
  const [loading, setLoading] = useState(false);
  const [weather, setWeather] = useState<{current: CurrentWeather}>();
  const [locations, setLocations] = useState<Location[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<Location[]>([]);
  const [currentLocation, setCurrentLocation] =
    useState<{lat: number; lon: number}>();

  const fetchCurrentLocation = useCallback(async () => {
    await fetchLocation({
      onLocationObtained: setCurrentLocation,
    });
  }, []);

  const fetchWeatherForCurrentLocation = useCallback(async () => {
    if (currentLocation) {
      const result = await getWeatherForLocation(
        currentLocation?.lat,
        currentLocation?.lon,
      );

      setWeather(result);
    }
  }, [currentLocation]);

  useEffect(() => {
    fetchCurrentLocation();

    fetchWeatherForCurrentLocation();
  }, [fetchCurrentLocation, fetchWeatherForCurrentLocation, weather]);

  const handleChangeText = useCallback(async (value: string) => {
    if (value.length > 3) {
      setLoading(true);
      const results = await getLocations(value);

      setLoading(false);
      setLocations(results);
    }
  }, []);

  return (
    <>
      <SafeAreaView>
        <StatusBar />
        <ScrollView contentInsetAdjustmentBehavior="automatic" />
      </SafeAreaView>
      <SearchBar
        data={locations}
        onChangeText={handleChangeText}
        onResultPress={index => setSelectedLocations(locations[index])}
      />
      {loading && <ActivityIndicator size="large" color="#144d91" />}
      {!loading && !!weather && (
        <Card
          title={weather.current.main}
          subtitle={String(weather.current.temp)}
          summary={'SUMMARY'}
        />
      )}
    </>
  );
};

export default App;
