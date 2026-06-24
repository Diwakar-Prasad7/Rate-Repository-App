import { useFormik } from "formik"
import { TextInput, Pressable, View, StyleSheet } from 'react-native';
import * as Yup from 'yup';
import Text from "./Text";
import { useMutation } from "@apollo/client/react";
import { useNavigate } from "react-router-native";
import { CREATE_REVIEW } from "../graphql/mutations";

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
    marginBottom: 10,
    backgroundColor: 'white',
  },

  multilineInput: {
    minHeight: 120,
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 5,
    paddingHorizontal: 12,
    paddingTop: 12,
    marginBottom: 10,
    textAlignVertical: 'top',
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
    marginTop: 8,
  },

  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

const initialValues = {
    repoOwnerName: '',
    repoName: '',
    rating:'',
    review:''
}

const validationSchema = Yup.object({
    repoOwnerName: Yup.string().required("Repository owner name is required"),
    repoName: Yup.string().required('Repository name is required'),
    rating: Yup.number().required('Rating is required').min(0, 'Rating must be between 0 and 100').max(100, 'Rating must be between 0 and 100'),
    review: Yup.string()
})

export const ReviewForm = ({ onSubmit }) => {

    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema
    })

    return (
        <View style={styles.container}>
            <TextInput style={[ styles.input,formik.touched.repoOwnerName && formik.errors.repoOwnerName && styles.errorInput]} 
                placeholder="Repository owner name"
                value={formik.values.repoOwnerName} 
                onChangeText={formik.handleChange('repoOwnerName')}
                onBlur={formik.handleBlur('repoOwnerName')} />
            
            { formik.touched.repoOwnerName && formik.errors.repoOwnerName && 
            ( <Text style={styles.errorText}>{formik.errors.repoOwnerName}</Text>)}

            <TextInput style={[ styles.input,formik.touched.repoName && formik.errors.repoName && styles.errorInput]} 
                placeholder="Repository Name"
                value={formik.values.repoName} 
                onChangeText={formik.handleChange('repoName')}
                onBlur={formik.handleBlur('repoName')} />

            { formik.touched.repoName && formik.errors.repoName && 
            ( <Text style={styles.errorText}>{formik.errors.repoName}</Text>)}

            <TextInput style={[ styles.input,formik.touched.rating && formik.errors.rating&& styles.errorInput]} 
                placeholder="Rating between 0 and 100"
                keyboardType="numeric"
                value={formik.values.rating} 
                onChangeText={formik.handleChange('rating')}
                onBlur={formik.handleBlur('rating')} />

            { formik.touched.rating && formik.errors.rating && 
            ( <Text style={styles.errorText}>{formik.errors.rating}</Text>)}

            <TextInput multiline style={[ styles.multilineInput, formik.touched.review && formik.errors.review && styles.errorInput]}
                placeholder="Review"
                value={formik.values.review} 
                onChangeText={formik.handleChange('review')}
                onBlur={formik.handleBlur('review')} />

            <Pressable style={styles.button} onPress={formik.handleSubmit}>
                <Text style={styles.buttonText}>
                    Create a review
                </Text>
            </Pressable>
        </View>
    )
} 
 
const CreateReview = () => {
    const [createReview]= useMutation(CREATE_REVIEW)
    const navigate = useNavigate()

    const onSubmit = async( values ) => {

        const repositoryName = values.repoName
        const ownerName = values.repoOwnerName
        const rating = Number(values.rating)
        const text =values.review

        const { data } = await createReview({
            variables: {
                review: {repositoryName, ownerName, rating, text}
            }
        })
        navigate(`/repository/${data.createReview.repository.id}`);
    }

    return <ReviewForm onSubmit={onSubmit} />
}

export default CreateReview