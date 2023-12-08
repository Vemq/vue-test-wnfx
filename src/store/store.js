import { createStore } from 'vuex'
import { getBooks, getSingleBook } from '../utils/getBooks.js'

const store = createStore({
  state() {
    return {
      displayedBooks: [],
      singleBookData: {
        coverLink: '',
        categories: '',
        title: '',
        authors: '',
        description: ''
      },
      totalFound: null,

      isLoading: false,
      haveLoadingError: false,

      searchQueryData: {
        text: '',
        category: 'all',
        sorting: 'relevance'
      },

      startIndex: 0,
      maxResults: 30,

      isEndReached: false
    }
  },

  getters: {
    getBooksParameters({ searchQueryData: { text, category, sorting }, startIndex, maxResults }) {
      return { text, category, sorting, startIndex, maxResults }
    }
  },

  actions: {
    async loadBooks({ commit, getters }) {
      commit('setDisplayedBooks', [])
      commit('setError', false)
      commit('setLoading', true)
      commit('setStartIndex', 0)
      commit('setEndReached', false)

      try {
        const data = await getBooks(getters.getBooksParameters)
        commit('setTotalFound', data.totalFound)
        commit('setDisplayedBooks', data.books)
        commit('setLoading', false)
      } catch (error) {
        console.log(error)
        commit('setLoading', false)
        commit('setError', true)
      }
    },

    async loadSingleBook({ commit }, id) {
      commit('setLoading', true)
      commit('setError', false)

      try {
        const bookData = await getSingleBook(id)
        commit('setSingleBookData', {
          coverLink: bookData.volumeInfo?.imageLinks?.small || '',
          categories: bookData.volumeInfo?.categories?.join(' / ') || '',
          title: bookData.volumeInfo?.title || '',
          authors: bookData.volumeInfo?.authors?.join(', ') || '',
          description: bookData.volumeInfo?.description || ''
        })
        commit('setLoading', false)
      } catch (error) {
        console.log(error)
        commit('setLoading', false)
        commit('setError', true)
      }
    },

    async loadMore({ commit, getters, state }) {
      commit('setLoading', true)
      commit('setStartIndex', state.startIndex + state.maxResults)

      try {
        const data = await getBooks(getters.getBooksParameters)
        if (data.books.length > 0) {
          commit('setDisplayedBooks', [...state.displayedBooks, ...data.books])
        } else {
          commit('setEndReached', true)
        }
        commit('setLoading', false)
      } catch (error) {
        console.log(error)
        commit('setLoading', false)
        commit('setError', true)
      }
    },

    updateSearchQuery({ commit }, searchQueryData) {
      commit('setSearchQuery', searchQueryData)
    }
  },

  mutations: {
    setDisplayedBooks(state, books) {
      state.displayedBooks = books
    },

    setSingleBookData(state, bookData) {
      state.singleBookData = bookData
    },

    setSearchQuery(state, searchQueryData) {
      state.searchQueryData = searchQueryData
    },

    setTotalFound(state, totalFound) {
      state.totalFound = totalFound
    },

    setStartIndex(state, startIndex) {
      state.startIndex = startIndex
    },

    setEndReached(state, isEndReached) {
      state.isEndReached = isEndReached
    },

    setLoading(state, isLoading) {
      state.isLoading = isLoading
    },

    setError(state, haveLoadingError) {
      state.haveLoadingError = haveLoadingError
    }
  }
})

export default store
