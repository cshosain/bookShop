import { useContext, useState } from "react";
import styles from "../styles_modules/Nav.module.css";
import axios from "axios";
import { booksContext } from "../contexts/Context";
function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const { setSearchResult, setBooksObject, setSearchResultVisibility } =
    useContext(booksContext);
  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
    //call the api with every input field data change
    //the response update the Search element ul>li
    axios
      .get(
        "https://book-shop-backend-sooty.vercel.app/api/v1/books?search=" +
          event.target.value
      )
      .then((res) => {
        console.log(res.data.data.books);
        setSearchResultVisibility(true);
        setSearchResult(res.data.data.books);
      })
      .catch((err) => {
        console.log(err);
      });
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
