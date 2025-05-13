<template>
  <div class="about">
    <h1>This is an about page</h1>
    <div>
      <button @click="increment">clicker</button>
    </div>
    <p>{{ count }}</p>
  </div>
</template>
<script setup>
import { ref } from 'vue'

const count = ref(0)

const increment = ()=> {
  count.value++
}
</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
