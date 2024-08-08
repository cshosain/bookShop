import { useContext } from "react";
import { booksContext } from "../contexts/Context";
import styles from "../styles_modules/Nav.module.css";

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
    console.log("Deletion starting");
    const newBooks = booksObject.filter((item) => item.id != bookIdToBeDelete);
    setBooksObject(newBooks);
    console.log(deletedBooksId);
    setDelatedBooksId([...deletedBooksId, bookIdToBeDelete]);
    setConfirmDel({ ...confirmDel, presence: false });
  }
  return (
    <div className={`${styles.confirmDeletion} z-10`}>
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
