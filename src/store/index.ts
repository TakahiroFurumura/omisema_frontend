import { createStore } from 'vuex'

export default createStore({
  state: {
    debug: true,
    drawer: false,
  },
  getters: {
  },
  mutations: {
    setDrawer: (state, payload) => (state.drawer = payload),
    toggleDrawer: state => (state.drawer = !state.drawer),
  },
  actions: {
  },
  modules: {
  }
})

