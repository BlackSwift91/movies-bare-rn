import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  ViewStyle,
  Text,
  NativeSyntheticEvent,
  TextInputEndEditingEventData,
} from 'react-native';
import React, { Dispatch, FC, SetStateAction, useState } from 'react';
import { COLORS } from '../../assets/theme';
import EyeIcon from '../../assets/svg/EyeIcon';
import EyeOffIcon from '../../assets/svg/EyeOffIcon';

interface IProps {
  text: string;
  setText: Dispatch<SetStateAction<string>>;
  isPassword?: boolean;
  maxLength?: number;
  placeholder?: string;
  isDecimal?: boolean;
  error?: string | null;
  onFocus?: () => void;
  onEndEditing?: (e: NativeSyntheticEvent<TextInputEndEditingEventData>) => void;
  componentStyle?: ViewStyle | undefined;
}

const Input: FC<IProps> = ({
  text,
  setText,
  error,
  isDecimal = false,
  maxLength = 40,
  placeholder = '',
  isPassword = false,
  componentStyle = undefined,
  onFocus = () => {},
  onEndEditing = () => {},
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const changePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const onEndEdit = (e: NativeSyntheticEvent<TextInputEndEditingEventData>) => {
    setText(e.nativeEvent.text.trim());
    onEndEditing(e);
  };

  return (
    <View style={[styles.wrapper, componentStyle]}>
      <View style={[styles.container, error ? styles.errorStyle : undefined]}>
        <TextInput
          style={styles.text}
          placeholderTextColor={COLORS.LIGHT_GRAY}
          placeholder={placeholder}
          value={text}
          keyboardType={isDecimal ? 'numeric' : 'default'}
          maxLength={maxLength}
          onChangeText={setText}
          secureTextEntry={isPassword && !isPasswordVisible}
          onFocus={() => {
            onFocus();
            setIsFocused(true);
          }}
          onEndEditing={onEndEdit}
        />
        {isPassword ? (
          <TouchableOpacity
            style={{
              width: 36,
              height: 36,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={changePasswordVisibility}>
            {isPasswordVisible ? <EyeOffIcon /> : <EyeIcon />}
          </TouchableOpacity>
        ) : null}
      </View>
      {error ? (
        <View>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : (
        <View>
          <Text style={styles.errorEmptyText}> </Text>
        </View>
      )}
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 8,
  },
  container: {
    borderWidth: 1,
    borderColor: COLORS.GREEN,
    borderRadius: 6,
    height: 50,
    alignItems: 'center',
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: COLORS.LIGHT_GREEN,
  },
  text: {
    color: COLORS.BLACK,
    fontSize: 16,
    lineHeight: 18,
    justifyContent: 'center',
    flex: 1,
  },
  errorStyle: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: 10,
    lineHeight: 12,
    top: 2,
  },
  errorEmptyText: {
    color: 'transparent',
    fontSize: 10,
    lineHeight: 12,
    top: 2,
  },
});
