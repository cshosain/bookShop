/* eslint-disable react/prop-types */
import style from "./Nav.module.css";
const BookCard = ({ book }) => {
  return (
    <div className={style.bookCard}>
      <img src={book.coverImg} alt={book.name} />
      <div className={style.bookInfo}>
        <h3>{book.name}</h3>
        <p>by {book.author}</p>
        <p>Published: {book.published_year}</p>
        <p>Price: ${book.price.toFixed(2)}</p>
        <p>Rating: {book.rating} stars</p>
        {book.favourite && <p>Favourite</p>}
      </div>
    </div>
  );
};
export default BookCard;
