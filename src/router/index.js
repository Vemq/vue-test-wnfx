import { createRouter, createWebHistory } from 'vue-router'
import SearchResult from '../components/SearchResult.vue'
import BookDetails from '../components/BookDetails.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/search'
    },
    {
      path: '/search',
      name: 'search',
      component: SearchResult
    },
    {
      path: '/book/:bookId',
      name: 'book',
      component: BookDetails
    }
  ]
})

export default router
