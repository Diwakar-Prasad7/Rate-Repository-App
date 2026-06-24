import { render } from '@testing-library/react-native';
import { RepositoryListContainer } from '../components/RepositoryList';

describe('RepositoryList', () => {
  describe('RepositoryListContainer', () => {
    it('renders repository information correctly', async () => {
      const repositories = {
        totalCount: 8,
        pageInfo: {
          hasNextPage: true,
          endCursor:
            'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          startCursor:
            'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
        },
        edges: [
          {
            node: {
              id: 'jaredpalmer.formik',
              fullName: 'jaredpalmer/formik',
              description: 'Build forms in React, without the tears',
              language: 'TypeScript',
              forksCount: 1619,
              stargazersCount: 21856,
              ratingAverage: 88,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars2.githubusercontent.com/u/4060187?v=4',
            },
            cursor:
              'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
          },
          {
            node: {
              id: 'async-library.react-async',
              fullName: 'async-library/react-async',
              description: 'Flexible promise-based React data loader',
              language: 'JavaScript',
              forksCount: 69,
              stargazersCount: 1760,
              ratingAverage: 72,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars1.githubusercontent.com/u/54310907?v=4',
            },
            cursor:
              'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          },
        ],
      };

      const rendered = await render(
        <RepositoryListContainer repositories={repositories} />
      );

      const repositoryItems =
        rendered.getAllByTestId('repositoryItem');

      expect(repositoryItems).toHaveLength(2);

      // First repository
      expect(rendered.getByText('jaredpalmer/formik')).toBeTruthy();
      expect(
        rendered.getByText(
          'Build forms in React, without the tears'
        )
      ).toBeTruthy();
      expect(rendered.getByText('TypeScript')).toBeTruthy();
      expect(rendered.getByText('1.6k')).toBeTruthy();
      expect(rendered.getByText('21.9k')).toBeTruthy();
      expect(rendered.getByText('88')).toBeTruthy();
      expect(rendered.getAllByText('3')).toHaveLength(2);

      // Second repository
      expect(
        rendered.getByText('async-library/react-async')
      ).toBeTruthy();
      expect(
        rendered.getByText(
          'Flexible promise-based React data loader'
        )
      ).toBeTruthy();
      expect(rendered.getByText('JavaScript')).toBeTruthy();
      expect(rendered.getByText('69')).toBeTruthy();
      expect(rendered.getByText('1.8k')).toBeTruthy();
      expect(rendered.getByText('72')).toBeTruthy();
    });
  });
});