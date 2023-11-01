<script setup lang="ts">
import Header from '@/components/HeaderComponent.vue'
import GuitarCard from '@/components/GuitarCard.vue'
import Footer from '@/components/FooterComponent.vue'

import { useCartStore } from '@/store/useCartStore'

const store = useCartStore()
</script>

<template>
  <Header />

  <main class="container-xl mt-5">
    <h2 class="text-center">Our Collection</h2>

    <div class="row mt-5">
      <GuitarCard v-for="guitar in store.guitars" :key="guitar.id" :guitar="guitar" />
    </div>
  </main>

  <Footer />
</template>
