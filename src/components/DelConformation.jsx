import { useContext } from "react";
import { booksContext } from "../contexts/Context";
import styles from "../styles_modules/Nav.module.css";
import axios from "axios";
export default function DelConformation() {
  const {
    booksObject,
    setBooksObject,
    deletedBooksId,
    setDelatedBooksId,
    confirmDel,
    setConfirmDel,
  } = useContext(booksContext);

  function deleteBook(bookIdToBeDelete) {
    //just delete operation with the book id. this delete the book from the database there is no need of taking record of deleted books or books id
    console.log("Deletion starting");

    axios
      .delete(
        `https://book-shop-backend-sooty.vercel.app/api/v1/books/` +
          bookIdToBeDelete
      )
      .then((res) => {
        console.log(res.data);
        console.log(res.data.message);
        //extra section for instant remove from dom
        const newBooks = booksObject.filter(
          (item) => item._id != bookIdToBeDelete
        );
        setBooksObject(newBooks);
        console.log(deletedBooksId);
        setDelatedBooksId([...deletedBooksId, bookIdToBeDelete]);
      })
      .catch((error) => console.log(error));

    setConfirmDel({ ...confirmDel, presence: false });
  }
  return (
    <div className={styles.confirmDeletion}>
      <h2 className="text-xl">Confirm deletion?</h2>
      <div>
        <button
          className="button-1 makeRedBg"
          role="button"
          onClick={() => deleteBook(confirmDel.bookId)}
        >
          Yes
        </button>
        <button
          className="button-1"
          role="button"
          onClick={() => setConfirmDel({ ...confirmDel, presence: false })}
        >
          No
        </button>
      </div>
    </div>
  );
}
