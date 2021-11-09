import React from 'react';
import {StyleSheet, View} from 'react-native';

import {useDispatch, useSelector} from 'react-redux';
import SearchBar from '../components/SearchBar';

import {
  fetchLocationsAction,
  locationSelect,
  LocationStateType,
} from '../store/location/slices';

const AddLocationScreen: React.FC = ({navigation}) => {
  const dispatch = useDispatch();

  const locationState = useSelector(
    (state: {locations: LocationStateType}) => state.locations,
  );

  const {locations} = locationState;

  const handleOnResultPress = (index: number) =>
    dispatch(locationSelect(index));

  const handleOnChangeText = (value: string) => {
    if (value.length > 3) {
      return dispatch(fetchLocationsAction(value));
    }
  };

  return (
    <View style={styles.container}>
      <SearchBar
        data={locations}
        onResultPress={result => {
          handleOnResultPress(result);
          navigation.pop();
        }}
        onChangeText={handleOnChangeText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {position: 'relative'},
  icon: {
    position: 'absolute',
  },
});

export default AddLocationScreen;
