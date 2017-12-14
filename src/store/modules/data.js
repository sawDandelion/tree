const state = {
  message: 'result'
}
const mutations = {
  SET_MESSAGE(state, payload) {
    state.message = payload
  }
}
const getters = {
  getMessage (state) {
    return state.message
  }
}
const actions = {
  setMessage({ commit }, payload) {
    commit('SET_MESSAGE', payload)
    return 'successful'
  }
}
export default {
  state, mutations, getters, actions
}
