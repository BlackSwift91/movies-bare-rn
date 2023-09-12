import { StyleSheet, View } from 'react-native';
import React, { FC, useState } from 'react';

import { COLORS } from '../assets/theme';
import TextComponent from '../components/TextComponent';
import Input from '../components/Input';
import Button from '../components/Button';
import Spacer from '../components/Spacer';
import { useAppDispatch } from '../store/hooks';
import { setUserToken } from '../store/userSlice';
import { ISignUp } from '../navigation/INavigation';
import { userService } from '../services/api/UserService';
import { queryClient } from '../services/api/queryClient';

const SignUp: FC<ISignUp> = ({ navigation }) => {
  const dispatch = useAppDispatch();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [errors, setErrors] = useState<Record<string, any>>({});

  const handleError = (error: string | null, type: string) => {
    setErrors(prevState => ({ ...prevState, [type]: error }));
  };

  const onSignUpButtonPress = async () => {
    if (!validate()) {
      return;
    }
    const result = await queryClient.fetchQuery(['deleteMovie'], () =>
      userService.userSignUp(email, name, password, confirmPassword),
    );
    if (result?.data?.token) {
      dispatch(setUserToken(result.data.token));
    }

    if (result?.data?.error?.code === 'EMAIL_NOT_UNIQUE') {
      handleError('User already exist', 'email');
    }
  };

  function validate() {
    let isValid = true;

    if (email.length < 3) {
      handleError('Please enter email', 'email');
      isValid = false;
    }
    if (name.length < 3) {
      handleError('Please enter name', 'name');
      isValid = false;
    }
    if (password.length < 3) {
      handleError('Please enter password', 'password');
      isValid = false;
    }
    if (confirmPassword.length < 3) {
      handleError('Please confirm password', 'confirmPassword');
      isValid = false;
    }

    if (password !== confirmPassword) {
      handleError('Passwords must be equal', 'password');
      handleError('Passwords must be equal', 'confirmPassword');

      isValid = false;
    }

    return isValid;
  }

  const onLogInButtonPress = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TextComponent
        text="Hi, Welcome!"
        componentStyle={{ marginTop: 36, marginBottom: 8 }}
        textStyle={{ fontSize: 27, lineHeight: 28, fontWeight: 'bold' }}
      />
      <TextComponent
        text="Start your journey to the world of movies"
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
        text={name}
        setText={setName}
        placeholder="Enter your name"
        error={errors.name}
        onFocus={() => handleError(null, 'name')}
      />
      <Input
        isPassword
        text={password}
        placeholder="Enter your password"
        setText={setPassword}
        error={errors.password}
        onFocus={() => handleError(null, 'password')}
      />
      <Input
        isPassword
        text={confirmPassword}
        placeholder="Submit password"
        setText={setConfirmPassword}
        componentStyle={styles.submittedPasswordContainer}
        error={errors.confirmPassword}
        onFocus={() => handleError(null, 'confirmPassword')}
      />
      <Button text={'Create an account'} onButtonPress={onSignUpButtonPress} isFilled />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <TextComponent text="Have an account?" textStyle={{ fontSize: 14, lineHeight: 16 }} />
        <Spacer horizontal />
        <Button text={'LogIn'} onButtonPress={onLogInButtonPress} isBlueTextColor />
      </View>
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: COLORS.WHITE,
  },
  submittedPasswordContainer: {
    marginBottom: 32,
  },
});
