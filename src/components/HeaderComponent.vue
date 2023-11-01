<script setup lang="ts">
import { useCartStore } from '@/store/useCartStore'

const store = useCartStore()
</script>

<template>
  <header class="py-5 header">
    <div class="container-xl">
      <div class="row justify-content-center justify-content-md-between">
        <div class="col-8 col-md-3">
          <a href="index.html">
            <img class="img-fluid" src="/img/logo.svg" alt="imagen logo" />
          </a>
        </div>
        <nav class="col-md-6 a mt-5 d-flex align-items-start justify-content-end">
          <div class="carrito">
            <img class="img-fluid" src="/img/carrito.png" alt="imagen carrito" />

            <div id="carrito" class="bg-white p-3">
              <p v-if="store.cart.length === 0" class="text-center m-0">El carrito esta vacio</p>

              <template v-else>
                <table class="w-100 table">
                  <thead>
                    <tr>
                      <th>Imagen</th>
                      <th>Nombre</th>
                      <th>Precio</th>
                      <th>Cantidad</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="guitar in store.cart" :key="guitar.id">
                      <td>
                        <img
                          class="img-fluid"
                          :src="`/img/${guitar.image}.jpg`"
                          :alt="`${guitar.name} guitarimage`"
                        />
                      </td>
                      <td>{{ guitar.name }}</td>
                      <td class="fw-bold">${{ guitar.price }}</td>
                      <td class="flex align-items-start gap-4">
                        <button
                          type="button"
                          class="btn btn-dark"
                          @click="store.decrementCartQuantity(guitar.id)"
                        >
                          -
                        </button>
                        {{ guitar.quantity }}
                        <button
                          type="button"
                          class="btn btn-dark"
                          @click="store.incrementCartQuantity(guitar.id)"
                        >
                          +
                        </button>
                      </td>
                      <td>
                        <button
                          class="btn btn-danger"
                          type="button"
                          @click="store.deleteProduct(guitar.id)"
                        >
                          X
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>

                <p class="text-end">
                  Total pagar: <span class="fw-bold">${{ store.totalToPay }}</span>
                </p>
                <button class="btn btn-dark w-100 mt-3 p-2" @click="store.emptyCart">
                  Vaciar Carrito
                </button>
              </template>
            </div>
          </div>
        </nav>
      </div>
      <!--.row-->

      <div class="row mt-5">
        <div class="col-md-6 text-center text-md-start pt-5">
          <h1 class="display-2 fw-bold">{{ store.guitar.name }}</h1>
          <p class="mt-5 fs-5 text-white">
            {{ store.guitar.description }}
          </p>
          <p class="text-primary fs-1 fw-black">${{ store.guitar.price }}</p>
          <button
            type="button"
            class="btn fs-4 bg-primary text-white py-2 px-5"
            @click="store.handleAddToCart(store.guitar)"
          >
            Agregar al Carrito
          </button>
        </div>
      </div>
    </div>

    <img class="header-guitarra" src="/img/header_guitarra.png" alt="imagen header" />
  </header>
</template>

<style scoped></style>
