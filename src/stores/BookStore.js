import { decorate, observable, computed } from "mobx";
import axios from "axios";

const instance = axios.create({
  baseURL: "https://the-index-api.herokuapp.com"
});
class BookStore {
  books = [];
  loading = true;
  query = "";

  fetchBooks = async () => {
    try {
      const res = await instance.get(
        "https://the-index-api.herokuapp.com/api/books/"
      );
      const books = res.data;
      this.books = books;
      this.loading = false;
    } catch (err) {
      console.error(err);
    }
  };
  filterBooksByColor = bookColor => {
    return this.books.filter(book => book.color === bookColor);
  };
  get filteredBooks() {
    return this.books.filter(book => book.title.toLowerCase().includes(this.query));
  }
  filterBooksByAuthor = authorId => {
      return this.books.filter(book => {
    return book.authors.some(author => author.id === authorId)
})}
}

decorate(BookStore, {
  books: observable,
  loading: observable,
  query: observable,
  filteredBooks: computed
});
const bookStore = new BookStore();
bookStore.fetchBooks();
export default bookStore;
