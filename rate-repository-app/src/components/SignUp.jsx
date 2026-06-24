import * as Yup from 'yup'
import { useMutation } from '@apollo/client/react';
import { useNavigate } from 'react-router-native';
import { useFormik } from 'formik';
import { View, TextInput, Pressable, StyleSheet } from 'react-native';

import useSignIn from '../hooks/useSignIn'; 
import { CREATE_USER } from '../graphql/mutations';
import Text from './Text';

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: 'white',
  },

  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 5,
    paddingHorizontal: 12,
    marginBottom: 5,
    backgroundColor: 'white',
  },

  errorInput: {
    borderColor: '#ef4444',
  },

  errorText: {
    color: '#ef4444',
    marginBottom: 10,
  },

  button: {
    backgroundColor: '#2563eb',
    paddingVertical: 14,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },

  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

const initialValues = {
  username: '',
  password: '',
  passwordConfirmation: '',
};

const validationSchema = Yup.object({
  username: Yup.string()
    .required('Username is required')
    .min(5, 'Username must be between 5 and 30 characters')
    .max(30, 'Username must be between 5 and 30 characters'),

  password: Yup.string()
    .required('Password is required')
    .min(5, 'Password must be between 5 and 50 characters')
    .max(50, 'Password must be between 5 and 50 characters'),

  passwordConfirmation: Yup.string()
    .required('Password confirmation is required')
    .oneOf([Yup.ref('password')], 'Passwords must match'),
});

export const SignUpForm = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <View style={styles.container}>
      <TextInput
        style={[
          styles.input,
          formik.touched.username &&
            formik.errors.username &&
            styles.errorInput,
        ]}
        placeholder="Username"
        value={formik.values.username}
        onChangeText={formik.handleChange('username')}
        onBlur={formik.handleBlur('username')}
      />

      {formik.touched.username && formik.errors.username && (
        <Text style={styles.errorText}>
          {formik.errors.username}
        </Text>
      )}

      <TextInput
        style={[
          styles.input,
          formik.touched.password &&
            formik.errors.password &&
            styles.errorInput,
        ]}
        placeholder="Password"
        secureTextEntry
        value={formik.values.password}
        onChangeText={formik.handleChange('password')}
        onBlur={formik.handleBlur('password')}
      />

      {formik.touched.password && formik.errors.password && (
        <Text style={styles.errorText}>
          {formik.errors.password}
        </Text>
      )}

      <TextInput
        style={[
          styles.input,
          formik.touched.passwordConfirmation &&
            formik.errors.passwordConfirmation &&
            styles.errorInput,
        ]}
        placeholder="Password confirmation"
        secureTextEntry
        value={formik.values.passwordConfirmation}
        onChangeText={formik.handleChange('passwordConfirmation')}
        onBlur={formik.handleBlur('passwordConfirmation')}
      />

      {formik.touched.passwordConfirmation &&
        formik.errors.passwordConfirmation && (
          <Text style={styles.errorText}>
            {formik.errors.passwordConfirmation}
          </Text>
        )}

      <Pressable
        style={styles.button}
        onPress={formik.handleSubmit}
      >
        <Text style={styles.buttonText}>
          Sign up
        </Text>
      </Pressable>
    </View>
  );
};

const SignUp = () => {
    
    const [createUser] = useMutation(CREATE_USER);
    const [signIn] = useSignIn();
    const navigate = useNavigate();

    const onSubmit = async (values) => {
    const { username, password } = values;

    try {
        await createUser({
        variables: {
            user: {
            username,
            password,
            },
        },
        });

        await signIn({
        username,
        password,
        });

        navigate('/');
    } catch (e) {
        console.log(e);
    }
    };
    return <SignUpForm onSubmit={onSubmit} />
}

export default SignUp
    