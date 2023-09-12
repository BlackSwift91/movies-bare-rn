import { ScrollView, StyleSheet } from 'react-native';
import React, { FC } from 'react';

import { COLORS } from '../assets/theme';

import { useAppDispatch } from '../store/hooks';

import Button from '../components/Button';
import { ISettings } from '../navigation/INavigation';
import { logOutResetState } from '../store';

const Settings: FC<ISettings> = () => {
  const dispatch = useAppDispatch();
  const onLogOutPressed = () => {
    dispatch(logOutResetState());
  };

  return (
    <ScrollView style={styles.container}>
      <Button isFilled text={'Log Out'} onButtonPress={onLogOutPressed} />
    </ScrollView>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: COLORS.WHITE,
  },
});
