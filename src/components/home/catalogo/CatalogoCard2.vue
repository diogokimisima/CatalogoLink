<!-- ProductCard.vue -->
<template>
  <ul
    class="carousel carousel-center card card-compact flex-row bg-neutral-200 rounded-box max-w-[380px] space-x-4 mx-auto p-4 h-80"
  >
      <li class="carousel-item flex flex-col">
        <figure class="rounded-box w-72">
          <img :src="item.imagem" class="object-cover" />
        </figure>
        <div class="card-body flex-row items-center gap-12">
          <div class="flex flex-col flex-grow">
            <h2 class="card-title font-semibold text-lg whitespace-nowrap">
              {{ item.title }}
            </h2>
            <h3 class="card-title font-normal text-base">{{ item.id_produto }}</h3>
          </div>

          <div class="flex flex-col">
            <h3
              class="text-base text-gray-400 whitespace-nowrap"
              v-if="item.valor_antigo"
            >
              <span class="line-through mr-2">
                R${{ formatPrice(item.valor_antigo) }}
              </span>
              <span class="text-emerald-600">
                {{ formatPercentage(item.valor_antigo, item.valor) }}% off
              </span>
            </h3>
            <h4 class="card-title whitespace-nowrap">R$ {{ formatPrice(item.valor) }}</h4>
          </div>
        </div>
      </li>
      <li class="carousel-item flex flex-col">
        <figure class="rounded-box w-72">
          <img src="../../../assets/images/tenis1-amarelo.jpg" class="object-cover" />
        </figure>
        <div class="card-body flex-row items-center gap-12">
          <div class="flex flex-col flex-grow">
            <h2 class="card-title font-semibold text-lg whitespace-nowrap">
              {{ item.title }}
            </h2>
            <h3 class="card-title font-normal text-base">{{ item.id_produto }}</h3>
          </div>

          <div class="flex flex-col">
            <h3
              class="text-base text-gray-400 whitespace-nowrap"
              v-if="item.valor_antigo"
            >
              <span class="line-through mr-2">
                R${{ formatPrice(item.valor_antigo) }}
              </span>
              <span class="text-emerald-600">
                {{ formatPercentage(item.valor_antigo, item.valor) }}% off
              </span>
            </h3>
            <h4 class="card-title whitespace-nowrap">R$ {{ formatPrice(item.valor) }}</h4>
          </div>
        </div>
      </li>
      <li class="carousel-item flex flex-col">
        <figure class="rounded-box w-72">
          <img src="../../../assets/images/tenis1-amarelo.jpg" class="object-cover" />
        </figure>
        <div class="card-body flex-row items-center gap-12">
          <div class="flex flex-col flex-grow">
            <h2 class="card-title font-semibold text-lg whitespace-nowrap">
              {{ item.title }}
            </h2>
            <h3 class="card-title font-normal text-base">{{ item.id_produto }}</h3>
          </div>

          <div class="flex flex-col">
            <h3
              class="text-base text-gray-400 whitespace-nowrap"
              v-if="item.valor_antigo"
            >
              <span class="line-through mr-2">
                R${{ formatPrice(item.valor_antigo) }}
              </span>
              <span class="text-emerald-600">
                {{ formatPercentage(item.valor_antigo, item.valor) }}% off
              </span>
            </h3>
            <h4 class="card-title whitespace-nowrap">R$ {{ formatPrice(item.valor) }}</h4>
          </div>
        </div>
      </li>
  </ul>
</template>

<script setup>
import { formatPrice, formatPercentage } from "../../../utils/formatarValores.js";

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
  isLastCard: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["showModal"]);

const showModal = (item) => {
  emit("showModal", item);
};
</script>
