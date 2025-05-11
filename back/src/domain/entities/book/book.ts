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

  validate() {
    if (!this._id) {
      throw new Error("ID is required");
    }
    if (!this.title) {
      throw new Error("Title is required");
    }
    if (!this.authors) {
      throw new Error("Authors are required");
    }
    if (!this.publishedDate) {
      throw new Error("Published date is required");
    }
    if (!this.description) {
      throw new Error("Description is required");
    }
    if (!this.genre) {
      throw new Error("Genre is required");
    }
    if (!this.categories) {
      throw new Error("Categories are required");
    }
    if (!this.thumbnail) {
      throw new Error("Thumbnail is required");
    }
    if (this.pageCount <= 0) {
      throw new Error("Page count must be greater than 0");
    }
    if (this.averageRating < 0 || this.averageRating > 5) {
      throw new Error("Average rating must be between 0 and 5");
    }
    if (this.amount <= 0) {
      throw new Error("Amount must be greater than 0");
    }
  }
}

export { Book };
