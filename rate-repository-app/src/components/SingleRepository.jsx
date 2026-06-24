import { useParams } from "react-router-native";
import { GET_REPOSITORY } from "../graphql/queries";
import { useQuery } from "@apollo/client/react";
import { FlatList, View, StyleSheet } from "react-native";
import { format } from "date-fns";
import RepositoryItem from "./RepositoryItem";
import theme from "../theme";
import Text from "./Text";

const styles = StyleSheet.create({
  reviewContainer: {
    backgroundColor: '#ffffffff',
    padding: 15,
    marginTop: 10,
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
});

const ReviewItem = ({ review }) => {
  return (
    <View style={styles.reviewContainer}>

      <View style={styles.ratingContainer}>
        <Text style={styles.ratingText}>
          {review.rating}
        </Text>
      </View>

      <View style={styles.reviewContent}>
        <Text color="textPrimary" fontWeight="bold" >
          {review.user.username}
        </Text>

        <Text color="textPrimary" style={styles.date}>
          {format(new Date(review.createdAt), 'dd MMM yyyy')}
        </Text>

        <Text>
          {review.text}
        </Text>
      </View>

    </View>
  );
};

const SingleRepository = () => {
  const { id } = useParams();

  const { data, loading, fetchMore } = useQuery(GET_REPOSITORY, {
    fetchPolicy: 'cache-and-network',
    variables: { id, first: 4 },
  });

  const handleFetchMore = () => {
    const canFetchMore = !loading &&
      data?.repository?.reviews?.pageInfo?.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        id,
        first: 4,
        after: data.repository.reviews.pageInfo.endCursor,
      },
    });
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }

  const reviews = data.repository.reviews.edges.map(
    edge => edge.node
  );

  return (
    <FlatList
      data={reviews}
      keyExtractor={({ id }) => id}
      renderItem={({ item }) => (
        <ReviewItem review={item} />
      )}
      ListHeaderComponent={() => (
        <RepositoryItem
          repo={data.repository}
          showGitHubButton
        />
      )}
      ItemSeparatorComponent={() => (
        <View style={{ height: 10}} /> 
      )}
      onEndReached={handleFetchMore}
      onEndReachedThreshold={0.5}
    />
  );
};

export default SingleRepository;