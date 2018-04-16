export const calculateNewRank = (topics, selectedTopic, type) => {
  const maxRank = getMaximumRank(topics, selectedTopic)
  switch (type) {
    case 'good':
      return maxRank + 1
    case 'pass':
      return Math.ceil(maxRank / 2)
    case 'bad':
      return Math.ceil(maxRank / 4)
    default:
      return 0
  }
}

export const getMaximumRank = (topics, topicID) => {
  return topics
    .filter(topic => topic.id === topicID)[0]
    .Items
    .sort((a, b) => {
      if (a.Rank < b.Rank) return 1
      else if (a.Rank > b.Rank) return -1

      return 0
    })[0]
    .Rank
}
