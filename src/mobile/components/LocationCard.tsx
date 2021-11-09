import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Icon} from 'react-native-elements';

import Dimensions from '../helpers/screen-dimensions';

type LocationCardProps = {
  title: string;
  subtitle: string;
  onDeleteLocationPress?: (index: number) => void;
};

const LocationCard: React.FC<LocationCardProps> = ({
  title,
  subtitle,
  onDeleteLocationPress: onDeleteCardPress,
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
      <Icon
        name={'delete'}
        color={'red'}
        style={styles.deleteIcon}
        onPress={onDeleteCardPress}
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
