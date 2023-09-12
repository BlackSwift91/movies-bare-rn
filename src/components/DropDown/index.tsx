import { StyleSheet, View, Text } from 'react-native';
import React, { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';

import DropDownPicker from 'react-native-dropdown-picker';

import { COLORS } from '../../assets/theme';
import ArrowDownIcon from '../../assets/svg/ArrowDownIcon';
import ArrowUpIcon from '../../assets/svg/ArrowUpIcon';

interface IProp {
  item: string;
  setItem: Dispatch<SetStateAction<string>>;
  error: string;
  onFocus?: () => void;
}

type DropDownItems = {
  label: string;
  value: number | string;
  onFocus?: () => void;
};

export const DropDown: FC<IProp> = ({ item = '', setItem, error, onFocus }) => {
  const [DDOpen, setDDOpen] = useState(false);
  const [formatLabel, setFormatLabel] = useState('');

  const [isFocused, setIsFocused] = useState(false);
  const [languageFilteredItems, setLanguageFilteredItems] = useState<DropDownItems[]>([]);

  const [formatItems, setFormatItems] = useState([
    { label: 'VHS', value: 'VHS' },
    { label: 'DVD', value: 'DVD' },
    { label: 'Blu-Ray', value: 'Blu-Ray' },
  ]);

  useEffect(() => {
    const filteredItems = formatItems.filter(it => it.value !== item);
    const res = formatItems.find(it => it.value === item);
    setLanguageFilteredItems(filteredItems);
    setFormatLabel(res?.label);
  }, [item]);

  function openPicker(val: boolean) {
    setDDOpen(val);
    onFocus();
    setIsFocused(true);
  }

  return (
    <>
      <DropDownPicker
        open={DDOpen}
        placeholder={formatLabel}
        value={item ? item : ''}
        items={languageFilteredItems}
        setOpen={val => openPicker(val)}
        setValue={val => setItem(val)}
        setItems={setFormatItems}
        maxHeight={150}
        listMode={'SCROLLVIEW'}
        zIndex={100}
        scrollViewProps={{ showsVerticalScrollIndicator: false }}
        showArrowIcon={true}
        showTickIcon={false}
        ArrowUpIconComponent={() => <ArrowUpIcon />}
        ArrowDownIconComponent={() => <ArrowDownIcon />}
        containerStyle={styles.containerStyle}
        dropDownContainerStyle={styles.dropDownContainerStyle}
        textStyle={styles.textStyle}
        listItemContainerStyle={styles.listItemContainerStyle}
        style={[styles.style, error ? styles.errorStyle : undefined]}
      />
      {error ? (
        <View>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : (
        <View>
          <Text style={styles.errorEmptyText}> </Text>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  style: {
    backgroundColor: COLORS.LIGHT_GREEN,
    borderColor: COLORS.GREEN,
    borderRadius: 5,
  },
  containerStyle: {
    height: 50,
  },
  dropDownContainerStyle: {
    backgroundColor: COLORS.LIGHT_GREEN,
    borderColor: COLORS.GREEN,
    borderTopColor: COLORS.GREEN,
    marginVertical: -1,
  },
  textStyle: {
    fontSize: 14,
    lineHeight: 16,
    color: COLORS.BLACK,
    textAlign: 'left',
    paddingLeft: 4,
  },
  listItemContainerStyle: {
    marginBottom: 5,
  },
  errorText: {
    color: 'red',
    fontSize: 10,
    lineHeight: 12,
    top: 2,
  },
  errorStyle: {
    borderColor: 'red',
    backgroundColor: COLORS.LIGHT_GREEN,
  },
  errorEmptyText: {
    color: 'transparent',
    fontSize: 10,
    lineHeight: 12,
    top: 2,
  },
});
