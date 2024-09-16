import { useContext, useState } from "react";
import styles from "../styles_modules/Nav.module.css";
import axios from "axios";
import { booksContext } from "../contexts/Context";
import { useSearchParams } from "react-router-dom";
function SearchBar() {
  const {
    setIsLoading,
    isLoading,
    setSearchResult,
    setBooksObject,
    setSearchResultVisibility,
    setTotalPages,
    setTotalBooks,
    selectedOption,
    setSearchMode,
    searchTerm,
    setSearchTerm,
    setBtnDisable,
    setCurrentPage,
  } = useContext(booksContext);
  //const [searchParams] = useSearchParams()

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
    let timeoutId;
    // Clear any existing timeout using a closure
    clearTimeout(timeoutId);

    // Set a new debounce timeout
    timeoutId = setTimeout(() => {
      setIsLoading(true); // Set loading state to indicate search in progress
      console.log(isLoading);
      axios
        .get(
          "https://book-shop-backend-sooty.vercel.app/api/v1/books?search=" +
            event.target.value
        )
        .then((res) => {
          setSearchResultVisibility(true);
          setSearchResult(res.data.data.books);
          setIsLoading(false); // Reset loading state on success
        })
        .catch((err) => {
          console.error("Error fetching search results:", err);
          setIsLoading(false); // Reset loading state on error
        });
    }, 1000); // Adjust delay (in milliseconds) as needed
  };
  const handleSearch = () => {
    setSearchMode(true);
    // direct api calls and update booksObject
    let apiUrl;
    if (searchTerm) {
      setSearchResultVisibility(false);
      switch (selectedOption) {
        case "Select an option":
          apiUrl = `https://book-shop-backend-sooty.vercel.app/api/v1/books?search=${searchTerm}&limit=3`;
          break;
        case "Price":
          apiUrl = `https://book-shop-backend-sooty.vercel.app/api/v1/books?search=${searchTerm}&limit=3&sortBy=price`;
          break;
        case "Relase Year":
          apiUrl = `https://book-shop-backend-sooty.vercel.app/api/v1/books?search=${searchTerm}&limit=3&sortBy=published_year`;
          break;
        case "Author":
          // Assuming author is a string, sort alphabetically
          apiUrl = `https://book-shop-backend-sooty.vercel.app/api/v1/books?search=${searchTerm}&limit=3&sortBy=author`;
          break;
        default:
          apiUrl = `https://book-shop-backend-sooty.vercel.app/api/v1/books?search=${searchTerm}&limit=3`;
      }

      axios
        .get(apiUrl)
        .then((res) => {
          console.log(res.data.data);
          setBooksObject(res.data.data.books);
          setTotalPages(res.data.data.pagination.totalPages);
          setTotalBooks(res.data.data.pagination.totalBooks);

          setCurrentPage(1);
          res.data.data.pagination.totalPages <= 1
            ? setBtnDisable({ prev: true, next: true })
            : setBtnDisable({ prev: true, next: false });
        })
        .catch((err) => {
          console.log(err);
        });
    } else alert("Search field is empty!");
  };
  return (
    <div>
      <input
        className={styles.navSearch}
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleInputChange}
      />
      <button
        className="bg-orange-500 font-semibold text-white rounded-md mr-2 p-2 hover:bg-pink-500"
        onClick={handleSearch}
      >
        Seacrh
      </button>
    </div>
  );
}

export default SearchBar;
