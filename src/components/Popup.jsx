/* eslint-disable react/prop-types */
import { booksContext } from "./Context";
import styles from "./Nav.module.css"; // Import using CSS Modules
import { useContext, useReducer } from "react";

function reducer(state, action) {
  switch (action.type) {
    case "CHANGE_name":
      return {
        ...state,
        name: action.payload,
      };
    case "CHANGE_author":
      return {
        ...state,
        author: action.payload,
      };
    case "CHANGE_year":
      return {
        ...state,
        published_year: action.payload,
      };
    case "CHANGE_price":
      return {
        ...state,
        price: action.payload,
      };
    case "CHANGE_rating":
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

const Popup = ({ setIsPopup }) => {
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
    if (state.name && state.author && state.price && state.rating) {
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
        setBooksObject(updatedBooks);
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
      alert("The input field is empty!");
    }
  }
  return (
    <div className={styles.popup}>
      <form onSubmit={handleSubmit}>
        <p>Id: {state.id}</p>
        <input
          type="text"
          name="name"
          placeholder="Enter name"
          value={state.name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="author"
          placeholder="Author name"
          value={state.author}
          onChange={handleChange}
        />
        <input
          type="text"
          name="year"
          placeholder="Published year"
          value={state.published_year}
          onChange={handleChange}
        />
        <input
          type="text"
          name="price"
          placeholder="Price"
          value={state.price}
          onChange={handleChange}
        />
        <input
          type="text"
          name="rating"
          placeholder="Rating"
          value={state.rating}
          onChange={handleChange}
        />

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
        <button id="saveBtn" type="submit">
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
