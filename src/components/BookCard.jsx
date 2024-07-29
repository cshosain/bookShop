/* eslint-disable react/prop-types */
import { useContext } from "react";
import style from "./Nav.module.css";
import { booksContext } from "./Context";
const BookCard = ({ book, setIsPopup }) => {
  const {
    booksObject,
    setBooksObject,
    // setSearchHistoryArray,
    deletedBooksId,
    setDelatedBooksId,
    setEditBookInfo,
    editMode,
    setEditMode,
  } = useContext(booksContext);

  function deleteBook(bookIdToBeDelete) {
    console.log(bookIdToBeDelete);
    const newBooks = booksObject.filter((item) => item.id != bookIdToBeDelete);
    setBooksObject(newBooks);
    console.log(deletedBooksId);
    setDelatedBooksId([...deletedBooksId, bookIdToBeDelete]);
    // setSearchHistoryArray([newBooks, ...booksObject]);
  }
  function editBook() {
    setEditMode(true);
    setIsPopup(true);
    setEditBookInfo({
      id: book.id,
      name: book.name,
      coverImg: book.coverImg,
      author: book.author,
      published_year: book.published_year,
      price: book.price,
      rating: book.rating,
      favourite: book.favourite,
    });
  }
  return (
    <div className={style.bookCard}>
      <div style={{ height: "172px" }}>
        <img src={book.coverImg} alt={book.name} />
      </div>
      <div className={style.bookInfo}>
        <h3>{book.name}</h3>
        <p>by {book.author}</p>
        <p>Published: {book.published_year}</p>
        <p>Price: ${book.price.toFixed(2)}</p>
        <p>Rating: {book.rating} stars</p>
        {book.favourite && <p className={style.favouriteTag}>Favourite</p>}
        <button onClick={() => deleteBook(book.id)}>Del</button>
        <button disabled={editMode} onClick={editBook}>
          Edit
        </button>
      </div>
    </div>
  );
};
export default BookCard;
