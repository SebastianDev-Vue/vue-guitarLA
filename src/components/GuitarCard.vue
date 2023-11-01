<script setup lang="ts">
import { useCartStore } from '@/store/useCartStore'
import type { Guitar } from '@/interfaces'

const store = useCartStore()

defineProps<{ guitar: Guitar }>()
</script>

<template>
  <div class="col-md-6 col-lg-4 my-4 row align-items-center">
    <div class="col-4">
      <img
        class="img-fluid"
        :src="`/img/${guitar.image}.jpg`"
        :alt="`Iamge ${guitar.image} guitar`"
      />
    </div>
    <div class="col-8">
      <h3 class="text-black fs-4 fw-bold text-uppercase">{{ guitar.name }}</h3>
      <p>
        {{ guitar.description }}
      </p>
      <p class="fw-black text-primary fs-3">${{ guitar.price }}</p>
      <button type="button" class="btn btn-dark w-100" @click="store.handleAddToCart(guitar)">
        Agregar al Carrito
      </button>
    </div>
  </div>
</template>

<style scoped></style>
@/interfaces
