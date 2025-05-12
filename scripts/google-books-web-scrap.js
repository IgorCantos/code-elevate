import axios from "axios";
import fs from "fs";

const API_URL = "https://www.googleapis.com/books/v1/volumes";
const maxBooksPerPage = 40;
const maxBooksToSearchPerGenre = 100;

const genresToSearch = [
  "Fiction",
  "History",
  "Science",
  "Self-Help",
  "Art",
  "Philosophy",
  "Biography",
  "Education",
  "Health",
  "Technology",
];

async function fetchBooks(genre, startIndex) {
  const params = {
    q: `subject:${genre}`,
    startIndex: startIndex,
    maxResults: maxBooksPerPage,
    printType: "books",
    langRestrict: "pt",
  };

  try {
    const res = await axios.get(API_URL, { params });
    return res.data.items || [];
  } catch (err) {
    console.error(
      `Erro ao buscar livros com genero "${genre}" [${startIndex}]:`,
      err.message
    );
    return [];
  }
}

function parseBookData(item, genre) {
  const volume = item.volumeInfo || {};
  const saleInfo = item.saleInfo || {};

  return {
    title: volume.title || "",
    author: (volume.authors || []).join(", "),
    publishedDate: volume.publishedDate || "",
    description: volume.description || "",
    genre: genre,
    categorie: (volume.categories || []).join(", "),
    thumbnail: volume.imageLinks?.thumbnail || "",
    pageCount: volume.pageCount || "",
    averageRating: volume.averageRating || "",
    amount: saleInfo.listPrice?.amount || "",
    currencyCode: saleInfo.listPrice?.currencyCode || "",
  };
}

async function start() {
  const allBooks = [];

  for (const genre of genresToSearch) {
    console.log(`Buscando livros no Google Books do genero: ${genre}`);

    for (let i = 0; i < maxBooksToSearchPerGenre; i += maxBooksPerPage) {
      console.log(`Página ${i + 1} a ${i + maxBooksPerPage}`);

      const response = await fetchBooks(genre, i);

      const parsedBook = response.map((book) => parseBookData(book, genre));

      allBooks.push(...parsedBook);

      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }

  const jsonFilePath = "books.json";
  fs.writeFileSync(jsonFilePath, JSON.stringify(allBooks, null, 2));

  console.log(`Sucesso! ${allBooks.length} livros encontrados.`);
}

start();
