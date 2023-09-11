import {StyleSheet, Text, TextStyle, View, ViewStyle} from 'react-native';
import React, {FC} from 'react';
import {COLORS} from '../../assets/theme';

interface IProp {
  text: string;
  textStyle?: TextStyle | undefined;
  componentStyle?: ViewStyle | undefined;
}

const TextComponent: FC<IProp> = ({
  text,
  textStyle = undefined,
  componentStyle = undefined,
}) => {
  return (
    <View style={[styles.container, componentStyle]}>
      <Text style={[styles.text, textStyle]}>{text}</Text>
    </View>
  );
};

export default TextComponent;

const styles = StyleSheet.create({
  container: {},
  text: {
    color: COLORS.BLACK,
    fontSize: 14,
    lineHeight: 16,
  },
});
