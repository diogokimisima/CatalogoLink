import { createStore } from 'vuex';

const store = createStore({
  state: {
    cart: []
  },
  mutations: {
    ADD_TO_CART(state, { codigoProduto, nomeProduto, valorTotal, quantidadePorTamanho, imagem, cor }) {
      const itemIndex = state.cart.findIndex(item => item.codigoProduto === codigoProduto);
      if (itemIndex !== -1) {
        for (const tamanho in quantidadePorTamanho) {
          if (state.cart[itemIndex].quantidadePorTamanho[tamanho]) {
            state.cart[itemIndex].quantidadePorTamanho[tamanho] += quantidadePorTamanho[tamanho];
          } else {
            state.cart[itemIndex].quantidadePorTamanho[tamanho] = quantidadePorTamanho[tamanho];
          }
        }
      } else {
        state.cart.push({
          codigoProduto,
          nomeProduto,
          valorTotal,
          quantidadePorTamanho,
          imagem,
          cor
        });
      }
    }
    ,
    REMOVE_FROM_CART(state, index) {
      state.cart.splice(index, 1);
    },
  },
  actions: {
    addToCart({ commit }, payload) {
      commit('ADD_TO_CART', payload);
    },
    removeFromCart({ commit }, index) {
      commit('REMOVE_FROM_CART', index);
    },
  },
  getters: {
    cartItems: state => state.cart,
  },
});

export default store;
