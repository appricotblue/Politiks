import React from 'react';
import { Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const GradientText = ({ text, colors, style }) => {
  return (
    <LinearGradient colors={colors} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={style}>
      <Text>{text}</Text>
    </LinearGradient>
  );
};

export default GradientText;
