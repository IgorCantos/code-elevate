class Book {
  _id: string;
  title: string;
  authors: string;
  publishedDate: string;
  description: string;
  genre: string;
  categories: string;
  thumbnail: string;
  pageCount: number;
  averageRating: number;
  amount: number;
  currencyCode: string;

  constructor({
    _id,
    title,
    authors,
    publishedDate,
    description,
    genre,
    categories,
    thumbnail,
    pageCount,
    averageRating,
    amount,
    currencyCode,
  }: Book) {
    this._id = _id;
    this.title = title;
    this.authors = authors;
    this.publishedDate = publishedDate;
    this.description = description;
    this.genre = genre;
    this.categories = categories;
    this.thumbnail = thumbnail;
    this.pageCount = pageCount;
    this.averageRating = averageRating;
    this.amount = amount;
    this.currencyCode = currencyCode;
  }
}

export { Book };
