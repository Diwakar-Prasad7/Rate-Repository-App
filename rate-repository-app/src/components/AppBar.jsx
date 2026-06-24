import { View, StyleSheet, ScrollView, Pressable } from 'react-native';
import Constants from 'expo-constants';
import { Link } from 'react-router-native';
import { useQuery, useApolloClient } from '@apollo/client/react';
import useAuthStorage from '../hooks/useAuthStorage'

import Text from './Text';
import theme from '../theme';
import { GET_USER } from '../graphql/queries';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBar,
    paddingHorizontal: 15,
    paddingBottom: 15,
    alignContent:'center',
    justifyContent:'flex-start'
  }
});

const AppBar = () => {

  const { data } = useQuery(GET_USER)
  const authStorage = useAuthStorage()
  const apolloClient = useApolloClient()

  const removeUser = async () => {
    await authStorage.removeAccessToken()
    await apolloClient.resetStore()
  }

  const isLoggedIn = data?.me

  return <View style={styles.container}>
    <ScrollView horizontal>
    <Link to="/" style={styles.tab}>
        <Text style={{ color: 'white', padding:15}} color="textSecondary" fontWeight="bold">
            Repositories
        </Text>
    </Link>

    {!isLoggedIn && (
    <>
    <Link to="/signin" style={styles.tab}>
        <Text style={{ color: 'white', padding: 15 }} color="textSecondary" fontWeight="bold">
          Sign in
        </Text>
      </Link>
    <Link to="/signup" style={styles.tab}>
      <Text style={{ color: 'white', padding: 15 }} color="textSecondary" fontWeight="bold">
          Sign up
        </Text>
    </Link>
    </>
    )
    }

    {isLoggedIn && (
      <>
      <Link to="/createreview" style={styles.tab}>
        <Text style={{ color: 'white', padding: 15}} color="textSecondary" fontWeight="bold">
          Create a review
        </Text>
      </Link>
      <Link to="/myreviews" style={styles.tab}>
        <Text style={{ color: 'white', padding: 15}} color="textSecondary" fontWeight="bold">
          My reviews
        </Text>
      </Link>
      <Pressable onPress={removeUser}>
        <Text
          style={{ color: 'white', padding: 15 }}
          color="textSecondary"
          fontWeight="bold"
        >
          Sign out
        </Text>
      </Pressable>
      </>
      )}
      </ScrollView>
  </View>;

};

export default AppBar;