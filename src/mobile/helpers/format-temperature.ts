export const formatTemperature = (temp: number): string =>
  `${String(temp).replace('.', ',')}°C`;
