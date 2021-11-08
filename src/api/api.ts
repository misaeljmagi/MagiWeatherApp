import Axios from 'axios';

Axios.defaults.baseURL = 'http://localhost:3000/';

export const getWeatherForLocation = async (lat: number, lon: number) => {
  const {data} = await Axios.get('/weather/v1/current', {params: {lat, lon}});
  return data;
};

export const getForecastForLocation = async (lat: number, lon: number) => {
  const {data} = await Axios.get('/weather/v1/forecast', {params: {lat, lon}});
  return data;
};

export const getLocations = async (city: string) => {
  const {data} = await Axios.get('/weather/v1/location', {
    params: {city},
  });

  return data;
};
