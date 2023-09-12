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
import React, { FC, useState } from 'react';
import { COLORS } from '../../assets/theme';
import ActorIcon from '../../assets/svg/ActorIcon';
import TitleIcon from '../../assets/svg/TitleIcon';

interface IProps {
  value: string;
  changeValue: (value: string, searchType: 'title' | 'actor' | 'search') => Promise<void>;
  isPassword?: boolean;
  maxLength?: number;
  placeholder?: string;
  isDecimal?: boolean;
  error?: string | null;
  onFocus?: () => void;
  onEndEditing?: (e: NativeSyntheticEvent<TextInputEndEditingEventData>) => void;
  componentStyle?: ViewStyle | undefined;
}

const Search: FC<IProps> = ({
  value,
  changeValue,
  error,
  isDecimal = false,
  maxLength = 40,
  componentStyle = undefined,
  onFocus = () => {},
  onEndEditing = () => {},
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isSearchByTitle, setIsSearchByTitle] = useState(true);
  const [isSearchByActor, setIsSearchByActor] = useState(false);
  const [isSearchByActorAndTitle, setIsSearchByActorAndTitle] = useState(false);

  const onChangeSearchType = () => {
    if (isSearchByTitle && !isSearchByActor && !isSearchByActorAndTitle) {
      setIsSearchByTitle(false);
      setIsSearchByActor(true);
    }
    if (!isSearchByTitle && isSearchByActor && !isSearchByActorAndTitle) {
      setIsSearchByActor(false);
      setIsSearchByActorAndTitle(true);
    }
    if (!isSearchByTitle && !isSearchByActor && isSearchByActorAndTitle) {
      setIsSearchByActorAndTitle(false);
      setIsSearchByTitle(true);
    }
  };

  const onChange = (val: string) => {
    changeValue(val, isSearchByTitle ? 'title' : isSearchByActor ? 'actor' : 'search');
  };

  return (
    <View style={[styles.wrapper, componentStyle]}>
      <View style={[styles.container, error ? styles.errorStyle : undefined]}>
        <TextInput
          style={styles.text}
          placeholderTextColor={COLORS.LIGHT_GRAY}
          placeholder={
            isSearchByTitle
              ? 'Search movie by title'
              : isSearchByActor
              ? 'Search movie by actor'
              : 'Search movie by actor or title'
          }
          value={value}
          keyboardType={isDecimal ? 'numeric' : 'default'}
          maxLength={maxLength}
          onChangeText={onChange}
          onFocus={() => {
            onFocus();
            setIsFocused(true);
          }}
          onEndEditing={onEndEditing}
        />
        <TouchableOpacity
          style={{
            width: 36,
            height: 36,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={onChangeSearchType}>
          {isSearchByTitle ? <TitleIcon /> : undefined}
          {isSearchByActor ? <ActorIcon /> : undefined}
          {isSearchByActorAndTitle ? (
            <View style={{ position: 'absolute', flexDirection: 'row' }}>
              <TitleIcon />
              <ActorIcon />
            </View>
          ) : undefined}
        </TouchableOpacity>
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

export default Search;

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
