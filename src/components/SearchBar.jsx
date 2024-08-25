import { useContext, useState } from "react";
import styles from "../styles_modules/Nav.module.css";
import axios from "axios";
import { booksContext } from "../contexts/Context";
function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const {
    setIsLoading,
    isLoading,
    setSearchResult,
    setBooksObject,
    setSearchResultVisibility,
  } = useContext(booksContext);

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
    // direct api calls and update booksObject
    if (searchTerm) {
      setSearchResultVisibility(false);
      axios
        .get(
          "https://book-shop-backend-sooty.vercel.app/api/v1/books?search=" +
            searchTerm
        )
        .then((res) => {
          console.log(res.data.data.books);
          console.log(res.data.data.books.length);
          setBooksObject(res.data.data.books);
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
