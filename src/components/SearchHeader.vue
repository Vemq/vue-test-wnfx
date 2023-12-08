<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import IconSearch from './ui/IconSearch.vue'

const store = useStore()
const router = useRouter()

const categories = ['all', 'art', 'biography', 'computers', 'history', 'medical', 'poetry']

const searchQueryData = computed(() => store.state.searchQueryData)

function formInputHandler(e) {
  const form = e.currentTarget
  const searchFormData = {
    text: form['text'].value,
    category: form.category.value,
    sorting: form.sorting.value
  }
  store.dispatch('updateSearchQuery', searchFormData)
}

function formSubmitHandler() {
  const searchQueryText = searchQueryData.value.text.trim().replace(/\s{2,}/g, ' ')
  store.dispatch('updateSearchQuery', { ...searchQueryData.value, text: searchQueryText })

  if (!searchQueryText) return

  router.push({
    path: '/search',
    query: {
      q: searchQueryData.value.text,
      category: searchQueryData.value.category,
      sorting: searchQueryData.value.sorting
    }
  })
}
</script>

<template>
  <div class="search-header">
    <h2 class="search-header__title">Search for books</h2>

    <form
      class="search-header__form"
      @submit.prevent="formSubmitHandler"
      @change="formInputHandler"
    >
      <div class="search">
        <input
          :value="searchQueryData.text"
          type="text"
          name="text"
          class="search-header__text-input"
        />
        <button class="button">
          <IconSearch />
        </button>
      </div>

      <div class="selects">
        <label class="select-label"
          >Categories
          <select :value="searchQueryData.category" name="category">
            <option v-for="category in categories" :key="category" :value="category">
              {{ category }}
            </option>
          </select>
        </label>

        <label class="select-label"
          >Sorting by
          <select :value="searchQueryData.sorting" name="sorting">
            <option>relevance</option>
            <option>newest</option>
          </select>
        </label>
      </div>
    </form>
  </div>
</template>

<style scoped lang="scss">
select {
  height: 26px;
}
.search-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  width: 100%;
  background-color: LightSlateGray;
  padding: 15px 0;
}
.search-header__title {
  color: var(--background);
  margin: 0;
}
.search-header__form {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  width: 50%;
}
.search {
  display: flex;
  align-items: center;
  position: relative;
  .button {
    border: none;
    background: none;
    height: 22px;
    position: absolute;
    right: 0;
    top: 3px;
    cursor: pointer;
  }
}
.search-header__text-input {
  color: var(--text-main);
  background-color: var(--background);
  border: 2px solid LightSteelBlue;
  padding-left: 5px;
  width: 400px;
  height: 20px;
}
.selects {
  display: flex;
  justify-content: center;
  gap: 15px;
  color: var(--text-secondary);
}
.select-label {
  cursor: pointer;
}
</style>
