import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import Dimensions from '../helpers/screen-dimensions';
import CustomIcon from './CustomIcon';

type LocationCardProps = {
  title: string;
  subtitle: string;
  onDeleteLocationPress?: (index) => void;
};

const LocationCard: React.FC<LocationCardProps> = ({
  title,
  subtitle,
  onDeleteLocationPress,
}) => {
  const {height, width} = Dimensions;

  return (
    <View
      style={[
        styles.container,
        {height: height * 0.08},
        {width: width * 0.95},
      ]}>
      <View>
        <Text style={styles.title}>{title}</Text>
      </View>
      <View>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
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
