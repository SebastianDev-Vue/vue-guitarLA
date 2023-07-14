<script setup lang="ts">
import { ref, onMounted, watch } from "vue"

import { db } from "./data/guitars"

import HeaderComponent from "./components/HeaderComponent.vue"
import GuitarCard from "./components/GuitarCard.vue"
import FooterComponent from "./components/FooterComponent.vue"

import { Guitar } from "./interfaces/interfaces"

const guitars = ref<Guitar[]>([])
const cart = ref<Guitar[]>([])
const guitar = ref<Guitar>(db[3])

watch(
  cart,
  () => {
    saveLocalStorage()
  },
  { deep: true }
)

onMounted(() => {
  guitar.value = db[3]
  guitars.value = db

  const cartStorage = localStorage.getItem("cart")

  if (cartStorage) {
    cart.value = JSON.parse(cartStorage)
  }
})

const saveLocalStorage = () => {
  localStorage.setItem("cart", JSON.stringify(cart.value))
}

const addToCart = (guitar: Guitar) => {
  const guitarExists = cart.value.findIndex(
    (product) => product.id === guitar.id
  )

  if (guitarExists >= 0) {
    cart.value[guitarExists].quantity++
  } else {
    guitar.quantity = 1
    cart.value?.push(guitar)
  }
}

const incrementQuantity = (id: number) => {
  const guitarIndex = cart.value.findIndex((guitar) => guitar.id === id)

  if (cart.value[guitarIndex].quantity >= 5) return

  cart.value[guitarIndex].quantity++
}

const decrementQuantity = (id: number) => {
  const guitarIndex = cart.value.findIndex((guitar) => guitar.id === id)

  if (cart.value[guitarIndex].quantity <= 1) return

  cart.value[guitarIndex].quantity--
}

const deleteProduct = (id: number) => {
  cart.value = cart.value.filter((guitar) => guitar.id !== id)
}

const emptyCart = () => {
  cart.value = []
}
</script>

<template>
  <HeaderComponent
    :cart="cart"
    :guitar="guitar"
    @increment-quantity="incrementQuantity"
    @decrement-quantity="decrementQuantity"
    @add-to-cart="addToCart"
    @delete-product="deleteProduct"
    @empty-cart="emptyCart"
  />

  <main class="container-xl mt-5">
    <h2 class="text-center">Our Colection</h2>

    <div class="row mt-5">
      <GuitarCard
        v-for="guitar in guitars"
        :key="guitar.id"
        :guitar="guitar"
        @add-to-cart="addToCart"
      />
    </div>
  </main>

  <FooterComponent />
</template>

<style scoped></style>
