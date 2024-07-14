import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import BookList from "./BookList.jsx";
import styles from "./Nav.module.css"; // Import using CSS Modules
// import books from "./data";
import Popup from "./Popup.jsx";
import { useState, useEffect, useContext } from "react";
import { booksContext } from "./Context";
const Nav = () => {
  const {
    booksObject,
    handleAddBook,
    setBooksObject,
    searchHistoryArray,
    setSearchHistoryArray,
  } = useContext(booksContext);
  const options = ["Price", "Relase Year", "Author"];
  const [selectedOption, setSelectedOption] = useState(["Select an option"]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isPopup, setIsPopup] = useState(false);

  useEffect(() => {
    if (searchTerm) {
      console.log("perform filtering under useeffect");
      performFiltering();
    }
    // console.log("searchHistoryArray: ", searchHistoryArray);
    else {
      if (searchHistoryArray.length > 0) {
        setBooksObject(searchHistoryArray[0]); //no change
        performSorting(searchHistoryArray[0]);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm]);

  useEffect(() => {
    console.log("use effect of ferform sorting");
    performSorting();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedOption]);

  //useEffeect (for filtering) must required because the filtering task need performed after the searchTerm upgradation by setSearchTerm()
  const handleChange = (event) => {
    setSearchTerm(event.target.value);
    //performFiltering(); here can not do work because right now the searchTerm does not become empty
    //instead it will start working with taking immediate previous value of searchTerm
    //because state update is asynchronous
  };

  function performSorting(optionalNewBook = booksObject) {
    if (selectedOption !== "Select an option") {
      const sortedBooks = optionalNewBook.slice().sort((a, b) => {
        switch (selectedOption) {
          case "Price":
            return a.price - b.price;
          case "Relase Year":
            return a.published_year - b.published_year;
          case "Author":
            // Assuming author is a string, sort alphabetically
            return a.author.localeCompare(b.author);
          default:
            return 0; // No change
        }
      });
      setSearchHistoryArray([...searchHistoryArray, sortedBooks]);
      setBooksObject(sortedBooks);
    } else {
      console.log("unchanged booksObject ", booksObject);
      setBooksObject((prevBooksObject) => {
        prevBooksObject;
      }); // Reset to original data
    }
  }

  function performFiltering() {
    console.log("perform filtering and searchTerm value: ", searchTerm);
    if (searchTerm) {
      let filteredBooks = booksObject.filter((book) =>
        book.name.toLowerCase().includes(searchTerm.toLowerCase())
      ); // need to set initial value
      if (searchHistoryArray.length > 0) {
        filteredBooks = searchHistoryArray[0].filter((book) =>
          book.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
      //new approach
      console.log(booksObject);

      performSorting(filteredBooks);
    } else {
      console.log("entered else block of filtering ", booksObject);
      if (searchHistoryArray.length > 0) {
        setBooksObject(searchHistoryArray[0]); //no change
        performSorting(searchHistoryArray[0]);
      }
      console.log("i need work here");
    }
  }
  const handleChange_combo = (event) => {
    setSelectedOption(event.value);
  };

  return (
    <>
      <nav className={styles.navs}>
        <div>
          <input
            className={styles.navSearch}
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleChange}
          />
          <button className="bg-red-300 rounded-md p-2 hover:bg-red-400">
            Seacrh
          </button>
          {!isPopup && (
            <button
              onClick={() => {
                setIsPopup(true);
              }}
              className="bg-green-500 rounded-md p-2 hover:bg-yellow-400"
            >
              Add a Book
            </button>
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
        <Popup setIsPopup={setIsPopup} handleAddBook={handleAddBook} />
      )}
      <BookList books={booksObject} />
    </>
  );
};

export default Nav;
