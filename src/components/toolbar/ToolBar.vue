<template>
    <div class="w-full h-20">
        <div class="menu menu-horizontal bg-slate-300 w-full justify-evenly items-center py-0.5 ">
            <div class="flex justify-center flex-col">
                <a class="tooltip " data-tip="Menu">
                    <Menu class="size-7" />
                    <p>Menu</p>
                </a>
            </div>
            <div>
                <a class="tooltip" data-tip="Carrinho">
                    <ShoppingCart class="size-7" />
                    <p>Cart</p>
                </a>
            </div>
            <div>
                <a class="tooltip" data-tip="WhatsApp">
                    <img class="size-7 " :src="whatsIcon" alt="WhatsApp Icon" />
                    <p>Whats</p>
                </a>
            </div>
        </div>

        <div class="bg-slate-800 flex justify-center items-center h-8">
            <img class="size-32 object-contain" :src="LogoTrovata" alt="logo trovata">
        </div>
    </div>

</template>

<script setup>
import { Menu, ShoppingCart } from 'lucide-vue-next';
import whatsIcon from '../../assets/images/whats.svg'
import LogoTrovata from '../../assets/images/logo.png'

</script>