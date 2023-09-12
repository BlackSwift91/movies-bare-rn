import { StyleSheet, View } from 'react-native';
import React, { FC, useState } from 'react';

import Input from '../components/Input';
import Button from '../components/Button';
import Spacer from '../components/Spacer';
import TextComponent from '../components/TextComponent';

import { COLORS } from '../assets/theme';
import { userService } from '../services/api/UserService';
import { useAppDispatch } from '../store/hooks';
import { setUserToken } from '../store/userSlice';
import { ILogIn } from '../navigation/INavigation';
import { queryClient } from '../services/api/queryClient';

const LogIn: FC<ILogIn> = ({ navigation }) => {
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [errors, setErrors] = useState<Record<string, any>>({});

  const handleError = (error: string | null, type: string) => {
    setErrors(prevState => ({ ...prevState, [type]: error }));
  };

  const onLogInButtonPress = async () => {
    if (!validate()) {
      return;
    }
    const result = await queryClient.fetchQuery(['deleteMovie'], () => userService.userSignIn(email, password));
    if (result?.data?.token) {
      dispatch(setUserToken(result.data.token));
    }

    if (result?.data?.error?.fields.email && result?.data?.error?.code === 'FORMAT_ERROR') {
      handleError('Wrong email', 'email');
    }

    if (result?.data?.error?.fields?.email && result?.data?.error?.code === 'AUTHENTICATION_FAILED') {
      handleError('User not existed', 'email');
    }
  };

  const onSignInButtonPress = () => {
    navigation.navigate('SignUp');
  };

  function validate() {
    let isValid = true;

    if (email.length < 3) {
      handleError('Please enter email', 'email');
      isValid = false;
    }
    if (password.length < 3) {
      handleError('Please enter password', 'password');
      isValid = false;
    }
    return isValid;
  }

  return (
    <View style={styles.container}>
      <TextComponent
        text="Hi, Welcome back!"
        componentStyle={{ marginTop: 36, marginBottom: 8 }}
        textStyle={{ fontSize: 27, lineHeight: 28, fontWeight: 'bold' }}
      />
      <TextComponent
        text="Enter your credentials to get access to your account"
        componentStyle={{ marginBottom: 16 }}
        textStyle={{ fontSize: 14, lineHeight: 16 }}
      />
      <Input
        text={email}
        setText={setEmail}
        placeholder="Enter your email"
        error={errors.email}
        onFocus={() => handleError(null, 'email')}
      />
      <Input
        isPassword
        text={password}
        placeholder="Enter your password"
        setText={setPassword}
        error={errors.password}
        onFocus={() => handleError(null, 'password')}
        componentStyle={styles.passwordContainer}
      />
      <Button text={'LogIn'} onButtonPress={onLogInButtonPress} isFilled />

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <TextComponent text="Don't have an account?" textStyle={{ fontSize: 14, lineHeight: 16 }} />
        <Spacer horizontal />
        <Button text={'SignUp'} onButtonPress={onSignInButtonPress} isBlueTextColor />
      </View>
    </View>
  );
};

export default LogIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: COLORS.WHITE,
  },
  passwordContainer: {
    marginBottom: 24,
  },
});
