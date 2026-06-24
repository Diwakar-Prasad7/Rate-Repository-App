import { useMutation, useQuery } from "@apollo/client/react";
import { FlatList, View, StyleSheet, Pressable, Alert } from "react-native";
import { format } from "date-fns";
import { useNavigate } from "react-router-native";
import theme from "../theme";
import Text from "./Text";
import { GET_USER } from "../graphql/queries";
import { DELETE_REVIEW } from "../graphql/mutations";

const styles = StyleSheet.create({
  reviewContainer: {
    backgroundColor: '#ffffffff',
    padding: 15,
    marginTop: 10,
  },

  reviewTop: {
    flexDirection: 'row',
  },

  ratingContainer: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    borderWidth: 3,
    borderColor: theme.colors.primary,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },

  ratingText: {
    color: theme.colors.primary,
    fontWeight: 'bold',
  },

  reviewContent: {
    flex: 1,
  },

  date: {
    marginBottom: 8,
  },
  buttonContainer: {
    flexDirection:'row',
    justifyContent: 'center',
    marginLeft: 10,
    gap: 10,
  },

  button: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    alignItems: 'center',
    minWidth: 100,
    flex:1,
  },

  viewButton: {
    backgroundColor: '#053bb1ff',
  },

  deleteButton: {
    backgroundColor: '#b30606b4',
  },

  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

const ReviewItem = ({ review, onDelete }) => {
  const navigate = useNavigate()
  
  return (
    <View style={styles.reviewContainer}>
      <View style={styles.reviewTop}>

        <View style={styles.ratingContainer}>
          <Text style={styles.ratingText}>
            {review.rating}
          </Text>
        </View>

        <View style={styles.reviewContent}>
          <Text color="textPrimary" fontWeight="bold" >
            {review.repository.fullName}
          </Text>

          <Text color="textPrimary" style={styles.date}>
            {format(new Date(review.createdAt), 'dd MMM yyyy')}
          </Text>

          <Text>
            {review.text}
          </Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Pressable style={[styles.button, styles.viewButton]} onPress={() => navigate(`/repository/${review.repository.id}`)}>
          <Text style={styles.buttonText}>View repository</Text>
        </Pressable>
        <Pressable style={[styles.button, styles.deleteButton]} onPress={() => onDelete(review.id)}>
          <Text style={styles.buttonText}>Delete</Text>
        </Pressable>
      </View>

    </View>
  );
};

const MyReviews = () => {
    const { data, refetch } = useQuery(GET_USER, {
        variables: {
            includeReviews: true
        }
    })

    const [deleteReview] = useMutation(DELETE_REVIEW)

    const handleDelete = (id) => {
      Alert.alert(
        "Delete review",
        "Are you sure you want to delete this review ?",
        [{
          text: "Cancel",
          style: "cancel"
        }, {
          text: "Delete",
          style: "destructive",
          onPress: async() => {
            await deleteReview({
              variables: {
                id
              }
            })
            refetch()
          }
        }]
      )
    }

    const reviews = data?.me?.reviews?.edges.map( edge => edge.node ) || [];

    return (
    <FlatList
      data={reviews}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <ReviewItem review={item} onDelete={handleDelete} />
      )}
      ItemSeparatorComponent={() => (
        <View style={{ height: 10}} /> 
      )}
    />
  );
}

export default MyReviews