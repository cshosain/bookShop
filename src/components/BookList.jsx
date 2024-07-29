/* eslint-disable react/prop-types */
import BookCard from "./BookCard";
import style from "./Nav.module.css";
const BookList = ({ books, setIsPopup }) => {
  return (
    <div className={style.bookGrid}>
      {books.map((book) => (
        <BookCard setIsPopup={setIsPopup} key={book.id} book={book} />
      ))}
    </div>
  );
};
export default BookList;
