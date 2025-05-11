import axios from 'axios';

const baseUrl = 'http://localhost:8080'; // TODO fix this for docker

export async function getAllBooks() {
  const response = await axios.get(`${baseUrl}/v1/books`);
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
