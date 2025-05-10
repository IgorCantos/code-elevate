class Book {
  _id: string;
  title: string;
  author: string;
  publishedDate: string;
  description: string;
  genre: string;
  categorie: string;
  thumbnail: string;
  pageCount: number;
  averageRating: number;
  amount: number;
  currencyCode: string;

  constructor({
    _id,
    title,
    author,
    publishedDate,
    description,
    genre,
    categorie,
    thumbnail,
    pageCount,
    averageRating,
    amount,
    currencyCode,
  }: Book) {
    this._id = _id;
    this.title = title;
    this.author = author;
    this.publishedDate = publishedDate;
    this.description = description;
    this.genre = genre;
    this.categorie = categorie;
    this.thumbnail = thumbnail;
    this.pageCount = pageCount;
    this.averageRating = averageRating;
    this.amount = amount;
    this.currencyCode = currencyCode;
  }
}

export { Book };
