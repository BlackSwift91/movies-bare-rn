import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {FC, useEffect, useState} from 'react';
import {useQuery} from '@tanstack/react-query';

import {useFocusEffect} from '@react-navigation/native';

import {COLORS} from '../assets/theme';
import TextComponent from '../components/TextComponent';

import {useAppDispatch, useAppSelector} from '../store/hooks';

import {movieService} from '../services/api/movieService';
import TrashBin from '../assets/svg/TrashBin';
import {queryClient} from '../services/api/queryClient';
import {setMovies} from '../store/movieSlice';
import Search from '../components/Search';
import {IMain} from '../navigation/INavigation';

const Home: FC<IMain> = ({navigation}) => {
  const dispatch = useAppDispatch();
  const token = useAppSelector(state => state.userReducer.token);
  const movies = useAppSelector(state => state.movieReducer.movies);

  const [searchText, setSearchText] = useState('');

  const {data: moviesData, refetch} = useQuery(['allMovies'], () =>
    movieService.getAllMovies(token!),
  );

  useFocusEffect(
    React.useCallback(() => {
      refetch();
      return () => {};
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  );

  useEffect(() => {
    if (moviesData?.data?.data) {
      dispatch(setMovies(moviesData?.data?.data));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [moviesData]);

  const onDeleteMovie = async (id: number) => {
    const result = await queryClient.fetchQuery(['deleteMovie'], () =>
      movieService.deleteMovie(id, token!),
    );
    if (result?.data?.status === 1) {
      refetch();
    }
  };

  const onMovieDetailsPress = async (id: number) => {
    navigation.navigate('MovieDetails', {id});
  };

  const onSearch = async (
    value: string,
    searchType: 'title' | 'actor' | 'search',
  ) => {
    console.log(searchType);
    setSearchText(value);
    if (value.length > 2) {
      const result = await queryClient.fetchQuery(['searchMovie'], () =>
        movieService.searchMovie(searchText, searchType, token!),
      );
      if (result?.data?.data) {
        dispatch(setMovies(result?.data?.data));
      }
    } else {
      refetch();
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Search value={searchText} changeValue={onSearch} />
      {movies?.length === 0 ? (
        <TextComponent
          text={'Movie list is empty'}
          componentStyle={{alignItems: 'center'}}
          textStyle={{fontSize: 18, lineHeight: 20}}
        />
      ) : undefined}
      {movies?.map(it => {
        return (
          <TouchableOpacity
            key={it.id}
            style={styles.movieItem}
            onPress={() => onMovieDetailsPress(it.id)}>
            <View>
              <TextComponent
                text={it.title}
                textStyle={{fontSize: 18, lineHeight: 20, fontWeight: 'bold'}}
              />
              <View style={{flexDirection: 'row'}}>
                <TextComponent
                  text={`${it.year} - ${it.format}`}
                  textStyle={{fontSize: 12, lineHeight: 18}}
                />
              </View>
            </View>
            <TouchableOpacity onPress={() => onDeleteMovie(it.id)}>
              <TrashBin />
            </TouchableOpacity>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: COLORS.WHITE,
  },
  submittedPasswordContainer: {
    marginBottom: 32,
  },
  movieItem: {
    flexDirection: 'row',
    backgroundColor: COLORS.LIGHT_GREEN,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: COLORS.GREEN,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
