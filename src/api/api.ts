import Axios from 'axios';

import {API_BASE_URL} from '@env';

Axios.defaults.baseURL = API_BASE_URL;

export const getCurrentWeatherForLocation = async (
  lat: number,
  lon: number,
) => {
  const {
    data: {current},
  } = await Axios.get('/weather/v1/current', {params: {lat, lon}});
  return current;
};

export const getForecastForLocation = async (lat: number, lon: number) => {
  const {data} = await Axios.get('/weather/v1/forecast', {params: {lat, lon}});

  return data.slice(1, 6);
};

export const getLocations = async (city: string) => {
  const {data} = await Axios.get('/locations/v1', {
    params: {city},
  });

  return data;
};
