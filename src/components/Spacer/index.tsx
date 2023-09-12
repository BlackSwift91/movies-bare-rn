import { View } from 'react-native';
import React from 'react';

const Spacer = ({ value = 8, horizontal = true }) => (
  <View style={[horizontal ? { marginRight: value } : { marginBottom: value }]} />
);

export default Spacer;
