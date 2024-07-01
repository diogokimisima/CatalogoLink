<template>
    <div class="w-full h-auto">
        <div class="menu menu-horizontal bg-slate-200 w-full justify-evenly items-center pt-1 pb-0.5">
            <div>
                <button class="tooltip flex flex-col items-center" data-tip="Menu" @click="toggleSidebar">
                    <Menu class="w-7 h-7" />
                    <p>Menu</p>
                </button>
            </div>
            <div class="flex flex-col items-center">
                <router-link to="/" class="tooltip flex flex-col items-center" data-tip="Catálogo" >
                   <BookImage />
                    <p>Catálogo</p>
                </router-link>
            </div>
            <div >
                <router-link to="/carrinho" class="tooltip flex flex-col items-center" data-tip="Carrinho">
                    <ShoppingCart class="w-7 h-7" />
                    <span class="absolute -top-1 right-1 bg-red-500 rounded-full text-white text-xs px-1"
                        v-if="$store.getters.cartItems.length > 0">
                        {{ $store.getters.cartItems.length }}
                    </span>
                    <p class="">Carrinho</p>
                </router-link>
            </div>
            <div class="flex flex-col items-center">
                <a :href="whatsAppLink" class="tooltip flex flex-col items-center" data-tip="WhatsApp" target="_blank">
                    <img class="w-7 h-7" :src="whatsIcon" alt="WhatsApp Icon" />
                    <p>Whats</p>
                </a>
            </div>
        </div>

        <div class="bg-blue-950 flex justify-center items-center h-6">
            <a href="https://trovata.com.br/" target="_blank">
                <img class="w-28 h-28 object-contain" :src="LogoTrovata" alt="logo trovata" />
            </a>
        </div>

        <transition name="fade">
            <div v-if="isSidebarOpen" class="fixed inset-0 bg-black bg-opacity-70 z-40" @click="toggleSidebar"></div>
        </transition>

        <transition name="slide">
            <div v-if="isSidebarOpen"
                class="fixed inset-y-0 left-0 w-72 bg-slate-200 text-black p-4 transform transition-transform duration-300 z-50">
                <div class="flex items-center mb-6">
                    <h2 class="text-2xl font-bold">Menu</h2>
                    <button @click="toggleSidebar" class="ml-auto">
                        <X class="w-7 h-7" />
                    </button>
                </div>
                <ul>
                    <li class="mb-2"><a href="#">Home</a></li>
                    <li class="mb-2"><a href="#">About</a></li>
                    <li class="mb-2"><a href="#">Services</a></li>
                    <li class="mb-2"><a href="#">Contact</a></li>
                </ul>
            </div>
        </transition>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { Menu, ShoppingCart, X, BookImage } from 'lucide-vue-next';
import whatsIcon from '../../assets/images/whats.svg';
import LogoTrovata from '../../assets/images/logo.png';

const phoneNumber = '5511948256352';
const whatsAppLink = `https://wa.me/${phoneNumber}`;
const isSidebarOpen = ref(false);

const toggleSidebar = () => {
    isSidebarOpen.value = !isSidebarOpen.value;
};

watch(isSidebarOpen, (newValue) => {
    if (newValue) {
        document.body.classList.add('overflow-hidden');
    } else {
        document.body.classList.remove('overflow-hidden');
    }
});

</script>

<style scoped>
.slide-enter-from {
    transform: translateX(-100%);
}

.slide-leave-to {
    transform: translateX(-100%);
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
