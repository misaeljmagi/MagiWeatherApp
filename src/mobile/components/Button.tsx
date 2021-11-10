import React from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';
import CustomIcon from './CustomIcon';

type ButtonProps = {
  label: string;
  iconName: string;
  onPress: () => void;
};

const Button: React.FC<ButtonProps> = ({label, iconName, onPress}) => (
  <Pressable style={styles.button} onPress={onPress}>
    <CustomIcon name={iconName} color={'#ffb700'} />
    <Text style={styles.buttonText}>{label}</Text>
  </Pressable>
);

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    borderColor: '#ffb700',
    backgroundColor: '#ffe7ab',
    borderWidth: 2,
    borderRadius: 10,
    margin: 10,
    justifyContent: 'center',
    padding: 5,
  },
  buttonText: {
    marginTop: 3,
  },
});

export default Button;
