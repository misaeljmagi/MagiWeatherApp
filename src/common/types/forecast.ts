export class DailyForecast {
  'dt': number;
  'sunrise': number;
  'sunset': number;
  'moonrise': number;
  'moonset': number;
  'moon_phase': number;
  'temp': DailyTemperature;
}

export class DailyTemperature {
  'day': number;
  'min': number;
  'max': number;
  'night': number;
  'eve': number;
  'morn': number;
}
