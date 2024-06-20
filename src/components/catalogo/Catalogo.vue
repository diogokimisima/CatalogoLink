<template>
  <div v-for="(item, index) in filteredCatalogo" :key="item.id">
      <button @click="showModal(item)"
          :class="['card card-compact w-80 bg-base-100 shadow-xl mx-auto my-10 rounded-2xl', { 'mb-40': index === catalogo.length - 1 }]">
          <figure>
              <img :src="item.imagem" :alt="'Image ' + item.id" />
          </figure>
          <div class="card-body gap-0">
              <div class="flex gap-24">
                  <h2 class="card-title font-normal ">Tênis Infantil</h2>
                  <h4 class="card-title">R$ {{ item.valor }}</h4>
              </div>

              <h3 class="card-title font-normal text-base">{{ item.id_produto }}</h3>

          </div>
      </button>
  </div>

  <dialog ref="myModal" id="my_modal_3" class="modal py-12">
      <div class="modal-box h-full overflow-auto relative">

          <form class=" border-b border-b-gray-400 flex sticky -top-6 bg-white z-10 py-3 " method="dialog">
              <h3 class="font-bold text-lg">{{ selectedItem?.title }}</h3>
              <div class="flex-grow"></div>
              <button class="btn btn-sm btn-circle btn-ghost">
                  <X class="size-8" />
              </button>
          </form>

          <div>
              <p><span class="font-semibold">Cor: </span>{{ selectedItem?.cor }}</p>
              <p><span class="font-semibold">Código do produto: </span>{{ selectedItem?.id_produto }}</p>
          </div>

          <div class="my-5">
              <img :src="selectedItem?.imagem" alt="imagem">
          </div>

          <h2 class="my-3 text-center font-bold">Cores e modelos</h2>

          <div class=" mt-5 overflow-y-auto flex items-center font-bold  h-26 w-full my-10" id="categoriaIgual">

              <ul class="flex flex-row space-x-2 gap-5">
                  <li class="rounded w-28" v-for="relatedItem in relatedItems" :key="relatedItem.id">
                      <img class="object-contain" :src="relatedItem.imagem" :alt="'Image ' + relatedItem.id"
                          @click="selectRelatedItem(relatedItem)" />
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
                          <td class="p-4">{{ tamanho }}</td>
                          <td>
                              <div class="flex justify-center items-center">
                                  <InputNumber v-model="quantidade" />
                              </div>
                          </td>
                      </tr>

                  </tbody>
              </table>
          </div>

      </div>
  </dialog>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { X, CandlestickChart, Ruler } from 'lucide-vue-next';

import { catalogo } from "../../data/catalogo.js";
import InputNumber from './CatalogoInputNumber.vue';

const props = defineProps({
  selectedCategory: {
      type: String,
      default: 'Todos'
  }
});

const selectedItem = ref(null);
const myModal = ref(null);

const showModal = (item) => {
  selectedItem.value = item;
  myModal.value.showModal();
};

const selectRelatedItem = (item) => {
  selectedItem.value = item;
};

const filteredCatalogo = computed(() => {
  if (props.selectedCategory === 'Todos') {
      return catalogo;
  }
  return catalogo.filter(item => item.categoria === props.selectedCategory);
});

const relatedItems = computed(() => {
  if (!selectedItem.value) return [];
  return catalogo.filter(item => item.id_categoria === selectedItem.value.id_categoria);
});
</script>
