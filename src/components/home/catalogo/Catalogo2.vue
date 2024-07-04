<template>
  <div>
    <!-- Card -->
    <!-- <div v-if="filteredCatalogo.length === 0" class="text-center mt-5">
      <h1 class="font-semibold">NENHUM PRODUTO ENCONTRADO.</h1>
    </div> -->

    <!-- Loop through each category -->
    <div v-for="(categoryItems, category) in groupedCatalogo" :key="category">
      <h2 class="text-center font-bold text-xl mt-10 mb-5">{{ category }}</h2>

      <div class="flex overflow-x-auto space-x-4">
        <div v-for="item in categoryItems" :key="item.id">
          <button
            @click="showModal(item)"
            class="card card-compact w-80 bg-base-100 shadow-xl mx-auto my-10 rounded-2xl"
          >
            <figure>
              <img :src="item.imagem" :alt="'Image ' + item.id" />
            </figure>

            <div class="card-body flex-row items-center gap-12">
              <div class="flex flex-col flex-grow">
                <h2 class="card-title font-semibold text-lg whitespace-nowrap">
                  {{ item.title }}
                </h2>
                <h3 class="card-title font-normal text-base">{{ item.id_produto }}</h3>
              </div>

              <div class="flex flex-col">
                <h3
                  class="text-base text-gray-400 whitespace-nowrap"
                  v-if="item.valor_antigo"
                >
                  <span class="line-through mr-2">
                    R${{ formatPrice(item.valor_antigo) }}
                  </span>
                  <span class="text-emerald-600">
                    {{ formatPercentage(item.valor_antigo, item.valor) }}% off
                  </span>
                </h3>
                <h4 class="card-title whitespace-nowrap">
                  R$ {{ formatPrice(item.valor) }}
                </h4>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>

    <transition name="slide">
      <ToastSuccess
        v-if="showToast"
        message="Produto adicionado ao carrinho com sucesso"
      />
    </transition>

    <!-- Modal -->
    <dialog ref="myModal" id="my_modal_3" class="modal py-5">
      <transition name="slide" mode="out-in">
        <div
          v-if="selectedItem && somaTotal(selectedItem.id) != 0"
          :key="selectedItem.id"
          class="flex flex-col items-center justify-center gap-0 fixed top-24 right-8 z-50 bg-blue-950 w-[70px] h-[70px] rounded-full transform transition-transform duration-300"
        >
          <p class="text-slate-400 -mt-2">R$</p>
          <p class="text-white font-bold">
            {{ formatPrice(somaTotal(selectedItem.id)) }}
          </p>
        </div>
      </transition>

      <div class="modal-box h-full overflow-auto relative py-0 px-0">
        <form
          v-motion-fade-visible
          class="flex flex-col justify-between border-b border-b-gray-400 sticky top-0 bg-white z-10 py-2 px-4"
          method="dialog"
        >
          <div class="flex flex-row -mb-2">
            <h3 class="font-bold text-lg">
              {{ selectedItem?.title }}
              <span class="font-semibold">({{ selectedItem?.id_produto }})</span>
            </h3>
            <div class="flex-grow"></div>
            <button
              class="btn btn-sm btn-circle btn-ghost border-none focus:outline-none"
            >
              <X class="size-8" />
            </button>
          </div>

          <div class="flex flex-row">
            <p class="text-lg font-semibold">{{ selectedItem?.cor }}</p>
          </div>
        </form>

        <div class="my-5 px-4">
          <img :src="selectedItem?.imagem" alt="imagem" />
        </div>

        <h2 class="my-3 text-center font-bold">Cores e modelos</h2>

        <div
          class="overflow-y-auto flex items-center font-bold h-26 w-full my-10 mt-5 px-4"
          id="categoriaIgual"
        >
          <ul class="flex flex-row space-x-2 gap-5 py-5">
            <li
              v-motion-fade-visible
              class="rounded w-28"
              v-for="relatedItem in relatedItems"
              :key="relatedItem.id"
              :class="{
                'border-b-2 border-gray-400 transition-colors duration-500 ease-in-out':
                  relatedItem.imagem === selectedItem?.imagem,
              }"
            >
              <img
                class="object-contain"
                :src="relatedItem.imagem"
                :alt="'Image ' + relatedItem.id"
                @click="selectRelatedItem(relatedItem)"
              />
            </li>
          </ul>
        </div>

        <div class="flex justify-center px-4">
          <table>
            <thead>
              <tr>
                <th class="p-4">
                  <div class="flex justify-center items-center">
                    <Ruler />
                  </div>
                </th>
                <th class="p-4">
                  <div class="flex justify-center items-center">
                    <CandlestickChart />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="tamanho in selectedItem?.tamanho" :key="tamanho">
                <td class="p-4">{{ tamanho }}</td>
                <td>
                  <div class="flex justify-center items-center">
                    <InputNumber
                      :initialValue="getQuantidade(selectedItem.id, tamanho)"
                      @input="updateQuantidade(selectedItem.id, tamanho, $event)"
                    />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="bg-white border-t border-gray-400 mt-10 sticky bottom-0 px-4 py-2">
          <div
            class="flex items-center justify-center py-3 w-full bg-blue-950 rounded-md"
          >
            <button
              class="flex text-white"
              @click="handleAddToCart(selectedItem.title, somaTotal(selectedItem.id))"
            >
              <ShoppingCart class="mr-2 z-10" />
              Adicionar
            </button>
          </div>
        </div>
      </div>
    </dialog>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, reactive } from "vue";
import { useStore } from "vuex";
import { X, CandlestickChart, Ruler, ShoppingCart } from "lucide-vue-next";

import {
  formatPrice,
  formatPercentage,
  removeDiacritics,
} from "../../../utils/formatarValores.js";
import { catalogo } from "../../../data/catalogo.js";
import InputNumber from "./CatalogoInputNumber.vue";
import ToastSuccess from "../../toasts/ToastSuccess.vue";

const props = defineProps({
  selectedCategory: {
    type: String,
    default: "Todos",
  },
});

const selectedItem = ref(null);
const myModal = ref(null);
const selectedCategory = ref("Todos");
const searchQuery = ref("");
const sortByCriteria = ref(null);
const selectedSizes = ref([]);
const selectedColors = ref([]);
const quantidades = reactive({});
const showToast = ref(false);

const store = useStore();
const emit = defineEmits(["adicionarAoCarrinho"]);

// Function to group items by category
const groupedCatalogo = computed(() => {
  return catalogo.reduce((acc, item) => {
    if (!acc[item.categoria]) {
      acc[item.categoria] = [];
    }
    acc[item.categoria].push(item);
    return acc;
  }, {});
});

const updateCategory = (categoria) => {
  selectedCategory.value = categoria;
};

const handleSizeSelected = (sizes) => {
  selectedSizes.value = sizes;
};

const handleSearchInput = (query) => {
  searchQuery.value = query;
};

const handleSortSelected = (criteria) => {
  sortByCriteria.value = sortByCriteria.value === criteria ? null : criteria;
};

const handleColorSelected = (color) => {
  selectedColors.value = color;
};

const handleAddToCart = () => {
  store.dispatch("addToCart", {
    codigoProduto: selectedItem.value.id_produto,
    nomeProduto: selectedItem.value.title,
    valorUnitario: selectedItem.value.valor,
    valorTotal: somaTotal(selectedItem.value.id),
    quantidadePorTamanho: quantidades[selectedItem.value.id],
    imagem: selectedItem.value.imagem,
    cor: selectedItem.value.cor,
  });
  quantidades[selectedItem.value.id] = {};
  myModal.value.close();

  showToast.value = true;
  setTimeout(() => {
    showToast.value = false;
  }, 3000);
};

const getQuantidade = (productId, size) => {
  return quantidades[productId] && quantidades[productId][size]
    ? quantidades[productId][size]
    : 0;
};

const updateQuantidade = (productId, size, quantity) => {
  if (!quantidades[productId]) {
    quantidades[productId] = {};
  }
  quantidades[productId][size] = quantity;
};

const showModal = (item) => {
  selectedItem.value = item;
  myModal.value.showModal();
};

const selectRelatedItem = (item) => {
  selectedItem.value = item;
};

const somaTotal = (productId) => {
  const itemQuantities = quantidades[productId] || {};
  return Object.entries(itemQuantities).reduce((total, [size, quantity]) => {
    const product = catalogo.find((prod) => prod.id === productId);
    if (product) {
      total += product.valor * quantity;
    }
    return total;
  }, 0);
};
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.5s, opacity 0.5s;
}
.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateX(100%);
}
.slide-enter-to,
.slide-leave-from {
  opacity: 1;
  transform: translateX(0);
}
</style>
