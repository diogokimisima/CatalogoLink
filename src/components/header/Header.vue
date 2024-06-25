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
                class="fixed top-0 right-0 h-full w-72 bg-white text-black p-4 transform transition-transform duration-300 z-50 overflow-x-auto">
                <div class="flex items-center mb-6">
                    <h2 class="text-2xl font-bold">Filtro</h2>
                    <button @click="toggleSideFilter" class="ml-auto">
                        <X class="w-7 h-7" />
                    </button>
                </div>

                <div class="border-t border-slate-400 ">
                    <div @click="toggleDisplay('sortBy')" class="flex items-centers py-3">
                        <h3 class="font-semibold text-lg  ">Ordenar por</h3>
                        <button  class="ml-auto">
                            <ChevronDown v-if="!displayStates.sortBy" />
                            <ChevronUp v-else />
                        </button>
                    </div>
                    <ul v-if="displayStates.sortBy" class="my-5">
                        <li class="mb-2 flex items-center">
                            <button @click="sortBy('discount')">
                                <Circle v-if="filterSelected != 'discount'" class=" rounded-full" />
                                <CircleDot v-else class="rounded-full text-white bg-black" />
                            </button>
                            <label for="sortByDiscount" class="ml-2 cursor-pointer">Desconto</label>
                        </li>
                        <li class="mb-2 flex items-center">
                            <button @click="sortBy('highPrice')">
                                <Circle v-if="filterSelected != 'highPrice'" class="rounded-full" />
                                <CircleDot v-else class="rounded-full text-white bg-black" />
                            </button>
                            <label for="sortByHighPrice" class="ml-2 cursor-pointer">Maior preço</label>
                        </li>
                        <li class="mb-2 flex items-center">
                            <button @click="sortBy('lowPrice')">
                                <Circle v-if="filterSelected != 'lowPrice'" class="rounded-full" />
                                <CircleDot v-else class="rounded-full text-white bg-black" />
                            </button>
                            <label for="sortByLowPrice" class="ml-2 cursor-pointer">Menor preço</label>
                        </li>
                    </ul>
                </div>

                <div class="border-t border-slate-400">
                    <div @click="toggleDisplay('size')" class="flex items-centers py-3">
                        <h3 class="font-semibold text-lg  ">Tamanho</h3>
                        <button  class="ml-auto">
                            <ChevronDown v-if="!displayStates.size" />
                            <ChevronUp v-else />
                        </button>
                    </div>
                    <ul v-if="displayStates.size" class="flex flex-row flex-wrap gap-1 my-3">
                        <li v-for="tamanho in uniqueSizes" :key="tamanho">
                            <button
                                :class="['mb-2 border bg-white border-black w-14 h-8 rounded-md', filterSelected != tamanho ? 'border-opacity-20' : '']"
                                @click="filterSize(tamanho)">
                                <div class="flex items-center justify-center">
                                    {{ tamanho }}
                                </div>
                            </button>
                        </li>
                    </ul>
                </div>

                <div class="border-t border-slate-400">
                    <div @click="toggleDisplay('color')" class="flex items-centers py-3">
                        <h3 class="font-semibold text-lg  ">Cor</h3>
                        <button class="ml-auto">
                            <ChevronDown v-if="!displayStates.color" />
                            <ChevronUp v-else />
                        </button>
                    </div>
                    <ul v-if="displayStates.color" class="flex flex-row flex-wrap gap-1 my-3">
                        <li v-for="color in uniqueColors" :key="color">
                            <button  @click="filterColor(color)" :class="['mb-2 border bg-white border-black w-14 h-8 rounded-md  ', selectedColor != color ? 'border-opacity-20' : '']">
                                <div class="flex items-center justify-center">
                                    {{ color }}
                                </div>
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </transition>
    </header>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue';
import { Search, ListFilter, X, Circle, CircleDot, ChevronDown, ChevronUp } from 'lucide-vue-next';
import { catalogo } from '../../data/catalogo.js'

import HeaderBanner from './HeaderBanner.vue';
import HeaderCategorias from './HeaderCategorias.vue';

const isSticky = ref(false);
const showSideFilter = ref(false);
const headerBanner = ref(null);
const filterSelected = ref(null);
const uniqueSizes = ref([]);
const uniqueColors = ref([]);
const selectedColor = ref(null);
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

const sortBy = (selected) => {
    filterSelected.value = filterSelected.value === selected ? null : selected;

    const event = new CustomEvent('sort-selected', { detail: selected });
    window.dispatchEvent(event);
};

const filterSize = (size) => {
    filterSelected.value = filterSelected.value === size ? null : size;

    const event = new CustomEvent('size-selected', { detail: size });
    window.dispatchEvent(event);
};

const filterColor = (color) => {
    selectedColor.value = selectedColor.value === color ? null : color;

    const event = new CustomEvent('color-selected', { detail: color });
    window.dispatchEvent(event);
};

const extractUniqueColors = (catalogo) => {
    const colors = new Set();
    catalogo.forEach(item => colors.add(item.cor.toLowerCase()));
    return Array.from(colors);
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
