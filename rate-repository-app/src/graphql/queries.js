import { gql } from "@apollo/client";

export const GET_REPOSITORIES = gql`
  query Repositories(
    $first: Int
    $after: String
    $orderBy: AllRepositoriesOrderBy
    $orderDirection: OrderDirection
    $searchKeyword: String
  ) {
    repositories(  first: $first
      after: $after
      orderBy: $orderBy
      orderDirection: $orderDirection
      searchKeyword: $searchKeyword
    ) {
      totalCount
      edges {
        node {
          id
          ownerAvatarUrl
          fullName
          description
          language
          stargazersCount
          forksCount
          reviewCount
          ratingAverage
        }
        cursor
      }
      pageInfo {
        endCursor
        startCursor
        hasNextPage
      }
    }
  }
`;

// export const GET_USER = gql`
//     query Me {
//         me {
//             id
//             username
//         }
//     }
// `

export const GET_USER = gql`
  query getUser($includeReviews: Boolean = false) {
    me {
      id
      username
      reviews @include(if: $includeReviews) {
        edges {
          node {
            id
            text
            rating
            createdAt
            repository {
              id
              fullName
            }
          }
        }
      }
    }
  }
`;

export const GET_REPOSITORY = gql`
  query Repository(
    $id: ID!
    $first: Int
    $after: String
  ) {
    repository(id: $id) {
      id
      fullName
      description
      language
      stargazersCount
      forksCount
      reviewCount
      ratingAverage
      ownerAvatarUrl
      url

      reviews(
        first: $first
        after: $after
      ) {
        totalCount

        edges {
          node {
            id
            text
            rating
            createdAt
            repositoryId

            user {
              id
              username 
            }
          }

          cursor
        }

        pageInfo {
          endCursor
          startCursor
          hasNextPage
        }
      }
    }
  }
`;
