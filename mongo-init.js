import books from "./scripts/books.json";
/**
 * Responsible to initialize the MongoDB database with sample data.
 * This script creates a database named "books" and a collection named "books" that is used by the application.
 */
db = db.getSiblingDB("books");
db.createCollection("books");
db.books.insertMany(books);
