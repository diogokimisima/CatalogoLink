<template>
    <header>
        <HeaderBanner />

        <div ref="headerBanner"></div>

        <div id="top"></div>

        <div :class="{ 'fixed top-0 w-full z-10': isSticky }">
            <HeaderCategorias @category-selected="updateCategory" />
        </div>

        <div class="m-3 flex items-center gap-2 z-50" :class="{ 'pt-20': isSticky }">
            <div class="w-4/5">
                <label class="input input-bordered flex items-center gap-2 mr-auto">
                    <Search class="text-gray-400 size-5" />
                    <input type="text" class="grow" placeholder="Pesquisar"
                        @input="handleSearchInput($event.target.value)" />
                </label>
            </div>
            <div class="flex items-center justify-center mx-auto">
                <button @click="toggleSideFilter">
                    <ListFilter />
                </button>
            </div>
        </div>

        <transition name="fade">
            <div v-if="showSideFilter" class="fixed inset-0 bg-black bg-opacity-70 z-40" @click="toggleSideFilter">
            </div>
        </transition>

        <transition name="slide">
            <div v-if="showSideFilter"
                class="fixed top-0 right-0 h-full w-72 bg-white text-black p-3 transform transition-transform duration-300 z-40 overflow-x-auto">
                <div class="sticky -top-3 pt-1 z-10 mb-1 flex flex-col gap-2 border-b border-slate-400 bg-white">
                    <div class="flex items-center">
                        <h2 class="text-2xl font-bold">Filtros e Ordenação</h2>
                        <button @click="toggleSideFilter" class="ml-auto">
                            <X class="w-7 h-7" />
                        </button>
                    </div>
                    <div class="flex gap-2 mb-2">
                        <button @click="clearAllFilters">
                            <Trash2 v-if="selectedSortBy != null &&
                                selectedSizes != [] &&
                                selectedColors != []" />
                            <Trash v-else />
                        </button>
                        <p class="font-semibold">Remover todos os filtros</p>
                    </div>
                </div>

                <!-- ORDENAR POR -->
                <div v-motion-fade-visible>
                    <div @click="toggleDisplay('sortBy')" class="flex items-centers py-3">
                        <h3 class="font-semibold text-lg  ">Ordenar por</h3>
                        <button class="ml-auto">
                            <ChevronDown v-if="!displayStates.sortBy" />
                            <ChevronUp v-else />
                        </button>
                    </div>
                    <ul v-if="displayStates.sortBy" class="my-3">
                        <li class="mb-2 flex items-center">
                            <button @click="sortBy('lowDiscount')">
                                <Circle v-if="selectedSortBy !== 'lowDiscount'" class="rounded-full" />
                                <CircleDot v-else class="rounded-full text-white bg-black" />
                            </button>
                            <label for="sortByLowDiscount" class="ml-2 cursor-pointer">Menor Desconto</label>
                        </li>
                        <li class="mb-2 flex items-center">
                            <button @click="sortBy('highDiscount')">
                                <Circle v-if="selectedSortBy !== 'highDiscount'" class="rounded-full" />
                                <CircleDot v-else class="rounded-full text-white bg-black" />
                            </button>
                            <label for="sortByHighDiscount" class="ml-2 cursor-pointer">Maior Desconto</label>
                        </li>
                        <li class="mb-2 flex items-center">
                            <button @click="sortBy('highPrice')">
                                <Circle v-if="selectedSortBy != 'highPrice'" class="rounded-full" />
                                <CircleDot v-else class="rounded-full text-white bg-black" />
                            </button>
                            <label for="sortByHighPrice" class="ml-2 cursor-pointer">Maior preço</label>
                        </li>
                        <li class="mb-2 flex items-center">
                            <button @click="sortBy('lowPrice')">
                                <Circle v-if="selectedSortBy != 'lowPrice'" class="rounded-full" />
                                <CircleDot v-else class="rounded-full text-white bg-black" />
                            </button>
                            <label for="sortByLowPrice" class="ml-2 cursor-pointer">Menor preço</label>
                        </li>
                    </ul>
                </div>

                <!-- TAMANHO -->
                <div v-motion-fade-visible class="border-t border-slate-400">
                    <div @click="toggleDisplay('size')" class="flex items-centers py-3">
                        <h3 class="font-semibold text-lg  ">Filtrar por tamanho</h3>
                        <button class="ml-auto">
                            <ChevronDown v-if="!displayStates.size" />
                            <ChevronUp v-else />
                        </button>
                    </div>
                    <ul v-if="displayStates.size" class="flex flex-row flex-wrap gap-1 my-3">
                        <li v-for="tamanho in uniqueSizes" :key="tamanho">
                            <button
                                :class="['mb-2 border-2 bg-white border-black py-1 px-4 rounded-md', !selectedSizes.includes(tamanho) ? 'border-opacity-10' : 'border-opacity-100']"
                                @click="toggleSizeSelection(tamanho)">
                                <div class="flex items-center justify-center">
                                    {{ tamanho }}
                                </div>
                            </button>
                        </li>
                    </ul>
                </div>

                <!-- CORES -->
                <div v-motion-fade-visible class="border-t border-slate-400">
                    <div @click="toggleDisplay('color')" class="flex items-centers py-3">
                        <h3 class="font-semibold text-lg  ">Filtrar por cor</h3>
                        <button class="ml-auto">
                            <ChevronDown v-if="!displayStates.color" />
                            <ChevronUp v-else />
                        </button>
                    </div>
                    <ul v-if="displayStates.color" class="flex flex-row flex-wrap gap-1 my-3">
                        <li v-for="color in uniqueColors" :key="color.nome">
                            <button @click="toggleColorSelection(color)" class="mb-2 bg-white py-1 px-2 ">
                                <div class="flex flex-col items-center justify-center w-11 h-auto ">
                                    <div :class="[' flex items-center justify-center w-7 h-7 rounded-full', color.nome === 'branco' ? 'border border-black border-opacity-30' : '']"
                                        :style="`background-color: ${color.cor_predominante}`">
                                        <Check v-if="selectedColors.includes(color.nome)"
                                            :class="[color.nome === 'preto' ? 'text-white' : '']" />
                                    </div>
                                    <p>{{ color.nome.charAt(0).toUpperCase() + color.nome.slice(1) }}</p>
                                </div>
                            </button>
                        </li>
                    </ul>
                </div>

                <div class="border-t border-slate-400"></div>
            </div>
        </transition>
    </header>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue';
import { Search, ListFilter, X, Circle, CircleDot, ChevronDown, ChevronUp, Check, Trash2, Trash } from 'lucide-vue-next';
import { catalogo } from '../../data/catalogo.js'

import HeaderBanner from './HeaderBanner.vue';
import HeaderCategorias from './HeaderCategorias.vue';

const isSticky = ref(false);
const showSideFilter = ref(false);
const headerBanner = ref(null);

const uniqueSizes = ref([]);
const uniqueColors = ref([]);

const selectedSortBy = ref(null);
const selectedSizes = ref([]);
const selectedColors = ref([]);
const displayStates = ref({
    sortBy: true,
    size: true,
    color: true
});



const toggleDisplay = (section) => {
    displayStates.value[section] = !displayStates.value[section];
};

const toggleSideFilter = () => {
    showSideFilter.value = !showSideFilter.value;
};


const extractUniqueColors = (catalogo) => {
    const colorsMap = new Map();
    catalogo.forEach(item => {
        const cor = item.cor.toLowerCase();
        if (!colorsMap.has(cor)) {
            colorsMap.set(cor, {
                nome: cor,
                cor_predominante: item.cor_predominante
            });
        }
    });
    return Array.from(colorsMap.values());
};

const extractUniqueSizes = (catalogo) => {
    const sizes = new Set();
    catalogo.forEach(item => {
        item.tamanho.forEach(size => sizes.add(size));
    });
    return Array.from(sizes).sort((a, b) => a - b);
};

const handleScroll = () => {
    if (headerBanner.value) {
        const bannerBottom = headerBanner.value.getBoundingClientRect().bottom;
        isSticky.value = bannerBottom <= 0;
    }
};

const clearAllFilters = () => {
    selectedSizes.value = [];
    selectedColors.value = [];
    selectedSortBy.value = null

    const event = new CustomEvent('clear-filters');
    window.dispatchEvent(event);
};

const sortBy = (selected) => {
    selectedSortBy.value = selectedSortBy.value === selected ? null : selected;

    const event = new CustomEvent('sort-selected', { detail: selected });
    window.dispatchEvent(event);
};


const toggleSizeSelection = (size) => {
    const index = selectedSizes.value.indexOf(size);
    if (index === -1) {
        selectedSizes.value.push(size);
    } else {
        selectedSizes.value.splice(index, 1);
    }

    const event = new CustomEvent('sizes-selected', { detail: selectedSizes.value });
    window.dispatchEvent(event);
};

const toggleColorSelection = (color) => {
    const index = selectedColors.value.indexOf(color.nome); // Encontra o índice do tamanho no array
    if (index === -1) {
        selectedColors.value.push(color.nome);// Se o tamanho não estiver no array, adiciona
    } else {
        selectedColors.value.splice(index, 1)// Se o tamanho estiver no array, remove
    }

    const event = new CustomEvent('colors-selected', { detail: selectedColors.value });
    window.dispatchEvent(event); // Dispara um evento customizado com os tamanhos selecionados
}

const updateCategory = (categoria) => {
    const event = new CustomEvent('category-selected', { detail: categoria });
    window.dispatchEvent(event);

    document.getElementById('top').scrollIntoView({ behavior: 'smooth' });
};

const handleSearchInput = (query) => {
    const event = new CustomEvent('search-input', { detail: query });
    window.dispatchEvent(event);
};

onMounted(() => {
    uniqueSizes.value = extractUniqueSizes(catalogo);
    uniqueColors.value = extractUniqueColors(catalogo);
    window.addEventListener('scroll', handleScroll);
});

onBeforeUnmount(() => {
    window.removeEventListener('scroll', handleScroll);
});

watch(showSideFilter, (newValue) => {
    if (newValue) {
        document.body.classList.add('overflow-hidden');
    } else {
        document.body.classList.remove('overflow-hidden');
    }
});
</script>


<style scoped>
.slide-enter-from {
    transform: translateX(100%);
}

.slide-leave-to {
    transform: translateX(100%);
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
