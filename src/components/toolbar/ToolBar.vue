<template>
    <div class="w-full h-auto">
        <div class="menu menu-horizontal bg-slate-300 w-full justify-evenly items-center pt-1 pb-0">
            <div class="flex justify-center flex-col">
                <button class="tooltip" data-tip="Menu" @click="toggleSidebar">
                    <Menu class="w-7 h-7" />
                    <p>Menu</p>
                </button>
            </div>
            <div>
                <router-link to="/carrinho" class="tooltip" data-tip="Carrinho">
                    <ShoppingCart class="w-7 h-7" />
                    <p>Cart</p>
                </router-link>
            </div>
            <div>
                <a :href="whatsAppLink" class="tooltip" data-tip="WhatsApp" target="_blank">
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

        <transition name="slide">
            <div v-if="isSidebarOpen"
                class="fixed inset-y-0 left-0 w-64 bg-slate-300 text-black p-4 transform transition-transform duration-300">
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
import { ref } from 'vue';
import { Menu, ShoppingCart, X } from 'lucide-vue-next';
import whatsIcon from '../../assets/images/whats.svg';
import LogoTrovata from '../../assets/images/logo.png';

const phoneNumber = '5511948256352';
const whatsAppLink = `https://wa.me/${phoneNumber}`;

const isSidebarOpen = ref(false);

const toggleSidebar = () => {
    isSidebarOpen.value = !isSidebarOpen.value;
};

</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
    transition: transform 0.3s ease;
}

.slide-enter-from {
    transform: translateX(-100%);
}

.slide-leave-to {
    transform: translateX(-100%);
}
</style>
