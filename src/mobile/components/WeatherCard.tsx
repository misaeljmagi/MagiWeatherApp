import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import Dimensions from '../helpers/screen-dimensions';

type WeatherCardProps = {
  title: string;
  subtitle: string;
  summary: string;
  isMainCard?: boolean;
};

const WeatherCard: React.FC<WeatherCardProps> = ({
  title,
  subtitle,
  summary,
  isMainCard = false,
}) => {
  const {height, width} = Dimensions;

  return (
    <View
      style={[
        styles.container,
        {height: isMainCard ? height * 0.15 : height * 0.08},
        {width: width * 0.95},
      ]}>
      <View>
        <Text style={styles.title}>{title}</Text>
      </View>
      <View>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
      <View>
        <Text style={styles.summary}>{summary}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#689ff7',
    borderRadius: 4,
    margin: 10,
    padding: 5,
    alignSelf: 'flex-start',
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
});

export default WeatherCard;
