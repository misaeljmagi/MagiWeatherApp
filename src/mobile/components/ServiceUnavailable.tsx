import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Image} from 'react-native-elements';
import Button from './Button';

type ServiceUnavailableProps = {
  title: string;
  onRetryButtonPress: () => void;
};

const ServiceUnavailable: React.FC<ServiceUnavailableProps> = ({
  title,
  onRetryButtonPress,
}) => (
  <View style={styles.container}>
    <Image
      style={styles.logo}
      source={{
        uri: 'https://img.icons8.com/pastel-glyph/64/000000/unavailable-cloud--v2.png',
      }}
    />
    <Text style={styles.title}>{title}</Text>

    <Button iconName={'refresh'} onPress={onRetryButtonPress} label={'Retry'} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  logo: {
    width: 80,
    height: 80,
  },
  title: {
    margin: 20,
    fontSize: 20,
    textAlign: 'center',
  },
});
export default ServiceUnavailable;
