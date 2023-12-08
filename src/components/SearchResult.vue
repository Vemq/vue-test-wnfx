<script setup>
import { Transition, computed, watch } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import BookCard from './BookCard.vue'
import CircleSpinner from './ui/CircleSpinner.vue'
import ErrorMessage from './ui/ErrorMessage.vue'

const store = useStore()
const route = useRoute()

const displayedBooks = computed(() => store.state.displayedBooks)
const totalFound = computed(() => store.state.totalFound)
const isEndReached = computed(() => store.state.isEndReached)
const isLoading = computed(() => store.state.isLoading)
const maxResults = computed(() => store.state.maxResults)
const haveLoadingError = computed(() => store.state.haveLoadingError)

function loadMore() {
  store.dispatch('loadMore')
}

watch(
  () => route.query,
  async (newQuery, oldQuery) => {
    let { q: text, category, sorting } = newQuery

    if ((!oldQuery && displayedBooks.value.length > 0) || !text) {
      return
    }

    if (
      !['all', 'art', 'biography', 'computers', 'history', 'medical', 'poetry'].includes(category)
    ) {
      category = 'all'
    }

    if (!['relevance', 'newest'].includes(sorting)) {
      sorting = 'relevance'
    }

    store.dispatch('updateSearchQuery', { text, category, sorting })
    store.dispatch('loadBooks')
  },
  { immediate: true }
)
</script>

<template>
  <ErrorMessage v-if="haveLoadingError" />
  <div v-else class="search-results">
    <p v-if="totalFound !== null">{{ `Found ${totalFound} results` }}</p>

    <Transition>
      <div v-if="displayedBooks.length > 0">
        <div class="found-books">
          <BookCard
            v-for="book in displayedBooks"
            :id="book.id"
            :cover-link="book.volumeInfo?.imageLinks?.thumbnail"
            :category="book.volumeInfo?.categories?.[0]"
            :title="book.volumeInfo?.title"
            :authors="book.volumeInfo?.authors?.join(', ')"
          />
        </div>

        <button
          v-if="!isEndReached && totalFound > maxResults"
          class="load-more-button"
          @click="loadMore"
        >
          +Load more
        </button>
        <div v-if="isEndReached" class="reach-end-message">Reached the end of results</div>
      </div>
    </Transition>

    <Transition><CircleSpinner v-if="isLoading" /></Transition>
  </div>
</template>

<style scoped lang="scss">
.search-results {
  margin-bottom: 60px;
}
.found-books {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 15px;
}
.load-more-button {
  width: 400px;
  height: 30px;
  margin: 2em 0;
  font-size: large;
  color: LightSlateGray;
  background: var(--background);
  border: 2px solid LightSteelBlue;
  border-radius: 5px;
  cursor: pointer;
  transition: border color 0.1s;
}
.load-more-button:hover {
  border: 2px solid SteelBlue;
  color: SteelBlue;
  transition: 0.1s;
}
.load-more-button:active {
  transform: translateY(2px);
  transition: 0.1s;
}
.reach-end-message {
  margin: 2em 0;
  font-size: large;
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
