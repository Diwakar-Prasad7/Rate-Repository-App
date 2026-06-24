import useRepositories from '../hooks/useRepositories'
import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import { Picker } from '@react-native-picker/picker'
import { Searchbar } from 'react-native-paper';
import { useDebounce } from 'use-debounce';
import RepositoryItem from './RepositoryItem';
import { useNavigate } from 'react-router-native';
import { useState } from 'react';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },

  searchContainer: {
    margin: 10,
    marginBottom:5,
    borderWidth:1,
    borderColor: '#000000ff',
    borderRadius: 20,
    backgroundColor: 'white',
    overflow: 'hidden',
  },

  picker: {
    margin:10,
    marginTop:5,
    height: 50,
    color: '#374151',
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryListHeader = ({ setOrderBy, keyword, orderBy, setKeyword }) => (
  <View>
    <Searchbar
      style={styles.searchContainer}
      placeholder="Search Repositories"
      value={keyword}
      onChangeText={setKeyword}
    />

    <Picker
      style={styles.picker}
      selectedValue={orderBy}
      onValueChange={(value) => setOrderBy(value)}
    >
      <Picker.Item
        label="Latest repositories"
        value="latest"
      />

      <Picker.Item
        label="Highest rated repositories"
        value="highest"
      />

      <Picker.Item
        label="Lowest rated repositories"
        value="lowest"
      />
    </Picker>
  </View>
);

export const RepositoryListContainer = ({ repositories, orderBy, setOrderBy, keyword, setKeyword, onEndReached }) => {
  const navigate = useNavigate()

  const repositoryNodes = repositories?.edges ? repositories.edges.map(edge => edge.node) : []

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={
        <RepositoryListHeader
          orderBy={orderBy}
          setOrderBy={setOrderBy}
          keyword={keyword}
          setKeyword={setKeyword}
        />
      }
      renderItem={({ item }) => (
        <Pressable onPress={() => navigate(`/repository/${item.id}`)}>
          <RepositoryItem repo={item} />
        </Pressable>
      )}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.5}
    />
  );
  };

const RepositoryList = () => {

  const [orderBy, setOrderBy] = useState('latest');
  const [keyword, setKeyword] = useState('')
  const [debouncedKeyword] = useDebounce(keyword)

  const variables = {
    orderBy:
      orderBy === 'latest'
        ? 'CREATED_AT'
        : 'RATING_AVERAGE',

    orderDirection:
      orderBy === 'lowest'
        ? 'ASC'
        : 'DESC',

    searchKeyword: debouncedKeyword,
  };
  const { repositories, fetchMore } = useRepositories({first: 5, ...variables});

  return <RepositoryListContainer repositories={repositories} orderBy={orderBy} setOrderBy={setOrderBy} keyword={keyword} setKeyword={setKeyword} onEndReached={fetchMore}/>;
};

export default RepositoryList; 