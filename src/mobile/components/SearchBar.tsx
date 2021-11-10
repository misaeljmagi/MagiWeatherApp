import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Dimensions from '../helpers/screen-dimensions';

import {AutocompleteInput} from 'react-native-autocomplete-input';
import {Location} from '../../common/types/location';

type SearchBarProps = {
  data: Location[];
  onChangeText: (value: string) => void;
  onResultPress: (index: number) => void;
};

const {width, height} = Dimensions;

const SearchBar: React.FC<SearchBarProps> = ({
  data,
  onChangeText,
  onResultPress,
}) => {
  const [text, setText] = useState<string>('');

  return (
    <View style={[styles.container]}>
      <AutocompleteInput
        data={data}
        inputContainerStyle={[styles.input, {width: width * 0.9}]}
        listContainerStyle={styles.listContainer}
        value={text}
        hideResults={text.length === 0}
        placeholder={'Find your city'}
        onChangeText={value => {
          setText(value);
          onChangeText(value);
        }}
        flatListProps={{
          keyExtractor: (_, index) => String(index),
          renderItem: ({item, index}) => (
            <TouchableOpacity
              style={[styles.listItem, {height: height * 0.03}]}
              onPress={() => {
                onResultPress(index);
                setText('');
              }}>
              <Text style={[styles.listItemText, {fontWeight: 'bold'}]}>
                {item.city?.toUpperCase()}
              </Text>
              {!!item.state && (
                <Text style={styles.listItemText}>{item.state}</Text>
              )}
              {!!item.country && (
                <Text style={styles.listItemText}>
                  {item.country?.toUpperCase()}
                </Text>
              )}
            </TouchableOpacity>
          ),
        }}
        scrollEnabled={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
  },
  input: {
    borderWidth: 2,
    borderRadius: 4,
    marginHorizontal: 10,
    marginTop: 15,
  },
  listContainer: {
    marginHorizontal: 10,
  },
  listItem: {
    flexDirection: 'row',
    borderWidth: 0.5,
    borderColor: 'gray',
  },
  listItemText: {marginTop: 2, marginRight: 10, marginLeft: 5},
});

export default SearchBar;
