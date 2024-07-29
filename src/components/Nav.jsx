/* eslint-disable react-hooks/exhaustive-deps */
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
    setBooksObject,
    searchHistoryArray,
    setSearchHistoryArray,
    deletedBooksId,
  } = useContext(booksContext);
  const options = ["Price", "Relase Year", "Author"];
  const [selectedOption, setSelectedOption] = useState("Select an option");
  const [searchTerm, setSearchTerm] = useState("");
  const [isPopup, setIsPopup] = useState(false);

  useEffect(() => {
    console.log("need to sort");
    performSorting();
  }, [booksObject.length]);
  useEffect(() => {
    if (searchTerm) {
      performFiltering();
    } else {
      console.log(
        "no search term and searchHistoryArray length is: ",
        searchHistoryArray.length
      );
      if (searchHistoryArray.length > 0) {
        // setBooksObject(searchHistoryArray[0]); //no change
        console.log("No change");
        performSorting(searchHistoryArray[0]);
      }
    }
  }, [searchTerm]);

  useEffect(() => {
    performSorting();
  }, [selectedOption]);

  //useEffeect (for filtering) must required because the filtering task need performed after the searchTerm upgradation by setSearchTerm()
  const handleChange = (event) => {
    setSearchTerm(event.target.value);
    //performFiltering(); here can not do work because right now the searchTerm does not become empty
    //instead it will start working with taking immediate previous value of searchTerm
    //because state update is asynchronous
  };
  //given function works remain 7/19/23. need to filter all sortedBooks where not in ids
  function filterByDelatedBooksId(sortedBooks, ids) {
    let returnArray = [];
    let myIds = [...new Set(ids.slice())];
    let mySortedBooks = sortedBooks.slice();
    let bookRange = mySortedBooks.length;
    let idsRange = myIds.length;
    for (let i = 0; i < bookRange; i++) {
      let mem = mySortedBooks[i];
      for (let j = 0; j < idsRange; j++) {
        if (mySortedBooks[i].id == myIds[j]) {
          mem = false;
          j = idsRange;
        }
      }
      if (mem) {
        returnArray.push(mem);
      }
    }
    return returnArray;
  }

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

      setBooksObject(filterByDelatedBooksId(sortedBooks, deletedBooksId));
      console.log("state updated!");
    } else {
      setSearchHistoryArray([...searchHistoryArray, optionalNewBook]);
      setBooksObject(filterByDelatedBooksId(optionalNewBook, deletedBooksId));
    }
  }

  function performFiltering() {
    if (searchTerm) {
      if (searchHistoryArray.length > 0) {
        let filteredBooks = searchHistoryArray[0].filter((book) =>
          book.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        performSorting(filteredBooks);
      } else {
        let filteredBooks = booksObject.filter((book) =>
          book.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        performSorting(filteredBooks);
      }
    } else {
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
      {isPopup && <Popup setIsPopup={setIsPopup} />}
      <BookList setIsPopup={setIsPopup} books={booksObject} />
    </>
  );
};

export default Nav;
