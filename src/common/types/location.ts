export interface Location {
  country: string;
  state: string;
  city: string;
  lat: number;
  lon: number;
}

export enum AuthorizationResult {
  DISABLED = 'disabled',
  GRANTED = 'granted',
  DENIED = 'denied',
  RESTRICTED = 'restricted',
}
