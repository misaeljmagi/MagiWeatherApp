import React from 'react';
import {
  ImageStyle,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import {Image} from 'react-native-elements';
import {logoUrl} from '../helpers/logo-url';

import Dimensions from '../helpers/screen-dimensions';

type WeatherCardProps = {
  header?: string;
  title: string;
  firstSubtitle: string;
  secondSubtitle: string;
  isMainCard?: boolean;
};

const WeatherCard: React.FC<WeatherCardProps> = ({
  header,
  title,
  firstSubtitle,
  secondSubtitle,
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
      {header && <View style={styles.header}>{header}</View>}
      <View>
        {isMainCard && (
          <Image source={{uri: logoUrl(title)}} style={styles.logo} />
        )}
        <Text style={styles.title}>{title}</Text>
      </View>
      <View>
        <Text style={styles.subtitle}>{firstSubtitle}</Text>
      </View>
      <View>
        <Text style={styles.summary}>{secondSubtitle}</Text>
      </View>
    </View>
  );
};

type StyleType = {
  container: ViewStyle;
  logo: ImageStyle;
  header: TextStyle;
  title: TextStyle;
  subtitle: TextStyle;
  summary: TextStyle;
};

const styles = StyleSheet.create<StyleType>({
  container: {
    backgroundColor: '#689ff7',
    borderRadius: 4,
    margin: 10,
    padding: 5,
    alignSelf: 'flex-start',
  },
  logo: {
    width: 50,
    height: 50,
  },
  header: {fontWeight: 'bold', fontSize: 15},
  title: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  subtitle: {
    fontSize: 12,
  },
  summary: {
    fontSize: 12,
  },
});

export default WeatherCard;
