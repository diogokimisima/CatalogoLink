<!-- header.vue -->

<template>
    <header>
        <HeaderBanner />
        
        <div ref="headerBanner"></div>

        <div id="top"></div>

        <div :class="{ 'fixed top-0 w-full z-10': isSticky }">
            <HeaderCategorias @category-selected="updateCategory" />
        </div>

        <HeaderSearch :class="{ 'pt-20': isSticky }"/>
    </header>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue';

import HeaderBanner from './HeaderBanner.vue';
import HeaderCategorias from './HeaderCategorias.vue';
import HeaderSearch from './HeaderSearch.vue';

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

onMounted(() => {
    window.addEventListener('scroll', handleScroll);
});

onBeforeUnmount(() => {
    window.removeEventListener('scroll', handleScroll);
});

// Watch for changes in isSticky and emit an event
watch(isSticky, (newVal) => {
    const event = new CustomEvent('sticky-change', { detail: newVal });
    window.dispatchEvent(event);
});
</script>
