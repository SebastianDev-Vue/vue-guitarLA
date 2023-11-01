import { defineStore } from 'pinia'
import { ref, computed, watch, onMounted } from 'vue'
import { db } from '@/db/guitars'
import type { Guitar } from '@/interfaces'

export const useCartStore = defineStore('cart', () => {
  // state === refs
  const guitars = ref()
  const cart = ref<Guitar[]>([])
  const guitar = ref<Guitar>(db[3])

  onMounted(() => {
    guitars.value = db
    guitar.value = db[3]

    const cartStorage = localStorage.getItem('cart')

    if (cartStorage) {
      cart.value = JSON.parse(cartStorage)
    }
  })

  watch(
    cart,
    () => {
      saveCartToLocalStorage()
    },
    {
      deep: true
    }
  )

  // getters === computed
  const totalToPay = computed(() => {
    return cart.value.reduce((total, product) => total + product.quantity * product.price, 0)
  })

  // actions === functions()
  const handleAddToCart = (guitar: Guitar): void => {
    const existingGuitar = cart.value.find((product) => product.id === guitar.id)

    if (existingGuitar) {
      existingGuitar.quantity++
    } else {
      guitar.quantity = 1
      cart.value.push(guitar)
    }
  }

  const incrementCartQuantity = (id: number): void => {
    const guitarIndex = cart.value.findIndex((guitar) => guitar.id === id)

    if (cart.value[guitarIndex].quantity >= 5) return

    cart.value[guitarIndex].quantity++
  }

  const decrementCartQuantity = (id: number): void => {
    const guitarIndex = cart.value.findIndex((guitar) => guitar.id === id)

    if (cart.value[guitarIndex].quantity <= 1) return

    cart.value[guitarIndex].quantity--
  }

  const deleteProduct = (id: number): void => {
    cart.value = cart.value.filter((guitar) => guitar.id !== id)
  }

  const emptyCart = (): void => {
    cart.value = []
  }

  const saveCartToLocalStorage = () => {
    localStorage.setItem('cart', JSON.stringify(cart.value))
  }

  return {
    guitars,
    cart,
    guitar,
    totalToPay,
    handleAddToCart,
    incrementCartQuantity,
    decrementCartQuantity,
    deleteProduct,
    emptyCart
  }
})
