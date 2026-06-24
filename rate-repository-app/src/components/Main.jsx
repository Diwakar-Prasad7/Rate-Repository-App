import { StyleSheet, View } from 'react-native';
import { Route, Routes, Navigate } from 'react-router-native';
import RepositoryList from './RepositoryList'
import AppBar from './AppBar'
import SignIn from './SignIn';
import SingleRepository from './SingleRepository';
import CreateReview from './CreateReview';
import SignUp from './SignUp';
import MyReviews from './MyReviews';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ece7e7ff'
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Routes>
        <Route path='/' element={<RepositoryList />} />
        <Route path='*' element={<Navigate to='/' replace />} /> 
        <Route path='/signin' element={<SignIn />} />
        <Route path= '/repository/:id' element={<SingleRepository />} />
        <Route path='/createreview' element={<CreateReview />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/myreviews' element={<MyReviews />} />
      </Routes>
    </View>
  );
};

export default Main;