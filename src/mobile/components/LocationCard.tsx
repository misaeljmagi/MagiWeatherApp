import React, {useCallback} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';

import {Location} from '../../common/types/location';

import Dimensions from '../helpers/screen-dimensions';
import CustomIcon from './CustomIcon';

const {height, width} = Dimensions;

type LocationCardProps = {
  location: Location;
  onDeleteLocationPress?: (index) => void;
  onLocationPress;
};

const LocationCard: React.FC<LocationCardProps> = ({
  location,
  onDeleteLocationPress,
  onLocationPress,
}) => {
  return (
    <View
      style={[
        styles.container,
        {height: height * 0.08},
        {width: width * 0.95},
      ]}>
      <Pressable onPress={onLocationPress}>
        <View>
          <Text style={styles.title}>{location.city}</Text>
        </View>
        <View>
          <Text style={styles.subtitle}>
            {location.state || location.country}
          </Text>
        </View>
      </Pressable>
      <CustomIcon
        name={'delete'}
        color={'red'}
        style={styles.deleteIcon}
        onPress={onDeleteLocationPress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#a6f5f5',
    borderRadius: 4,
    margin: 10,
    padding: 5,
    justifyContent: 'space-evenly',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  subtitle: {
    fontSize: 15,
    marginLeft: 3,
  },
  summary: {
    fontSize: 10,
  },
  deleteIcon: {
    alignSelf: 'flex-end',
  },
});

export default LocationCard;
