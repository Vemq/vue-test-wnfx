<script setup>
defineProps({
  id: String,
  coverLink: String,
  category: String,
  title: String,
  authors: String
})
</script>

<template>
  <div class="book-card">
    <div class="book-cover">
      <router-link :to="`/book/${id}`">
        <img v-if="coverLink" :src="coverLink" alt="book cover" class="image" />
      </router-link>
    </div>

    <span v-if="category" class="category">{{ category }}</span>
    <router-link :to="`/book/${id}`"
      ><span v-if="title" class="title">{{ title }}</span></router-link
    >
    <span v-if="authors" class="authors">{{ authors }}</span>
  </div>
</template>

<style scoped lang="scss">
.book-card {
  display: flex;
  flex-direction: column;
  width: 195px;
  padding: 2em 1.5em;
  background-color: #d6e2ef;
  text-align: left;
}
.book-cover {
  min-height: 220px;
  align-self: center;
  .image {
    box-shadow: 5px 10px 20px gray;
  }
}
.title {
  font-weight: 600;
}
.category {
  text-decoration: underline;
  color: var(--text-muted);
  margin-bottom: 10px;
}
.authors {
  color: var(--text-muted);
}
</style>
