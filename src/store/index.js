import { createStore } from 'vuex';

const store = createStore({
  state: {
    cart: []
  },
  mutations: {
    ADD_TO_CART(state, { nomeProduto, valorTotal }) {
      const item = state.cart.find(item => item.nomeProduto === nomeProduto);
      if (item) {
        item.valorTotal += valorTotal;
      } else {
        state.cart.push({ nomeProduto, valorTotal });
      }
    },
    REMOVE_FROM_CART(state, index) {
      state.cart.splice(index, 1);
    }
  },
  actions: {
    addToCart({ commit }, payload) {
      commit('ADD_TO_CART', payload);
    },
    removeFromCart({ commit }, index) {
      commit('REMOVE_FROM_CART', index);
    }
  },
  getters: {
    cartItems: state => state.cart
  }
});

export default store;
