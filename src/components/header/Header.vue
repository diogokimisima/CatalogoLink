<!-- header.vue -->

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
                class="fixed top-0 right-0 h-full w-72 bg-slate-200 text-black p-4 transform transition-transform duration-300 z-50">
                <div class="flex items-center mb-6">
                    <h2 class="text-2xl font-bold">Filtro</h2>
                    <button @click="toggleSideFilter" class="ml-auto">
                        <X class="w-7 h-7" />
                    </button>
                </div>
                <div>
                    <h3 class="font-semibold text-lg mb-6">Ordenar por</h3>
                    <ul>
                        <li class="mb-2 flex items-center">
                            <button @click="sortBy('discount')">
                                <Circle v-if="filterSelected != 'discount'" class="bg-white rounded-full"  />
                                <CircleDot v-else class="bg-sky-400 rounded-full"/>
                            </button>
                            <label for="sortByDiscount" class="ml-2 cursor-pointer">Desconto</label>
                        </li>
                        <li class="mb-2 flex items-center">
                            <button @click="sortBy('highPrice')" >
                                <Circle v-if="filterSelected != 'highPrice'" class="bg-white rounded-full"  />
                                <CircleDot v-else class="bg-sky-400 rounded-full"/>
                            </button>
                            <label for="sortByHighPrice" class="ml-2 cursor-pointer">Maior preço</label>
                        </li>
                        <li class="mb-2 flex items-center">
                            <button @click="sortBy('lowPrice')">
                                <Circle v-if="filterSelected != 'lowPrice'" class="bg-white rounded-full"  />
                                <CircleDot v-else class="bg-sky-400 rounded-full"/>
                            </button>
                            <label for="sortByLowPrice" class="ml-2 cursor-pointer">Menor preço</label>
                        </li>
                    </ul>
                </div>
                <div>
                    <h3 class="font-semibold text-lg mb-6">tamanho</h3>
                    <ul>
                        <li v-for="tamanho in seletectedItem?.tamanho" :key="tamanho" class="mb-2 flex items-center" >
                            <button @click="sortBy('discount')">
                                <Circle class="bg-white rounded-full"  :class="{ 'bg-sky-400': filterSelected === 'discount' }" />
                            </button>
                            <label for="sortByDiscount" class="ml-2 cursor-pointer">{{ tamanho }}</label>
                        </li>
                    </ul>
                </div>
            </div>
        </transition>
    </header>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue';
import { Search, ListFilter, X, Circle, CircleDot } from 'lucide-vue-next';

import HeaderBanner from './HeaderBanner.vue';
import HeaderCategorias from './HeaderCategorias.vue';

const isSticky = ref(false);
const showSideFilter = ref(false);
const headerBanner = ref(null);
const filterSelected = ref(null);
const seletectedItem = ref(null);

const toggleSideFilter = () => {
    showSideFilter.value = !showSideFilter.value;
};

const sortBy = (selected) => {
    filterSelected.value = filterSelected.value === selected ? null : selected;

    const event = new CustomEvent('sort-selected', { detail: selected });
    window.dispatchEvent(event);
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