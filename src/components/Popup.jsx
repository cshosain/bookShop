/* eslint-disable react/prop-types */
import { booksContext } from "../contexts/Context";
import styles from "../styles_modules/Nav.module.css"; // Import using CSS Modules
import { useContext, useReducer, useState } from "react";

const Popup = ({ setIsPopup, performSorting, selectedOption }) => {
  const [error, setError] = useState({
    name: "",
    author: "",
    year: "",
    price: "",
    rating: "",
  });
  function preventSubmissionIfErrors(errorObject) {
    // Check if the error object has any properties
    if (Object.keys(errorObject).length === 0) {
      return false; // No errors, allow submission
    }

    // Check if any property value is not empty
    for (const key in errorObject) {
      if (errorObject[key]) {
        return true; // Error found, prevent submission
      }
    }

    return false; // No errors found, allow submission
  }

  function reducer(state, action) {
    const bookNameRegex = /^[a-zA-Z\s-.:]+$/;
    const authorNameRegex = /^[a-zA-Z\s-.]+$/;
    const priceRegex = /^[0-9]/;
    //const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // const ratingRegx = /^\d+(\.\d{1,2})?$/;
    // const ratingRegx = /^(1|2|3|4)(\.\d)?|5(\.0)?$/;
    const ratingRegx = /^(1|2|3|4|5)(\.\d)?$/;

    function validateYear(yearString) {
      if (yearString != "") {
        const year = parseInt(yearString, 10);
        console.log(year);
        const currentYear = new Date().getFullYear();
        console.log(currentYear);
        console.log("inside func", !isNaN(year) && year <= currentYear);
        return !isNaN(year) && year <= currentYear;
      }
      return false;
    }

    switch (action.type) {
      case "CHANGE_name":
        if (!bookNameRegex.test(action.payload) && !action.payload == "") {
          setError({ ...error, name: "Invalid book name!" });
        } else setError({ ...error, name: "" });
        return {
          ...state,
          name: action.payload,
        };
      case "CHANGE_author":
        if (!authorNameRegex.test(action.payload) && !action.payload == "") {
          setError({ ...error, author: "Invalid author name!" });
        } else setError({ ...error, author: "" });
        return {
          ...state,
          author: action.payload,
        };
      case "CHANGE_year":
        console.log(validateYear(action.payload));
        if (!validateYear(action.payload) && !action.payload == "") {
          setError({ ...error, year: "Invalid year!" });
        } else setError({ ...error, year: "" });
        return {
          ...state,
          published_year: action.payload,
        };
      case "CHANGE_price":
        if (!priceRegex.test(action.payload) && !action.payload == "") {
          setError({ ...error, price: "Invalid price!" });
        } else setError({ ...error, price: "" });
        return {
          ...state,
          price: action.payload,
        };
      case "CHANGE_rating":
        if (!ratingRegx.test(action.payload) && !action.payload == "") {
          setError({ ...error, rating: "Input number between 1 to 5!" });
        } else setError({ ...error, rating: "" });
        return {
          ...state,
          rating: action.payload,
        };
      case "CHANGE_isFavourite":
        return {
          ...state,
          favourite: action.payload,
        };
      default:
        return state;
    }
  }
  const {
    booksObject,
    setBooksObject,
    handleAddBook,
    searchHistoryArray,
    setSearchHistoryArray,
    editBookInfo,
    editMode,
    setEditMode,
  } = useContext(booksContext);
  const myEditBookInfo = JSON.parse(JSON.stringify(editBookInfo));
  const initialState = {
    id: editMode && myEditBookInfo.id ? myEditBookInfo.id : Date.now(),
    name: editMode && myEditBookInfo.name ? myEditBookInfo.name : "",
    coverImg:
      editMode && myEditBookInfo.coverImg ? myEditBookInfo.coverImg : "#",
    author: editMode && myEditBookInfo.author ? myEditBookInfo.author : "",
    published_year:
      editMode && myEditBookInfo.published_year
        ? myEditBookInfo.published_year
        : "",
    price: editMode && myEditBookInfo.price ? myEditBookInfo.price : "",
    rating: editMode && myEditBookInfo.rating ? myEditBookInfo.rating : "",
    favourite:
      editMode && myEditBookInfo.favourite ? myEditBookInfo.favourite : false,
  };

  // eslint-disable-next-line react-hooks/rules-of-hooks

  const [state, dispatch] = useReducer(reducer, initialState);
  const handleChange = (event) => {
    if (event.target.name == "isFavourite")
      dispatch({
        type: `CHANGE_${event.target.name}`,
        payload: event.target.checked,
      });
    else
      dispatch({
        type: `CHANGE_${event.target.name}`,
        payload: event.target.value,
      });
  };
  function handleSubmit(event) {
    event.preventDefault();
    let preparedSingleBook;
    if (!preventSubmissionIfErrors(error)) {
      const formData = state;
      preparedSingleBook = {
        id: state.id,
        name: formData.name,
        coverImg: state.coverImg,
        author: formData.author,
        published_year: parseInt(formData.published_year),
        price: parseFloat(formData.price),
        rating: parseFloat(formData.rating),
        favourite: formData.favourite,
      };
      if (editMode) {
        let updatedBooks = booksObject.map((book) => {
          if (book.id == preparedSingleBook.id) {
            return {
              id: preparedSingleBook.id,
              name: preparedSingleBook.name,
              coverImg: preparedSingleBook.coverImg,
              author: preparedSingleBook.author,
              published_year: preparedSingleBook.published_year,
              price: preparedSingleBook.price,
              rating: preparedSingleBook.rating,
              favourite: preparedSingleBook.favourite,
            };
          } else return book;
        });
        //here performSorting also do the state update job but right after sorting
        //and there is no need of ferther sorting after update a book when there is no selected option
        selectedOption !== "Select an option"
          ? performSorting(updatedBooks)
          : setBooksObject(updatedBooks);
        //gettin the updated book for update the history array with this updated book just at the place of this desired book, other remain unchanged.
        const updatedBook = updatedBooks.find(
          (book) => book.id == preparedSingleBook.id
        );
        let nextHistoryArray = [
          [
            ...searchHistoryArray[0].map((book) => {
              if (book.id == preparedSingleBook.id) {
                return {
                  ...updatedBook,
                };
              } else return book;
            }),
          ],
          ...searchHistoryArray.slice(1),
        ];
        setSearchHistoryArray(nextHistoryArray);
      } else {
        handleAddBook(preparedSingleBook);
        //keeping record of recently added book first then rest of the books
        let makeFirstSearchHistory = [
          [preparedSingleBook, ...searchHistoryArray[0]],
        ];
        console.log(makeFirstSearchHistory);
        setSearchHistoryArray(makeFirstSearchHistory);
      }
      //bringing the new added book firt index of currently all books then currently all books array set into history array
      setIsPopup(false);
      setEditMode(false);
    } else {
      alert("Please enter correct value!");
    }
  }
  return (
    <div className={styles.popup}>
      {console.log(error)}
      <form onSubmit={handleSubmit}>
        <p>Id: {state.id}</p>
        <input
          type="text"
          name="name"
          placeholder="Book name"
          value={state.name}
          required
          onChange={handleChange}
        />
        {error.name && (
          <p style={{ color: "red", margin: "0" }}>{error.name}</p>
        )}
        <input
          type="text"
          name="author"
          placeholder="Author name"
          value={state.author}
          required
          onChange={handleChange}
        />
        {error.author && (
          <p style={{ color: "red", margin: "0" }}>{error.author}</p>
        )}
        <input
          type="number"
          name="year"
          placeholder="Published year ('-' for BC. e.g. -300)"
          value={state.published_year}
          required
          onChange={handleChange}
        />
        {error.year && (
          <p style={{ color: "red", margin: "0" }}>{error.year}</p>
        )}
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={state.price}
          required
          onChange={handleChange}
        />
        {error.price && (
          <p style={{ color: "red", margin: "0" }}>{error.price}</p>
        )}
        <input
          type="number"
          name="rating"
          placeholder="Rating"
          value={state.rating}
          required
          onChange={handleChange}
        />
        {error.rating && (
          <p style={{ color: "red", margin: "0" }}>{error.rating}</p>
        )}

        {/* <input
          type="checkbox"
          // value={true}
          checked={state.favourite}
          name="isFavourite"
          onChange={handleChange}
          style={{ margin: "7px", scale: "2" }}
        />
        <label htmlFor="isFavourite">Add to favourite</label> */}
        <label htmlFor="checkbox" className="checkbox--label">
          <input
            type="checkbox"
            name="isFavourite"
            checked={state.favourite}
            id="checkbox"
            onChange={handleChange}
          />
          <span>Add to favourite</span>
        </label>
        <button
          disabled={
            error.name ||
            error.author ||
            error.price ||
            error.year ||
            error.rating
          }
          id="saveBtn"
          type="submit"
        >
          Save
        </button>
      </form>

      <button
        id="closeBtn"
        className=" bg-red-500 m-1 p-1"
        onClick={() => {
          setEditMode(false);
          setIsPopup(false);
        }}
      >
        Close
      </button>
    </div>
  );
};
export default Popup;
