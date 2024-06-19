<template>
    <div class="w-full h-auto">
        <div class="menu menu-horizontal bg-slate-300 w-full justify-evenly items-center pt-1 pb-0">
            <div class="flex justify-center flex-col">
                <a class="tooltip " data-tip="Menu">
                    <Menu class="size-7" />
                    <p>Menu</p>
                </a>
            </div>
            <div>
                <router-link to="/carrinho" class="tooltip" data-tip="Carrinho">
                    <ShoppingCart class="size-7" />
                    <p>Cart</p>
                </router-link>
            </div>
            <div>
                <a :href="whatsAppLink" class="tooltip" data-tip="WhatsApp" target="_blank">
                    <img class="size-7" :src="whatsIcon" alt="WhatsApp Icon" />
                    <p>Whats</p>
                </a>
            </div>
        </div>

        <div class="bg-blue-950 flex justify-center items-center h-6">
            <a href="https://trovata.com.br/" target="_blank">
                <img class="size-28 object-contain" :src="LogoTrovata" alt="logo trovata" />
            </a>
        </div>
    </div>

</template>

<script setup>
import { Menu, ShoppingCart } from 'lucide-vue-next';
import whatsIcon from '../../assets/images/whats.svg';
import LogoTrovata from '../../assets/images/logo.png';


const phoneNumber = '5518981969555';

const whatsAppLink = `https://wa.me/${phoneNumber}`;
</script>