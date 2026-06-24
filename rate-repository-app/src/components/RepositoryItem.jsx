import { View, StyleSheet, Image, Pressable } from 'react-native';
import Text from './Text';
import theme from '../theme';
import * as Linking from 'expo-linking'

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 15,
  },

  topContainer: {
    flexDirection: 'row',
  },

  avatar: {
    width: 50,
    height: 50,
    borderRadius: 4,
  },

  infoContainer: {
    flex: 1,
    marginLeft: 15,
  },

  language: {
    alignSelf: 'flex-start',
    backgroundColor: theme.colors.primary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginTop: 6,
  },

  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 15,
  },

  statItem: {
    alignItems: 'center',
  },

  githubButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
});

const formatCount = (count) => {
  return count >= 1000
    ? `${(count / 1000).toFixed(1).replace('.0', '')}k`
    : String(count);
};

const StatItem = ({ label, value }) => (
  <View style={styles.statItem}>
    <Text fontWeight="bold">{formatCount(value)}</Text>
    <Text color="textSecondary">{label}</Text>
  </View>
);

const RepositoryItem = ({ repo, showGitHubButton=false }) => {
  return (
    <View style={styles.container} testID='repositoryItem'>
      <View style={styles.topContainer}>
        <Image
          style={styles.avatar}
          source={{ uri: repo.ownerAvatarUrl }}
        />

        <View style={styles.infoContainer}>
          <Text fontWeight="bold" fontSize="subheading">
            {repo.fullName}
          </Text>

          <Text color="textSecondary">
            {repo.description}
          </Text>

          <View style={styles.language}>
            <Text style={{ color: 'white' }}>
              {repo.language}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.statsContainer}>
        <StatItem
          label="Stars"
          value={repo.stargazersCount}
        />

        <StatItem
          label="Forks"
          value={repo.forksCount}
        />

        <StatItem
          label="Reviews"
          value={repo.reviewCount}
        />

        <StatItem
          label="Rating"
          value={repo.ratingAverage}
        />
      </View>
 
      {showGitHubButton && (
        <Pressable style={styles.githubButton} onPress={() => Linking.openURL(repo.url)} >
          <Text style={{ color: 'white', padding:15}} color="textSecondary" fontWeight="bold">Open in GitHub</Text>
        </Pressable>
      )}
    </View>
  );
};

export default RepositoryItem;