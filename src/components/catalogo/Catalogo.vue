<!-- Catalogo.vue -->

<template>
    <div>
        <!-- Card -->
        <div v-for="(item, index) in filteredCatalogo" :key="item.id">
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
                                class="line-through"> R${{ formatPrice(item.valor_antigo) }}</span> </h3>
                        <h4 class="card-title whitespace-nowrap">R$ {{ formatPrice(item.valor) }}</h4>
                    </div>
                </div>

            </button>
        </div>

        <!-- Modal -->
        <dialog ref="myModal" id="my_modal_3" class="modal py-12">
            <div class="modal-box h-full overflow-auto relative">

                <form v-motion-fade-visible
                    class="flex flex-col justify-between border-b border-b-gray-400 sticky -top-6 bg-white z-10 py-1 "
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

                    <ul class="flex flex-row space-x-2 gap-5 py-5">
                        <li v-motion-fade-visible class="rounded w-28" v-for="relatedItem in relatedItems"
                            :key="relatedItem.id"
                            :class="{ 'border-b-2 border-gray-400 transition-colors duration-500 ease-in-out': relatedItem.imagem === selectedItem?.imagem }">
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
                                        <InputNumber id="1" v-motion-fade-visible/>
                                    </div>
                                </td>
                            </tr>

                        </tbody>
                    </table>
                </div>

                <div class="mt-10">
                    <InputNumber id="2" />
                </div>

            </div>
        </dialog>
    </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
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
const selectedCategory = ref('Todos');
const searchQuery = ref('');
const sortByCriteria = ref(null);
const selectedSizes = ref([]); 
const selectedColors = ref([]); 


const formatPrice = (valor) => {
    if (typeof valor !== 'number') {
        return valor;
    }
    return valor.toFixed(2).replace('.', ',');
};

const showModal = (item) => {
    selectedItem.value = item;
    myModal.value.showModal();
};

const selectRelatedItem = (item) => {
    selectedItem.value = item;
};

const removeDiacritics = (text) => {
    return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
};

const clearAllFilters = () => {
    selectedSizes.value = [];
    selectedColors.value = [];
    sortByCriteria.value = null; 

    const event = new CustomEvent('clear-filters');
    window.dispatchEvent(event);
};

const filteredCatalogo = computed(() => {
    let filteredItems = catalogo;

    if (props.selectedCategory !== 'Todos') {
        filteredItems = filteredItems.filter(item => item.categoria === props.selectedCategory);
    }

    if (searchQuery.value.trim() !== '') {
        const query = removeDiacritics(searchQuery.value.trim().toLowerCase());
        filteredItems = filteredItems.filter(item =>
            removeDiacritics(item.title.toLowerCase()).includes(query) ||
            removeDiacritics(item.id_produto.toLowerCase()).includes(query) ||
            removeDiacritics(item.cor.toLowerCase()).includes(query)
        );
    }

    if (sortByCriteria.value === 'discount') {
        filteredItems = filteredItems.filter(item => item.valor_antigo);
    } else if (sortByCriteria.value === 'highPrice') {
        filteredItems = [...filteredItems].sort((a, b) => b.valor - a.valor);
    } else if (sortByCriteria.value === 'lowPrice') {
        filteredItems = [...filteredItems].sort((a, b) => a.valor - b.valor);
    }

    if (selectedColors.value.length > 0) {
        filteredItems = filteredItems.filter(item => selectedColors.value.includes(item.cor.toLowerCase()));

    }

    if (selectedSizes.value.length > 0) {  
        filteredItems = filteredItems.filter(item => selectedSizes.value.some(size => item.tamanho.includes(size)));
    }

    return filteredItems;
});

const relatedItems = computed(() => {
    if (!selectedItem.value) return [];
    return catalogo.filter(item => item.id_categoria === selectedItem.value.id_categoria);
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
}

onMounted(() => {
    window.addEventListener('category-selected', (event) => {
        updateCategory(event.detail);
    });

    window.addEventListener('search-input', (event) => {
        handleSearchInput(event.detail);
    });

    window.addEventListener('sort-selected', (event) => {
        handleSortSelected(event.detail);
    });

    window.addEventListener('sizes-selected', (event) => {
        handleSizeSelected(event.detail);
    });

    window.addEventListener('colors-selected', (event) => {
        handleColorSelected(event.detail);
    });

    window.addEventListener('clear-filters', clearAllFilters);
});

onBeforeUnmount(() => {
    window.removeEventListener('category-selected', updateCategory);
    window.removeEventListener('search-input', handleSearchInput);
    window.removeEventListener('sort-selected', handleSortSelected);
    window.removeEventListener('sizes-selected', handleSizeSelected);
    window.removeEventListener('colors-selected', handleColorSelected);
    window.removeEventListener('clear-filters', clearAllFilters);
});
</script>

