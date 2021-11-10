const logoMap = {
  'clear sky': '01d.png',
  'few clouds': '02d.png',
  clouds: '02d.png',
  'scattered clouds': '03d.png',
  'broken clouds': '04d.png',
  'shower rain': '09d.png',
  rain: '10d.png',
  thunderstorm: '11d.png',
  snow: '13d.png',
  mist: '50d.png',
};

export const logoUrl = (mainWeather: string) =>
  `https://openweathermap.org/img/wn/${logoMap[mainWeather.toLowerCase()]}`;
