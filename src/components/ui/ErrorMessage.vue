<script setup>
defineProps({
  message: String
})
</script>

<template>
  <div class="error-message">
    <h2>An error occurred</h2>
    <p v-if="message">Error: {{ message }}</p>
    <p>Try refreshing the page or enter a different query</p>
  </div>
</template>

<style scoped lang="scss">
.error-message {
  margin: 50px auto;
}
</style>
