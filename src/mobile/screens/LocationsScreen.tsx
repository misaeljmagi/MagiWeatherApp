import React, {useCallback} from 'react';
import {StyleSheet} from 'react-native';
import {Icon} from 'react-native-elements';
import {SafeAreaView} from 'react-native-safe-area-context';

import {useDispatch, useSelector} from 'react-redux';
import {navigate} from '../../../RootNavigation';
import LocationCard from '../components/LocationCard';

import {locationRemove, LocationStateType} from '../store/location/slices';

const LocationsScreen: React.FC = () => {
  const dispatch = useDispatch();
  const locationState = useSelector(
    (state: {locations: LocationStateType}) => state.locations,
  );

  const {savedLocations} = locationState;

  const handleOnDeleteLocationPress = useCallback(
    index => dispatch(locationRemove(index)),
    [dispatch],
  );

  return (
    <SafeAreaView>
      {savedLocations.length > 0 &&
        savedLocations.map((location, index) => (
          <LocationCard
            key={index}
            title={location.city}
            subtitle={location.state || location.country}
            onDeleteLocationPress={() => handleOnDeleteLocationPress(index)}
          />
        ))}
      {savedLocations.length < 5 && (
        <Icon
          style={styles.icon}
          name={'add'}
          tvParallaxProperties
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
