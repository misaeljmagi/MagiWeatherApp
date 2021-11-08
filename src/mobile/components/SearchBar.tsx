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

const SearchBar: React.FC<SearchBarProps> = ({
  data,
  onChangeText,
  onResultPress,
}) => {
  const [text, setText] = useState<string>('');
  const {width} = Dimensions;

  return (
    <View style={[styles.container]}>
      <AutocompleteInput
        data={data.map(
          d => `${d.city || ''} ${d.state || ''} ${d.country || ''}`,
        )}
        style={[styles.input, {width: width * 0.8}]}
        listContainerStyle={styles.listContainer}
        value={text}
        hideResults={text.length === 0}
        placeholder={'Buscá tu ciudad'}
        onChangeText={value => {
          setText(value);
          onChangeText(value);
        }}
        flatListProps={{
          keyExtractor: (_, index) => String(index),
          renderItem: ({item, index}) => (
            <TouchableOpacity
              onPress={() => {
                onResultPress(index);
                setText('');
              }}>
              <Text>{item}</Text>
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
    borderWidth: 1,
    borderRadius: 4,
    margin: 10,
    padding: 5,
    height: 30,
  },
  listContainer: {
    padding: 10,
  },
});

export default SearchBar;
