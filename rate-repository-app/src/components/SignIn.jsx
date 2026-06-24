import Text from './Text';
import { TextInput, Pressable, View, StyleSheet } from 'react-native';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-native';
import * as Yup from 'yup';
import useSingIn from '../hooks/useSignIn'

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },

  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 5,
  },

  errorInput: {
    borderColor: 'red',
  },

  errorText: {
    color: 'red',
    marginBottom: 10,
  },

  button: {
    backgroundColor: '#2563eb',
    padding: 12,
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 10,
  },
});


const initialValues = {
  username: '',
  password: '',
};


const validationSchema = Yup.object({
  username: Yup.string()
    .required('Username is required'),

  password: Yup.string()
    .required('Password is required'),
});


export const SignInForm = ({ onSubmit }) => {

  const formik = useFormik({
    initialValues,

    validationSchema,

    onSubmit,
  });


  return (
    <View style={styles.container}>

      <TextInput
      testID='usernameInput'
        style={[
          styles.input,
          formik.touched.username &&
          formik.errors.username &&
          styles.errorInput
        ]}
        placeholder="Username"
        value={formik.values.username}
        onChangeText={formik.handleChange('username')}
        onBlur={formik.handleBlur('username')}
      />


      {
        formik.touched.username &&
        formik.errors.username &&
        (
          <Text style={styles.errorText}>
            {formik.errors.username}
          </Text>
        )
      }



      <TextInput
      testID='passwordInput'
        style={[
          styles.input,
          formik.touched.password &&
          formik.errors.password &&
          styles.errorInput
        ]}
        placeholder="Password"
        secureTextEntry
        value={formik.values.password}
        onChangeText={formik.handleChange('password')}
        onBlur={formik.handleBlur('password')}
      />


      {
        formik.touched.password &&
        formik.errors.password &&
        (
          <Text style={styles.errorText}>
            {formik.errors.password}
          </Text>
        )
      }



      <Pressable
      testID='submitButton'
        style={styles.button}
        onPress={formik.handleSubmit}
      >
        <Text>
          Sign in
        </Text>
      </Pressable>


    </View>
  );
};


const SignIn = () => {

  const [signIn] = useSingIn()
  const navigate = useNavigate()

  const onSubmit = async (values) => {
    const username = values.username;
    const password = values.password;

    try { 
      const { data } = await signIn({ username, password })
      console.log(data)
      navigate("/")
    } catch(error) {
      console.log(error)
    }
  };


  return (
    <SignInForm onSubmit={onSubmit} />
  );
};

 
export default SignIn;