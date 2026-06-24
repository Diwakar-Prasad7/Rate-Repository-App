import { useQuery } from '@apollo/client/react';
import { GET_REPOSITORIES } from '../graphql/queries'

const useRepositories = (variables) => {
  const { data, error, loading, refetch, fetchMore } = useQuery(GET_REPOSITORIES, {
    variables,
    fetchPolicy: 'cache-and-network',
  })

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.repositories.pageInfo.endCursor,
        ...variables
      }
    })
  }

  const repositories = data ? data.repositories : []


  return { repositories, loading, error, refetch, fetchMore: handleFetchMore};
};

export default useRepositories;