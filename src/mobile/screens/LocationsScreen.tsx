import React, {useCallback} from 'react';
import {StyleSheet} from 'react-native';

import {SafeAreaView} from 'react-native-safe-area-context';

import {useDispatch, useSelector} from 'react-redux';
import {navigate} from '../../../RootNavigation';
import CustomIcon from '../components/CustomIcon';
import LocationCard from '../components/LocationCard';

import {locationRemoved, LocationStateType} from '../store/location/slices';

const LocationsScreen: React.FC = ({navigation}) => {
  const dispatch = useDispatch();
  const locationState = useSelector(
    (state: {locations: LocationStateType}) => state.locations,
  );

  const {savedLocations} = locationState;

  // console.warn(navigation);

  const handleOnDeleteLocationPress = useCallback(
    index => dispatch(locationRemoved(index)),
    [dispatch],
  );

  const handleLocationPress = useCallback(
    location => navigation.push('Weather Detail', {location}),
    [navigation],
  );

  return (
    <SafeAreaView>
      {savedLocations.length > 0 &&
        savedLocations.map((location, index) => (
          <LocationCard
            key={index}
            location={location}
            onDeleteLocationPress={() => handleOnDeleteLocationPress(index)}
            onLocationPress={() => handleLocationPress(location)}
          />
        ))}
      {savedLocations.length < 5 && (
        <CustomIcon
          style={styles.icon}
          name={'add'}
          onPress={() => navigate('AddLocation')}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  icon: {
    margin: 20,
    borderWidth: 1,
    borderRadius: 10,
  },
});

export default LocationsScreen;
