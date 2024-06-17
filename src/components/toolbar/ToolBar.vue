<template>
    <ul class="menu menu-horizontal  mt-6 w-full justify-evenly items-center h-20 bg-slate-300 ">
        <li>
            <a class="tooltip " data-tip="Menu" >
                <Menu class="size-10"/>
                <p >Menu</p>
            </a>
        </li>
        <li>
            <a class="tooltip" data-tip="Carrinho">
                <ShoppingCart class="size-10"/>
                <p>Cart</p>
            </a>
        </li>
        <li >
            <a class="tooltip" data-tip="WhatsApp">
                <img class="size-10 " :src="whatsIcon" alt="WhatsApp Icon" />
                <p>Whats</p>
            </a>
        </li>
    </ul>
</template>

<script setup>
import { Menu, ShoppingCart } from 'lucide-vue-next';
import whatsIcon from '../../assets/images/whats.svg'

</script>