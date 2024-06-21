<!-- header.vue -->

<template>
    <header>
        <HeaderBanner />

        <div ref="headerBanner"></div>

        <div id="top"></div>

        <div :class="{ 'fixed top-0 w-full z-10': isSticky }">
            <HeaderCategorias @category-selected="updateCategory" />
        </div>

        <div class="m-3" :class="{ 'pt-20': isSticky }">
            <label class="input input-bordered flex items-center gap-2">
                <Search class="text-gray-400 size-5" />
                <input type="text" class="grow" placeholder="Pesquisar"
                    @input="handleSearchInput($event.target.value)" />
            </label>
        </div>
    </header>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue';
import { Search } from 'lucide-vue-next';

import HeaderBanner from './HeaderBanner.vue';
import HeaderCategorias from './HeaderCategorias.vue';

const isSticky = ref(false);
const headerBanner = ref(null);

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

</script>