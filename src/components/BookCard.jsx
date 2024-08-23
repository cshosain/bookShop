/* eslint-disable react/prop-types */
import { useContext } from "react";
import style from "../styles_modules/Nav.module.css";
import { booksContext } from "../contexts/Context";
const BookCard = ({ book, setIsPopup }) => {
  const { setEditBookInfo, editMode, setEditMode, confirmDel, setConfirmDel } =
    useContext(booksContext);
  function editBook() {
    setEditMode(true);
    setIsPopup(true);
    setEditBookInfo({
      id: book._id,
      name: book.name,
      coverImg: book.coverImg,
      author: book.author,
      published_year: book.published_year,
      price: book.price,
      rating: book.rating,
      favourite: book.isFavorite,
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
        {book.isFavorite && <p className={style.favouriteTag}>Favourite</p>}
        <button
          className="button-1 makeRedBg"
          onClick={() => {
            console.log("clicked in del");
            setConfirmDel({
              ...confirmDel,
              presence: true,
              bookId: book._id,
            });
          }}
        >
          Del
        </button>
        <button className="button-1" disabled={editMode} onClick={editBook}>
          Edit
        </button>
      </div>
    </div>
  );
};
export default BookCard;
