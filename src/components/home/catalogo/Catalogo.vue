<!-- Catalogo.vue -->

<template>
  <div>
    <!-- Card -->
    <div v-if="filteredCatalogo.length === 0" class="text-center mt-5">
      <h1 class="font-semibold">NENHUM PRODUTO ENCONTRADO.</h1>
    </div>

    <div v-for="(item, index) in filteredCatalogo" :key="item.id">
      <CatalogoCard
        :item="item"
        :is-last-card="index === filteredCatalogo.length - 1"
        @showModal="showModal"
      />
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
          class="overflow-y-auto flex items-center font-bold h-26 w-full my-5 px-4"
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

        <div class="flex justify-center">
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
                <td class="p-4 italic">{{ tamanho }}</td>
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

        <div class="px-4 mt-4">
          <p class="italic">
            <span class="font-semibold">Valor Unitário:</span> R${{ selectedItem?.valor }}
          </p>
          <p class="italic">
            <span class="font-semibold">Quantidade Total:</span>
            {{ totalQuantidadeSelecionada }}
          </p>
        </div>

        <div class="bg-white border-t border-gray-400 mt-2 sticky bottom-0 px-4 py-2">
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
import CatalogoCard from "./CatalogoCard.vue";

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

const getQuantidade = (id, tamanho) => {
  if (!quantidades[id]) {
    return 0;
  }
  return quantidades[id][tamanho] || 0;
};

const updateQuantidade = (id, tamanho, quantidade) => {
  if (!quantidades[id]) {
    quantidades[id] = {};
  }
  quantidades[id][tamanho] = quantidade;
};

const totalQuantidadeSelecionada = computed(() => {
  if (!selectedItem.value || !quantidades[selectedItem.value.id]) {
    return 0;
  }
  return Object.values(quantidades[selectedItem.value.id]).reduce(
    (total, quantidade) => total + quantidade,
    0
  );
});

const somaTotal = (id) => {
  if (!quantidades[id]) {
    return 0;
  }
  return Object.entries(quantidades[id]).reduce((total, [tamanho, quantidade]) => {
    return total + selectedItem.value.valor * quantidade;
  }, 0);
};

const selectRelatedItem = (item) => {
  selectedItem.value = item;
};

const clearAllFilters = () => {
  selectedSizes.value = [];
  selectedColors.value = [];
  sortByCriteria.value = null;

  const event = new CustomEvent("clear-filters");
  window.dispatchEvent(event);
};

const filteredCatalogo = computed(() => {
  let filteredItems = catalogo;

  if (props.selectedCategory !== "Todos") {
    filteredItems = filteredItems.filter(
      (item) => item.categoria === props.selectedCategory
    );
  }

  if (searchQuery.value.trim() !== "") {
    const query = removeDiacritics(searchQuery.value.trim().toLowerCase());
    filteredItems = filteredItems.filter(
      (item) =>
        removeDiacritics(item.title.toLowerCase()).includes(query) ||
        removeDiacritics(item.id_produto.toLowerCase()).includes(query) ||
        removeDiacritics(item.cor.toLowerCase()).includes(query)
    );
  }

  if (sortByCriteria.value === "highPrice") {
    filteredItems = [...filteredItems].sort((a, b) => b.valor - a.valor);
  } else if (sortByCriteria.value === "lowPrice") {
    filteredItems = [...filteredItems].sort((a, b) => a.valor - b.valor);
  } else if (sortByCriteria.value === "highDiscount") {
    filteredItems = filteredItems.filter((item) => item.valor_antigo);
    filteredItems = [...filteredItems].sort((a, b) => {
      const discountPercentA = ((a.valor_antigo - a.valor) / a.valor_antigo) * 100;
      const discountPercentB = ((b.valor_antigo - b.valor) / b.valor_antigo) * 100;
      return discountPercentB - discountPercentA;
    });
  } else if (sortByCriteria.value === "lowDiscount") {
    filteredItems = filteredItems.filter((item) => item.valor_antigo);
    filteredItems = [...filteredItems].sort((a, b) => {
      const discountPercentA = ((a.valor_antigo - a.valor) / a.valor_antigo) * 100;
      const discountPercentB = ((b.valor_antigo - b.valor) / b.valor_antigo) * 100;
      return discountPercentA - discountPercentB;
    });
  }

  if (selectedColors.value.length > 0) {
    filteredItems = filteredItems.filter((item) =>
      selectedColors.value.includes(item.cor.toLowerCase())
    );
  }

  if (selectedSizes.value.length > 0) {
    filteredItems = filteredItems.filter((item) =>
      selectedSizes.value.some((size) => item.tamanho.includes(size))
    );
  }
  return filteredItems;
});

const relatedItems = computed(() => {
  if (!selectedItem.value) return [];
  return catalogo.filter((item) => item.id_categoria === selectedItem.value.id_categoria);
});

const showModal = (item) => {
  selectedItem.value = item;
  myModal.value.showModal();
  scrollToTop();
};

const scrollToTop = () => {
  const modalBox = myModal.value.querySelector(".modal-box");
  if (modalBox) {
    modalBox.scrollTop = 0;
  }
};

onMounted(() => {
  window.addEventListener("category-selected", (event) => {
    updateCategory(event.detail);
  });

  window.addEventListener("search-input", (event) => {
    handleSearchInput(event.detail);
  });

  window.addEventListener("sort-selected", (event) => {
    handleSortSelected(event.detail);
  });

  window.addEventListener("sizes-selected", (event) => {
    handleSizeSelected(event.detail);
  });

  window.addEventListener("colors-selected", (event) => {
    handleColorSelected(event.detail);
  });

  window.addEventListener("clear-filters", clearAllFilters);
});

onBeforeUnmount(() => {
  window.removeEventListener("category-selected", updateCategory);
  window.removeEventListener("search-input", handleSearchInput);
  window.removeEventListener("sort-selected", handleSortSelected);
  window.removeEventListener("sizes-selected", handleSizeSelected);
  window.removeEventListener("colors-selected", handleColorSelected);
  window.removeEventListener("clear-filters", clearAllFilters);
});
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
