<!-- Catalogo.vue -->

<template>
    <div>
        <!-- Card -->
        <div v-motion-fade-visible v-for="(item, index) in filteredCatalogo" :key="item.id">
            <button @click="showModal(item)"
                :class="['card card-compact w-80 bg-base-100 shadow-xl mx-auto my-10 rounded-2xl', { 'mb-0': index === filteredCatalogo.length - 1 }]">

                <figure>
                    <img :src="item.imagem" :alt="'Image ' + item.id" />
                </figure>

                <div class="card-body flex-row justify-between items-center gap-24">
                    <div class="flex flex-col ">
                        <h2 class="card-title font-semibold text-lg whitespace-nowrap">{{ item.title }}</h2>
                        <h3 class="card-title font-normal text-base">{{ item.id_produto }}</h3>
                    </div>

                    <div class="flex flex-col">
                        <h3 class="text-base text-red-400  whitespace-nowrap" v-if="item.valor_antigo">De <span
                                class="line-through"> R${{ item.valor_antigo }}</span> </h3>
                        <h4 class="card-title whitespace-nowrap">R$ {{ item.valor }}</h4>
                    </div>
                </div>

            </button>
        </div>

        <!-- Modal -->
        <dialog ref="myModal" id="my_modal_3" class="modal py-12">
            <div class="modal-box h-full overflow-auto relative">

                <form class="flex flex-col justify-between border-b border-b-gray-400 sticky -top-6 bg-white z-10 py-1 "
                    method="dialog">
                    <div class="flex flex-row -mb-2">
                        <h3 class="font-bold text-lg">{{ selectedItem?.title }}
                            <span class="font-semibold">({{ selectedItem?.id_produto }})</span>
                        </h3>
                        <div class="flex-grow"></div>
                        <button class="btn btn-sm btn-circle btn-ghost border-none focus:outline-none">
                            <X class="size-8" />
                        </button>
                    </div>

                    <div class="flex flex-row">
                        <p class="text-lg font-semibold">{{ selectedItem?.cor }}</p>
                    </div>


                </form>


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
    </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue';
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
    } else {
        return catalogo.filter(item => item.categoria === props.selectedCategory);
    }
});

const relatedItems = computed(() => {
    if (!selectedItem.value) return [];
    return catalogo.filter(item => item.id_categoria === selectedItem.value.id_categoria);
});

watch(() => props.selectedCategory, () => {
    // React to changes in selectedCategory
});

const updateCategory = (categoria) => {
    props.selectedCategory = categoria;
};

onMounted(() => {
    window.addEventListener('category-selected', (event) => {
        updateCategory(event.detail);
    });
});
</script>
