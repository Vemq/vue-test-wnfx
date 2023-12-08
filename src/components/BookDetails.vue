<script setup>
import { computed, watchEffect } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import CircleSpinner from './ui/CircleSpinner.vue'
import ErrorMessage from './ui/ErrorMessage.vue'

const store = useStore()
const route = useRoute()

const isLoading = computed(() => store.state.isLoading)
const haveLoadingError = computed(() => store.state.haveLoadingError)
const bookInfo = computed(() => store.state.singleBookData)

watchEffect(() => {
  const bookId = route.params.bookId
  if (bookId) {
    store.dispatch('loadSingleBook', bookId)
  }
})
</script>

<template>
  <Transition>
    <ErrorMessage v-if="haveLoadingError" />

    <div v-else>
      <div v-if="isLoading" class="loader">
        <CircleSpinner />
      </div>

      <div v-else class="book-details">
        <div class="book-cover">
          <img v-if="bookInfo.coverLink" :src="bookInfo.coverLink" alt="book cover" class="image" />
        </div>

        <div class="book-info">
          <p v-if="bookInfo.categories" class="categories">{{ bookInfo.categories }}</p>
          <h2 v-if="bookInfo.title" class="title">{{ bookInfo.title }}</h2>
          <p v-if="bookInfo.authors" class="authors">{{ bookInfo.authors }}</p>
          <div v-if="bookInfo.description" class="description" v-html="bookInfo.description"></div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped lang="scss">
.book-details {
  display: flex;
}
.loader {
  position: absolute;
  margin-top: 50px;
  left: 50%;
}
.book-cover {
  background: whitesmoke;
  width: 400px;
  min-height: 500px;
  .image {
    margin-top: 4em;
    box-shadow: 5px 10px 20px gray;
  }
}
.book-info {
  width: 60%;
  padding: 2em;
  text-align: left;
}
.categories {
  color: var(--text-muted);
}
.title {
  font-weight: 600;
}
.authors {
  text-decoration: underline;
  color: var(--text-muted);
  margin-bottom: 10px;
}
.description {
  padding: 1em;
  border: 1px solid Gainsboro;
}
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}
.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
