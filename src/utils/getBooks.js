const API_KEY = 'AIzaSyBgGo7VGapyA8djNo-BSq9n7gKIAM3sjcY'

export async function getBooks({ text, category, sorting, startIndex, maxResults }) {
  const queryUrl = `https://www.googleapis.com/books/v1/volumes?q=${text}${
    category !== 'all' ? `+subject:${category}` : ''
  }&orderBy=${sorting}&startIndex=${startIndex}&maxResults=${maxResults}&key=${API_KEY}`

  const response = await fetch(queryUrl)
  if (!response.ok) {
    throw new Error('Data load error')
  }
  const data = await response.json()

  return {
    books: data?.items || [],
    totalFound: data.totalItems
  }
}

export async function getSingleBook(id) {
  const queryUrl = `https://www.googleapis.com/books/v1/volumes/${id}?key=${API_KEY}`

  const response = await fetch(queryUrl)
  if (!response.ok) {
    throw new Error('Book load error')
  }
  const data = await response.json()
  return data
}
