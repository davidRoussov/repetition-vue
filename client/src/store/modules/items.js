import { calculateNewRank } from '@/lib/ranks'
import { handleErrors } from '@/lib/util'
import { SERVER_URL } from '@/config'

const state = {
  currentItem: {}
}

const getters = {

}

const actions = {
  updateItemRank: ({ commit, dispatch }, type) => {
    if (state.currentItem.id) {
      const itemID = state.currentItem.id
      const newRank = calculateNewRank(state.topics, state.selectedTopic, type)
      const newTopics = state.topics.map(topic => {
        if (topic.id === state.selectedTopic) {
          return {
            ...topic,
            Items: topic.Items.map(item => {
              if (item.id === itemID) {
                return {
                  ...item,
                  Rank: newRank
                }
              } else {
                return item
              }
            })
          }
        } else {
          return topic
        }
      })
      commit('setTopics', newTopics)
      dispatch('resetCurrentItem', state.selectedTopic)
      dispatch('updateTopic')
    }
  },

  resetCurrentItem: ({ commit }, topicID) => {
    const currentItem = state.topics
      .filter(topic => topic.id === topicID)[0].Items
      .sort((a, b) => {
        if (a.Rank < b.Rank) return -1
        else if (a.Rank > b.Rank) return 1

        return 0
      })[0]

    commit('setCurrentItem', currentItem)
  },

  createItem: ({ commit, dispatch }, item) => {
    commit('setLoading')

    fetch(SERVER_URL + '/api/items', {
      method: 'POST',
      body: JSON.stringify({ item, topic: state.selectedTopic }),
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    })
    .then(handleErrors)
    .then(response => response.json())
    .then(response => {
      commit('setSuccess')
      setTimeout(() => {
        commit('setHidden')
      }, 3000)
    })
    .catch(error => {
      console.error(error)

      commit('setFailure')
      setTimeout(() => {
        commit('setHidden')
      }, 3000)
    })
  }
}

const mutations = {
  setCurrentItem (state, item) {
    state.currentItem = item
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}

