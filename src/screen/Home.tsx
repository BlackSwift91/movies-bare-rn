import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { FC, useEffect, useLayoutEffect, useState } from 'react';

import DocumentPicker from 'react-native-document-picker';

import { useQuery } from '@tanstack/react-query';

import { useFocusEffect } from '@react-navigation/native';

import { COLORS } from '../assets/theme';
import TextComponent from '../components/TextComponent';

import { useAppDispatch, useAppSelector } from '../store/hooks';

import { movieService } from '../services/api/movieService';
import { queryClient } from '../services/api/queryClient';
import { setMovies } from '../store/movieSlice';
import Search from '../components/Search';
import { IMain } from '../navigation/INavigation';
import ImportIcon from '../assets/svg/ImportIcon';
import Toast from 'react-native-toast-message';
import { FlatList } from 'react-native-gesture-handler';

const Home: FC<IMain> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const token = useAppSelector(state => state.userReducer.token);
  const movies = useAppSelector(state => state.movieReducer.movies);

  const [searchText, setSearchText] = useState('');

  const { data: moviesData, refetch } = useQuery(['allMovies'], () => movieService.getAllMovies(token!));

  useFocusEffect(
    React.useCallback(() => {
      refetch();
      return () => {};
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={onPress} style={{ paddingHorizontal: 16 }}>
          <ImportIcon />
        </TouchableOpacity>
      ),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigation]);

  useEffect(() => {
    if (moviesData?.data?.data) {
      dispatch(setMovies(moviesData?.data?.data));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [moviesData]);

  const onMovieDetailsPress = async (id: number) => {
    navigation.navigate('MovieDetails', { id });
  };

  const onSearch = async (value: string, searchType: 'title' | 'actor' | 'search') => {
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

  const getFileExtension = (fileName?: string) => {
    const ext = fileName?.split('.').pop();
    return ext;
  };

  const onDocumentSelect = async () => {
    try {
      const response = await DocumentPicker.pick({
        presentationStyle: 'fullScreen',
      });

      const formData = new FormData();
      formData.append('movies', {
        name: response[0].name,
        type: response[0].type,
        uri: response[0].uri,
      });

      if (getFileExtension(response[0].name) === 'txt' && response[0].size > 0) {
        const result = await queryClient.fetchQuery(['importMovies'], () =>
          movieService.importMovies(formData, token!),
        );
        if (result?.data?.data) {
          Toast.show({
            type: 'success',
            text1: 'File is successfully uploaded',
          });
          refetch();
        }
      }

      if (getFileExtension(response[0].name) !== 'txt') {
        Toast.show({
          type: 'error',
          text1: 'Wrong file format',
        });
      }
      if (response[0].size === 0) {
        Toast.show({
          type: 'error',
          text1: 'File is empty',
        });
      }
    } catch (err) {}
  };

  const onPress = async () => {
    onDocumentSelect();
  };

  return (
    <ScrollView style={styles.container}>
      <Search value={searchText} changeValue={onSearch} />
      {movies?.length === 0 ? (
        <TextComponent
          text={'Movie list is empty'}
          componentStyle={{ alignItems: 'center' }}
          textStyle={{ fontSize: 18, lineHeight: 20 }}
        />
      ) : undefined}
      {movies ? (
        <FlatList
          nestedScrollEnabled={true}
          data={movies}
          keyExtractor={it => String(it.id)}
          renderItem={({ item }) => (
            <TouchableOpacity key={item?.id} style={styles.movieItem} onPress={() => onMovieDetailsPress(item.id)}>
              <View>
                <TextComponent text={item?.title} textStyle={{ fontSize: 18, lineHeight: 20, fontWeight: 'bold' }} />
                <View style={{ flexDirection: 'row' }}>
                  <TextComponent
                    text={`${item?.year} - ${item?.format}`}
                    textStyle={{ fontSize: 12, lineHeight: 18 }}
                  />
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      ) : undefined}

      {/* {movies?.map(it => {
        return (
          <TouchableOpacity key={it.id} style={styles.movieItem} onPress={() => onMovieDetailsPress(it.id)}>
            <View>
              <TextComponent text={it.title} textStyle={{ fontSize: 18, lineHeight: 20, fontWeight: 'bold' }} />
              <View style={{ flexDirection: 'row' }}>
                <TextComponent text={`${it.year} - ${it.format}`} textStyle={{ fontSize: 12, lineHeight: 18 }} />
              </View>
            </View>
          </TouchableOpacity>
        );
      })} */}
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
