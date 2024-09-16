/* eslint-disable react/prop-types */
import BookCard from "./BookCard";
import style from "../styles_modules/Nav.module.css";
const BookList = ({ books, setIsPopup }) => {
  console.log(books);
  return (
    <div className={style.bookGrid}>
      {books.map((book) => (
        <BookCard setIsPopup={setIsPopup} key={book._id} book={book} />
      ))}
    </div>
  );
};
export default BookList;
