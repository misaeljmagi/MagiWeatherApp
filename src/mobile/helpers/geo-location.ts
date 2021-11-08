import Geolocation from 'react-native-geolocation-service';
import {AuthorizationResult} from '../../common/types/location';

type fetchLocationType = {
  onLocationObtained: (location: {lat: number; lon: number}) => void;
  onError?: (error: any) => void;
};

export const fetchLocation = async ({
  onLocationObtained,
  onError = error => console.warn('error', error),
}: fetchLocationType) => {
  const result = await Geolocation.requestAuthorization('whenInUse');

  if (result === AuthorizationResult.GRANTED) {
    Geolocation.getCurrentPosition(
      location => {
        const {
          coords: {latitude: lat, longitude: lon},
        } = location;
        onLocationObtained({lat, lon});
      },
      onError,
      {
        timeout: 1000,
      },
    );
  }
};
