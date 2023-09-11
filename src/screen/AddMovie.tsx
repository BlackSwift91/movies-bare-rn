import {
  NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
  TextInputEndEditingEventData,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {FC, useState} from 'react';
import {nanoid} from '@reduxjs/toolkit';
import {useFocusEffect} from '@react-navigation/native';

import {useQuery} from '@tanstack/react-query';

import {COLORS} from '../assets/theme';
import TextComponent from '../components/TextComponent';
import Input from '../components/Input';
import Button from '../components/Button';
import {useAppSelector} from '../store/hooks';
import {movieService} from '../services/api/movieService';
import {DropDown} from '../components/DropDown';
import CrossIcon from '../assets/svg/CrossIcon';
import {IAddMovie} from '../navigation/INavigation';

const AddMovie: FC<IAddMovie> = ({navigation}) => {
  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');
  const [format, setFormat] = useState('');
  const [actorName, setActorName] = useState('');
  const [actors, setActors] = useState<{name: string; id: string}[]>([]);

  const [errors, setErrors] = useState<Record<string, any>>({});

  const token = useAppSelector(state => state.userReducer.token);

  const handleError = (error: string | null, type: string) => {
    setErrors(prevState => ({...prevState, [type]: error}));
  };

  useFocusEffect(
    React.useCallback(() => {
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
    }, []),
  );

  const {refetch} = useQuery(
    ['addMovie'],
    async () =>
      await movieService.addMovie(title, year, format, actors, token!),
    {
      refetchOnWindowFocus: false,
      enabled: false,
    },
  );

  const onAddActor = (
    e: NativeSyntheticEvent<TextInputEndEditingEventData>,
  ) => {
    const newArr = [...actors];
    if (e.nativeEvent.text.length > 0) {
      newArr.push({name: e.nativeEvent.text, id: nanoid()});
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

  function validate() {
    let isValid = true;

    if (title.length < 3) {
      handleError('Please enter title', 'title');
      isValid = false;
    }
    if (Number(year) < 1900) {
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
      <Input
        text={title}
        setText={setTitle}
        placeholder="Enter movie title"
        error={errors.title}
        onFocus={() => handleError(null, 'title')}
        componentStyle={{marginTop: 16}}
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
      <DropDown
        item={format}
        setItem={setFormat}
        error={errors.format}
        onFocus={() => handleError(null, 'format')}
      />
      <TextComponent
        text="Add actors"
        componentStyle={{marginTop: 24, marginBottom: 8}}
        textStyle={{fontSize: 20, lineHeight: 22, fontWeight: 'bold'}}
      />
      <View style={{marginBottom: 16}}>
        {actors.map(it => (
          <View style={styles.actorItem} key={it.id}>
            <TextComponent text={it.name} textStyle={styles.actorItemText} />
            <TouchableOpacity onPress={() => onRemoveActor(it.id)}>
              <CrossIcon />
            </TouchableOpacity>
          </View>
        ))}
      </View>
      <Input
        text={actorName}
        setText={setActorName}
        placeholder="Add new actor"
        onEndEditing={onAddActor}
      />
      <Button isFilled text={'Submit'} onButtonPress={onSubmit} />
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
});
