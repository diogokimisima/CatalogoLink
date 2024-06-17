<template>
    <header>
        <HeaderBanner />
        
        <div ref="headerBanner">
            <HeaderSearch />
        </div>

        <div :class="{ 'fixed top-0 w-full z-50': isSticky }">
            <HeaderCategorias />
        </div>
    </header>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

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

onMounted(() => {
    window.addEventListener('scroll', handleScroll);
});

onBeforeUnmount(() => {
    window.removeEventListener('scroll', handleScroll);
});
</script>
