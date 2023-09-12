import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { FC, useCallback, useLayoutEffect, useState } from 'react';

import { COLORS } from '../assets/theme';
import TextComponent from '../components/TextComponent';

import { useAppSelector } from '../store/hooks';

import { movieService } from '../services/api/movieService';
import { IMovie, IMovieDetails } from '../navigation/INavigation';
import EditIcon from '../assets/svg/EditIcon';
import { useFocusEffect } from '@react-navigation/native';
import { queryClient } from '../services/api/queryClient';

const MovieDetails: FC<IMovieDetails> = ({ navigation, route }) => {
  const token = useAppSelector(state => state.userReducer.token);

  const [movieDetails, setMovieDetails] = useState<IMovie | null>(null);

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        const result = await queryClient.fetchQuery(['movieDetails'], () =>
          movieService.getMovieById(route.params.id, token!),
        );
        if (result.data?.data) {
          setMovieDetails(result.data?.data);
        }
      };

      fetchData();

      return () => {};
    }, [route, token]),
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity style={styles.p16} onPress={onEditMovie}>
          <EditIcon />
        </TouchableOpacity>
      ),
    });
  });

  const onEditMovie = () => {
    navigation.navigate('EditMovie', {
      movie: movieDetails,
      isEditing: true,
    });
  };

  if (!movieDetails) {
    return (
      <ScrollView style={styles.container}>
        <TextComponent text={'Empty list'} componentStyle={styles.titleContainer} textStyle={styles.titleText} />
      </ScrollView>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <TextComponent text={movieDetails.title} componentStyle={styles.titleContainer} textStyle={styles.titleText} />
      <TextComponent
        text={`${movieDetails.year} - ${movieDetails.format}`}
        componentStyle={{ marginBottom: 16 }}
        textStyle={{ fontSize: 16, lineHeight: 18 }}
      />
      <View>
        <TextComponent
          text={'Actors'}
          componentStyle={{ marginBottom: 8 }}
          textStyle={{ fontSize: 18, lineHeight: 20, fontWeight: 'bold' }}
        />
        {movieDetails?.actors?.map(it => (
          <TextComponent
            key={it.id}
            text={it.name}
            componentStyle={{ marginBottom: 8 }}
            textStyle={{ fontSize: 14, lineHeight: 16 }}
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
  titleContainer: {
    marginTop: 36,
    marginBottom: 8,
  },
  titleText: {
    fontSize: 24,
    lineHeight: 26,
    fontWeight: 'bold',
  },
  p16: {
    padding: 16,
  },
});
