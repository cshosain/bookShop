/* eslint-disable react-hooks/exhaustive-deps */
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import BookList from "./BookList.jsx";
import SearchBar from "./SearchBar.jsx";
import SearchElement from "./SearchElement.jsx";
import styles from "../styles_modules/Nav.module.css"; // Import using CSS Modules
// import books from "./data";
import Popup from "./Popup.jsx";
import { useState, useEffect, useContext } from "react";
import { booksContext } from "../contexts/Context.jsx";
import DelConformation from "./DelConformation.jsx";
import Pagination from "./Pagination.jsx";
import axios from "axios";
import Loading from "./Loading.jsx";
const Nav = () => {
  const {
    booksObject,
    setBooksObject,
    confirmDel,
    selectedOption,
    setSelectedOption,
    performSorting,
  } = useContext(booksContext);
  console.log(confirmDel);
  const options = ["Price", "Relase Year", "Author"];
  const [isPopup, setIsPopup] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(3); //for future dynamically show number of books
  const [loading, setLoading] = useState(true);
  //create a new useeffect with empty array as dependency for default get operaion when this component rendered
  //and set booksObject
  useEffect(() => {
    setLoading(true);
    axios
      .get("https://book-shop-backend-sooty.vercel.app/api/v1/books")
      .then((res) => {
        setLoading(false);
        setBooksObject(res.data.data.books);
        console.log(res.data.data.books);
        console.log(res.data.message);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  }, []);

  useEffect(() => {
    performSorting();
  }, [selectedOption]);

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = booksObject.slice(firstPostIndex, lastPostIndex);

  const handleChange_combo = (event) => {
    setSelectedOption(event.value);
  };

  return (
    <>
      <nav className={styles.navs}>
        <div className={styles.searchArea}>
          <SearchBar />
          {!isPopup && (
            <div>
              <button
                onClick={() => {
                  setIsPopup(true);
                }}
                className="bg-green-500 rounded-md p-2 font-semibold hover:bg-yellow-400"
              >
                Add a Book
              </button>
            </div>
          )}
        </div>
        <div>
          <Dropdown
            options={options}
            onChange={handleChange_combo}
            //value={selectedOption}
            placeholder={selectedOption}
          />
        </div>
      </nav>
      {isPopup && (
        <Popup
          setIsPopup={setIsPopup}
          performSorting={performSorting}
          selectedOption={selectedOption}
        />
      )}
      {confirmDel.presence && <DelConformation />}
      <SearchElement />
      {loading && <Loading />}
      <BookList setIsPopup={setIsPopup} books={currentPosts} />
      {booksObject.length != 0 ? (
        <Pagination
          totalPosts={booksObject.length}
          postsPerPage={postsPerPage}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      ) : (
        <h1>No book found!</h1>
      )}
    </>
  );
};

export default Nav;
