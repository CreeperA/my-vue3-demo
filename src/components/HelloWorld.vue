<template>
  <h1>Vue3真好玩</h1>
  <p>{{ msg }}</p>
  <p>{{ count }}</p>
  <button @click="increment">
    +
  </button>
</template>

<!--组合式 API 语法糖 script setup-->

<script lang="ts" setup>
import { ref, defineProps } from 'vue'

defineProps({
  msg: {
    type: String,
    default: ''
  }
})
const count = ref(100)
const increment = () => {
  count.value++
}
</script>
