import React from 'react';
import { StyleSheet, Text } from 'react-native';

const DefaultText: React.FC = ({ children }) => {
  return <Text style={styles.text}>{children}</Text>;
};

const styles = StyleSheet.create({
  text: {
    fontFamily: 'open-sans',
  },
});

export default DefaultText;
