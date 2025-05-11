import axios from 'axios';

const baseUrl = 'http://localhost:8080'; // TODO fix this for docker

export async function getAllBooks() {
  const response = await axios.get(`${baseUrl}/v1/books`);
  return response.data;
}
