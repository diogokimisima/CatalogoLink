<template>


    <div>
        <p>Nome do Produto: {{ $route.query.nomeProduto }}</p>
        <p>Valor Total: R$ {{ $route.query.valorTotal }}</p>
        
        <router-link to="/" class="text-blue-600 mt-5 text-3xl">
            voltar
        </router-link>

    </div>
</template>

<script setup>
</script>