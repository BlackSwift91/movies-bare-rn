import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {FC, useLayoutEffect} from 'react';
import {useQuery} from '@tanstack/react-query';

import {COLORS} from '../assets/theme';
import TextComponent from '../components/TextComponent';

import {useAppSelector} from '../store/hooks';

import {movieService} from '../services/api/movieService';
import TrashBin from '../assets/svg/TrashBin';
import {queryClient} from '../services/api/queryClient';
import {IMovieDetails} from '../navigation/INavigation';

const MovieDetails: FC<IMovieDetails> = ({navigation, route}) => {
  const token = useAppSelector(state => state.userReducer.token);

  console.log(route.params);

  const {data: movieDetails} = useQuery(['movieDetails'], () =>
    movieService.getMovieById(route.params.id, token!),
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity style={{padding: 16}} onPress={onDeleteMovie}>
          <TrashBin />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const onDeleteMovie = async () => {
    const result = await queryClient.fetchQuery(['deleteMovie'], () =>
      movieService.deleteMovie(route?.params?.id, token!),
    );
    if (result?.data?.status === 1) {
      navigation.goBack();
    }
  };

  return (
    <ScrollView style={styles.container}>
      <TextComponent
        text={movieDetails?.data.data.title}
        componentStyle={{marginTop: 36, marginBottom: 8}}
        textStyle={{fontSize: 24, lineHeight: 26, fontWeight: 'bold'}}
      />
      <TextComponent
        text={`${movieDetails?.data.data.year} - ${movieDetails?.data.data.format}`}
        componentStyle={{marginBottom: 16}}
        textStyle={{fontSize: 16, lineHeight: 18}}
      />
      <View>
        <TextComponent
          text={'Actors'}
          componentStyle={{marginBottom: 8}}
          textStyle={{fontSize: 18, lineHeight: 20, fontWeight: 'bold'}}
        />
        {movieDetails?.data?.data?.actors.map(it => (
          <TextComponent
            key={it.id}
            text={it.name}
            componentStyle={{marginBottom: 8}}
            textStyle={{fontSize: 14, lineHeight: 16}}
          />
        ))}
      </View>
    </ScrollView>
  );
};

export default MovieDetails;

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
