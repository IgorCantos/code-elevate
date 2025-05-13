import axios from 'axios';

const baseUrl = 'http://localhost:8080'; // TODO fix this for docker

export async function getAllBooks(page, itemsPerPage) {
  const response = await axios.get(`${baseUrl}/v1/books?page=${page}&limit=${itemsPerPage}`, {
    headers: {
      page,
      limit: itemsPerPage,
    },
  });
  return response.data;
}

export async function getRecentlyViewedBooks() {
  const mockedUserId = '123';
  const response = await axios.get(`${baseUrl}/v1/users/${mockedUserId}/recently-viewed`);
  return response.data;
}

export async function postRecentlyViewedBook(book) {
  const mockedUserId = '123';
  const response = await axios.post(`${baseUrl}/v1/users/${mockedUserId}/recently-viewed`, book);
  return response.data;
}

export async function getBooksByAuthor(page, itemsPerPage, author) {
  const response = await axios.get(
    `${baseUrl}/v1/books/author/${author}?page=${page}&limit=${itemsPerPage}`,
    {
      headers: {
        page,
        limit: itemsPerPage,
      },
    }
  );
  return response.data;
}

export async function getBooksByGenre(page, itemsPerPage, genre) {
  const response = await axios.get(
    `${baseUrl}/v1/books/genre/${genre}?page=${page}&limit=${itemsPerPage}`,
    {
      headers: {
        page,
        limit: itemsPerPage,
      },
    }
  );
  return response.data;
}
