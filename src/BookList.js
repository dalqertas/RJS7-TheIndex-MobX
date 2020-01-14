import React from "react";
import { observer } from "mobx-react";

// Components
import Loading from "./Loading";
import SearchBar from "./SearchBar";
import BookTable from "./BookTable";
import BookStore from "./stores/BookStore";

function BookList(props) {
  

  const bookColor = props.match.params.bookColor;
  let books = BookStore.filteredBooks;

  if (bookColor) {
    books=BookStore.filterBooksByColor(bookColor);

  }


  return BookStore.loading ? (
    <Loading />
  ) : (
    <div>
      <h3>Books</h3>
      <SearchBar store={BookStore} />
      <BookTable books={books} />
    </div>
  );
}

export default observer(BookList);
