import {
  Modal,
  NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
  TextInputEndEditingEventData,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { FC, useLayoutEffect, useState } from 'react';
import { nanoid } from '@reduxjs/toolkit';
import { useFocusEffect } from '@react-navigation/native';

import { useQuery } from '@tanstack/react-query';

import { queryClient } from '../services/api/queryClient';
import { movieService } from '../services/api/movieService';

import { useAppSelector } from '../store/hooks';

import { COLORS } from '../assets/theme';
import Input from '../components/Input';
import TextComponent from '../components/TextComponent';
import { DropDown } from '../components/DropDown';

import CrossIcon from '../assets/svg/CrossIcon';
import TrashBin from '../assets/svg/TrashBin';
import { IAddMovie } from '../navigation/INavigation';

import Button from '../components/Button';
import Spacer from '../components/Spacer';

const AddMovie: FC<IAddMovie> = ({ navigation, route }) => {
  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');
  const [format, setFormat] = useState('');
  const [actorName, setActorName] = useState('');
  const [actors, setActors] = useState<{ name: string; id: string }[]>([]);
  const [modalVisible, setModalVisible] = useState(false);

  const [errors, setErrors] = useState<Record<string, any>>({});

  const token = useAppSelector(state => state.userReducer.token);

  const handleError = (error: string | null, type: string) => {
    setErrors(prevState => ({ ...prevState, [type]: error }));
  };

  useFocusEffect(
    React.useCallback(() => {
      if (route.params?.isEditing) {
        setTitle(route.params?.movie?.title);
        setYear(String(route.params?.movie?.year));
        setFormat(route.params?.movie?.format);

        const actorsArray = route.params?.movie?.actors?.map(it => ({ name: it.name, id: it.id }));
        setActors([...actorsArray]);
      }
      return () => {
        setTitle('');
        setYear('');
        setFormat('');
        setActorName('');
        setActors([]);
        handleError('', 'format');
        handleError('', 'title');
        handleError('', 'year');
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <>
          {route.params?.isEditing ? (
            <TouchableOpacity style={styles.p16} onPress={onDeleteMovie}>
              <TrashBin />
            </TouchableOpacity>
          ) : undefined}
        </>
      ),
    });
  }, [navigation]);

  const { refetch } = useQuery(
    ['addMovie'],
    async () => await movieService.addMovie(title, year, format, actors, token!),
    {
      refetchOnWindowFocus: false,
      enabled: false,
    },
  );

  const onAddActor = (e: NativeSyntheticEvent<TextInputEndEditingEventData>) => {
    const newArr = [...actors];
    if (e.nativeEvent.text.length > 0) {
      newArr.push({ name: e.nativeEvent.text, id: nanoid() });
    }
    setActors(newArr);
    setActorName('');
  };

  const onRemoveActor = (id: string) => {
    const newArr = actors.filter(it => it.id !== id);
    setActors(newArr);
  };

  const onSubmit = async () => {
    if (!validate()) {
      return;
    }

    const res = await refetch();

    if (res.data?.data?.error?.code === 'MOVIE_EXISTS') {
      handleError('Movie already exist', 'title');
    }

    if (res.data?.data.status === 1) {
      setTitle('');
      setYear('');
      setFormat('');
      setActorName('');
      setActors([]);
      navigation.navigate('Home');
    }
  };

  const onUpdate = async () => {
    if (!validate()) {
      return;
    }
    const result = await queryClient.fetchQuery(['editMovie'], () =>
      movieService.editMovie(route.params?.movie?.id, title, year, format, actors, token!),
    );

    if (result.data?.data) {
      setTitle('');
      setYear('');
      setFormat('');
      setActorName('');
      setActors([]);
      navigation.goBack();
    }
  };

  const onDeleteMovie = async () => {
    setModalVisible(true);
  };

  const onSubmitDeleteMovie = async () => {
    const result = await queryClient.fetchQuery(['deleteMovie'], () =>
      movieService.deleteMovie(route?.params?.movie?.id, token!),
    );
    if (result?.data?.status === 1) {
      setModalVisible(false);
      navigation.navigate('Main');
    }
  };

  const onUpdateActorName = (val: string) => {
    const regExp = /[a-zA-ZА-Яа-яёЁЇїІіЄєҐґ,-]+$/;
    if (regExp.test(val)) {
      setActorName(val);
    }
    if (val.length === 0) {
      setActorName('');
    }
  };

  function validate() {
    let isValid = true;

    if (title.length < 3) {
      handleError('Please enter title', 'title');
      isValid = false;
    }
    if (Number(year) < 1896) {
      handleError('Release year to small', 'year');
      isValid = false;
    }
    if (Number(year) > 2022) {
      handleError('Release year to big', 'year');
      isValid = false;
    }
    if (year.length === 0) {
      handleError('Please enter release year', 'year');
      isValid = false;
    }
    if (format.length === 0) {
      handleError('Please enter password', 'format');
      isValid = false;
    }

    return isValid;
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.centeredView}>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <TextComponent text="Delete movie?" textStyle={{ fontSize: 20, lineHeight: 22, fontWeight: 'bold' }} />
              <View style={styles.buttonContainer}>
                <Button
                  containerStyle={{ flexShrink: 1 }}
                  text={'No'}
                  isFilled
                  onButtonPress={() => setModalVisible(!modalVisible)}
                />
                <Spacer value={16} horizontal={true} />
                <Button containerStyle={{ flexShrink: 1 }} text={'Yes'} isFilled onButtonPress={onSubmitDeleteMovie} />
              </View>
            </View>
          </View>
        </Modal>
      </View>
      <Input
        text={title}
        setText={setTitle}
        placeholder="Enter movie title"
        error={errors.title}
        onFocus={() => handleError(null, 'title')}
        componentStyle={{ marginTop: 16 }}
      />
      <Input
        isDecimal
        maxLength={4}
        text={year}
        setText={setYear}
        placeholder="Enter release year"
        error={errors.year}
        onFocus={() => handleError(null, 'year')}
      />
      <DropDown item={format} setItem={setFormat} error={errors.format} onFocus={() => handleError(null, 'format')} />
      <TextComponent
        text="Add actors"
        componentStyle={{ marginTop: 24, marginBottom: 8 }}
        textStyle={{ fontSize: 20, lineHeight: 22, fontWeight: 'bold' }}
      />
      <View style={{ marginBottom: 16 }}>
        {actors?.map(it => (
          <View style={styles.actorItem} key={it.id}>
            <TextComponent text={it.name} textStyle={styles.actorItemText} />
            <TouchableOpacity onPress={() => onRemoveActor(it.id)}>
              <CrossIcon />
            </TouchableOpacity>
          </View>
        ))}
      </View>
      <Input text={actorName} setText={onUpdateActorName} placeholder="Add new actor" onEndEditing={onAddActor} />
      {route.params?.isEditing ? (
        <Button isFilled text={'Update'} onButtonPress={onUpdate} />
      ) : (
        <Button isFilled text={'Submit'} onButtonPress={onSubmit} />
      )}
    </ScrollView>
  );
};

export default AddMovie;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: COLORS.WHITE,
  },
  submittedPasswordContainer: {
    marginBottom: 32,
  },
  actorItem: {
    backgroundColor: COLORS.LIGHT_GREEN,
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: COLORS.GREEN,
    marginBottom: 8,
  },
  actorItemText: {
    fontSize: 16,
    lineHeight: 18,
  },
  p16: {
    padding: 16,
  },

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.WHITE,
  },
  buttonContainer: {
    marginTop: 16,
    flexDirection: 'row',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
