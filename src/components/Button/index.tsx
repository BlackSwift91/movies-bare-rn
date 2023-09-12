import { StyleSheet, Text, TextStyle, TouchableOpacity, ViewStyle } from 'react-native';
import React, { FC } from 'react';
import { COLORS } from '../../assets/theme';

interface IProp {
  text: string;
  onButtonPress: () => void;
  isGreenTextColor?: boolean;
  isBlueTextColor?: boolean;
  containerStyle?: ViewStyle;
  textStyle?: TextStyle;
  isDisabled?: boolean;
  isFilled?: boolean;
}

const CustomButton: FC<IProp> = ({
  onButtonPress,
  text = '',
  containerStyle,
  textStyle = null,
  isBlueTextColor = false,
  isDisabled = false,
  isFilled = false,
}) => {
  return (
    <TouchableOpacity
      style={[isFilled ? styles.filled : styles.outline, containerStyle, isDisabled ? styles.disabled : null]}
      onPress={onButtonPress}
      disabled={isDisabled}>
      <Text
        style={[
          styles.text,
          textStyle,
          isBlueTextColor ? styles.blueText : null,
          isDisabled ? styles.disabled : null,
          isFilled ? styles.filledText : null,
        ]}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    lineHeight: 18,
    fontWeight: '600',
    color: COLORS.BLACK,
  },
  blueText: {
    color: COLORS.BLUE,
  },
  redText: {
    color: 'rgba(235, 87, 87, 1)',
  },
  disabled: {
    opacity: 0.4,
  },
  filled: {
    width: '100%',
    height: 48,
    borderRadius: 6,
    backgroundColor: COLORS.GREEN,
    justifyContent: 'center',
    alignItems: 'center',
  },
  outline: {
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filledText: {
    color: 'rgba(255, 255, 255, 1)',
  },
});
