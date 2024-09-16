/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/rules-of-hooks */
import { createContext, useState } from "react";
import axios from "axios";
const books = [
  {
    id: 1,
    name: "Clean Code: A Handbook of Agile Software Craftsmanship",
    coverImg: "https://m.media-amazon.com/images/I/51E2055ZGUL._SL1000_.jpg",
    author: "Robert C. Martin",
    published_year: 2008,
    price: 34.99,
    rating: 5,
    favourite: true,
  },
  {
    id: 2,
    name: "JavaScript: The Good Parts",
    coverImg: "https://m.media-amazon.com/images/I/7185IMvz88L._SL1500_.jpg",
    author: "Douglas Crockford",
    published_year: 2008,
    price: 23.99,
    rating: 4,
    favourite: false,
  },
  {
    id: 3,
    name: "The Pragmatic Programmer: Your Journey to Mastery",
    coverImg: "https://m.media-amazon.com/images/I/71f1jieYHNL._SL1043_.jpg",
    author: "Andrew Hunt, David Thomas",
    published_year: 1999,
    price: 39.99,
    rating: 5,
    favourite: true,
  },
  {
    id: 4,
    name: "Design Patterns: Elements of Reusable Object-Oriented Software",
    coverImg:
      "https://m.media-amazon.com/images/W/MEDIAX_792452-T1/images/I/51szD9HC9pL._SX342_SY445_.jpg",
    author: "Erich Gamma, Richard Helm, Ralph Johnson, John Vlissides",
    published_year: 1994,
    price: 45.99,
    rating: 5,
    favourite: false,
  },
  {
    id: 5,
    name: "Code Complete: A Practical Handbook of Software Construction",
    coverImg:
      "https://m.media-amazon.com/images/W/MEDIAX_792452-T1/images/I/414E17giciL._SX342_SY445_.jpg",
    author: "Steve McConnell",
    published_year: 1993,
    price: 55.99,
    rating: 5,
    favourite: true,
  },
  {
    id: 6,
    name: "Effective Java",
    coverImg:
      "https://m.media-amazon.com/images/W/MEDIAX_792452-T1/images/I/41wwAndOaeL._SX342_SY445_.jpg",
    author: "Joshua Bloch",
    published_year: 2001,
    price: 29.99,
    rating: 5,
    favourite: false,
  },
  {
    id: 7,
    name: "The Mythical Man-Month: Essays on Software Engineering",
    coverImg:
      "https://m.media-amazon.com/images/W/MEDIAX_792452-T1/images/I/51F7U9MLGXL._SY445_SX342_.jpg",
    author: "Frederick P. Brooks Jr.",
    published_year: 1975,
    price: 25.99,
    rating: 4,
    favourite: true,
  },
  {
    id: 8,
    name: "Python Crash Course",
    coverImg:
      "https://m.media-amazon.com/images/W/MEDIAX_792452-T1/images/I/514cSQ0O9OL._SY445_SX342_.jpg",
    author: "Eric Matthes",
    published_year: 2015,
    price: 29.99,
    rating: 5,
    favourite: false,
  },
  {
    id: 9,
    name: "Head First Java",
    coverImg:
      "https://m.media-amazon.com/images/W/MEDIAX_792452-T1/images/I/4113mKhIT0L._SX342_SY445_.jpg",
    author: "Kathy Sierra, Bert Bates",
    published_year: 2003,
    price: 37.99,
    rating: 4,
    favourite: true,
  },
  {
    id: 10,
    name: "Introduction to Algorithms",
    coverImg:
      "https://m.media-amazon.com/images/W/MEDIAX_792452-T1/images/I/41+aXH4mDbL._SX342_SY445_.jpg",
    author:
      "Thomas H. Cormen, Charles E. Leiserson, Ronald L. Rivest, Clifford Stein",
    published_year: 1990,
    price: 59.99,
    rating: 5,
    favourite: false,
  },
  {
    id: 11,
    name: "Eloquent JavaScript: A Modern Introduction to Programming",
    coverImg:
      "https://m.media-amazon.com/images/W/MEDIAX_792452-T1/images/I/41VvIauMuuL._SY445_SX342_.jpg",
    author: "Marijn Haverbeke",
    published_year: 2011,
    price: 19.99,
    rating: 4,
    favourite: true,
  },
  {
    id: 12,
    name: "The Art of Computer Programming, Volumes 1-3",
    coverImg:
      "https://m.media-amazon.com/images/W/MEDIAX_792452-T1/images/I/41F3TgFTpVL._SX342_SY445_.jpg",
    author: "Donald E. Knuth",
    published_year: 1968,
    price: 79.99,
    rating: 5,
    favourite: false,
  },
  {
    id: 13,
    name: "Cracking the Coding Interview",
    coverImg:
      "https://m.media-amazon.com/images/W/MEDIAX_792452-T1/images/I/410hiaPGyCL._SY445_SX342_.jpg",
    author: "Gayle Laakmann McDowell",
    published_year: 2008,
    price: 32.99,
    rating: 5,
    favourite: true,
  },
  {
    id: 14,
    name: "Algorithms",
    coverImg:
      "https://m.media-amazon.com/images/W/MEDIAX_792452-T1/images/I/41i-9zPvscL._SX342_SY445_.jpg",
    author: "Robert Sedgewick, Kevin Wayne",
    published_year: 2011,
    price: 49.99,
    rating: 4,
    favourite: false,
  },
];

export const booksContext = createContext([]);
const BookProvider = (props) => {
  const [booksObject, setBooksObject] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const [postsPerPage, setPostsPerPage] = useState(10);
  const [searchMode, setSearchMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [totalBooks, setTotalBooks] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [btnDisable, setBtnDisable] = useState({ prev: false, next: false });
  const [isLoading, setIsLoading] = useState(false);
  const [searchResultVisibility, setSearchResultVisibility] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Select an option");
  const [searchHistoryArray, setSearchHistoryArray] = useState([]);
  const [deletedBooksId, setDelatedBooksId] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [confirmDel, setConfirmDel] = useState({
    presence: false,
    bookId: "",
  });
  const [editBookInfo, setEditBookInfo] = useState({
    id: null,
    name: "",
    coverImg: "#",
    author: "",
    published_year: null,
    price: null,
    rating: null,
    favourite: null,
  });
  const handleAddBook = (newBook) => {
    //nee to post opration for add a new book
    //setBooksObject([...booksObject, newBook]);
    axios
      .post("https://book-shop-backend-sooty.vercel.app/api/v1/books", newBook)
      .then((res) => {
        console.log(res.data.data);
        console.log(res.data.message);
        alert(res.data.message);
        loadAllBooks();
      })
      .catch((error) => {
        alert(error);
        console.log(error);
      });
  };
  const loadAllBooks = () => {
    axios
      .get("https://book-shop-backend-sooty.vercel.app/api/v1/books")
      .then((res) => {
        selectedOption == "Select an option"
          ? setBooksObject(res.data.data.books)
          : performSorting(res.data.data.books);

        console.log(res.data.data.books);
        console.log(res.data.message);

        console.log("Books refreshed");
      })
      .catch((error) => console.log(error));
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

      setBooksObject(sortedBooks);
      console.log("state updated!");
    }
  }
  return (
    <booksContext.Provider
      value={{
        booksObject,
        handleAddBook,
        setBooksObject,
        searchResult,
        setSearchResult,
        isLoading,
        setIsLoading,
        searchMode,
        searchTerm,
        setSearchTerm,
        setSearchMode,
        postsPerPage,
        totalPages,
        setTotalPages,
        totalBooks,
        setTotalBooks,
        btnDisable,
        setBtnDisable,
        currentPage,
        setCurrentPage,
        searchHistoryArray,
        setSearchHistoryArray,
        searchResultVisibility,
        setSearchResultVisibility,
        performSorting,
        selectedOption,
        setSelectedOption,
        deletedBooksId,
        setDelatedBooksId,
        editBookInfo,
        setEditBookInfo,
        editMode,
        setEditMode,
        confirmDel,
        setConfirmDel,
        loadAllBooks,
      }}
    >
      {props.children}
    </booksContext.Provider>
  );
};
export default BookProvider;
