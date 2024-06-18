<template>
    <div class="w-full h-20 ">
        <ul class="menu menu-horizontal bg-slate-300 mt-6 w-full justify-evenly items-center h-14  ">
            <li class="">
                <a class="tooltip " data-tip="Menu">
                    <Menu class="size-8" />
                    <p>Menu</p>
                </a>
            </li>
            <li>
                <a class="tooltip" data-tip="Carrinho">
                    <ShoppingCart class="size-8" />
                    <p>Cart</p>
                </a>
            </li>
            <li>
                <a class="tooltip" data-tip="WhatsApp">
                    <img class="size-8 " :src="whatsIcon" alt="WhatsApp Icon" />
                    <p>Whats</p>
                </a>
            </li>

        </ul>
        <div class="bg-slate-800 flex justify-center items-center h-8">
            <img class="size-28 object-contain" :src="LogoTrovata" alt="logo trovata">
        </div>
    </div>

</template>

<script setup>
import { Menu, ShoppingCart } from 'lucide-vue-next';
import whatsIcon from '../../assets/images/whats.svg'
import LogoTrovata from '../../assets/images/logo.png'

</script>