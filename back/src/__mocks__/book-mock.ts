import { Book } from "@/domain/entities";
import { faker } from "@faker-js/faker";

const makeBookDataMock = () => ({
  _id: "1",
  title: "Test Book",
  author: faker.person.fullName(),
  publishedDate: faker.date.past({ years: 20 }).toISOString().split("T")[0],
  description: "A test book description",
  genre: faker.commerce.department(),
  categorie: "Novel",
  thumbnail: faker.image.urlPicsumPhotos({ width: 200, height: 300 }),
  pageCount: 300,
  averageRating: 4.5,
  amount: faker.number.float({ min: 10, max: 200 }),
  currencyCode: "BRL",
});

const makeBookMock = () => new Book(makeBookDataMock());

export { makeBookDataMock, makeBookMock };
