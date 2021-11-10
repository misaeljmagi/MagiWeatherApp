import React, {useCallback} from 'react';

import {SafeAreaView} from 'react-native-safe-area-context';

import {useDispatch, useSelector} from 'react-redux';
import Button from '../components/Button';
import LocationCard from '../components/LocationCard';

import {
  listLocationSelected,
  locationRemoved,
  LocationStateType,
} from '../store/location/slices';

const LocationsScreen: React.FC<{navigation}> = ({navigation}) => {
  const dispatch = useDispatch();
  const locationState = useSelector(
    (state: {locations: LocationStateType}) => state.locations,
  );

  const {savedLocations} = locationState;

  const handleOnDeleteLocationPress = useCallback(
    index => dispatch(locationRemoved(index)),
    [dispatch],
  );

  const handleLocationPress = useCallback(
    location => {
      dispatch(listLocationSelected(location));
      navigation.navigate('Weather Detail');
    },
    [dispatch, navigation],
  );

  return (
    <SafeAreaView>
      {savedLocations.length > 0 &&
        savedLocations.map((location, index) => (
          <LocationCard
            key={index}
            location={location}
            onDeleteLocationPress={() => handleOnDeleteLocationPress(index)}
            onLocationPress={() => {
              handleLocationPress(location);
            }}
          />
        ))}
      {savedLocations.length < 5 && (
        <Button
          iconName={'add'}
          label={'Add location'}
          onPress={() => navigation.push('AddLocation')}
        />
      )}
    </SafeAreaView>
  );
};

export default LocationsScreen;
