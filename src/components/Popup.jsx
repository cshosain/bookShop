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
        isFavourite: action.payload,
      };
    default:
      return state;
  }
}

const initialState = {
  name: "",
  author: "",
  published_year: "",
  price: "",
  rating: "",
  favourite: false,
};

const Popup = ({ setIsPopup, handleAddBook }) => {
  const { booksObject, setSearchHistoryArray } = useContext(booksContext);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [state, dispatch] = useReducer(reducer, initialState);
  console.log("popup rendered!");
  const handleChange = (event) => {
    dispatch({
      type: `CHANGE_${event.target.name}`,
      payload: event.target.value,
    });
  };
  function handleSubmit(event) {
    event.preventDefault();
    const formData = state;
    const preparedSingleBook = {
      id: Date.now(),
      name: formData.name,
      coverImg: "#",
      author: formData.author,
      published_year: parseInt(formData.published_year),
      price: parseFloat(formData.price),
      rating: parseFloat(formData.rating),
      favourite: formData.favourite,
    };
    handleAddBook(preparedSingleBook);
    let makeFirstSearchHistory = [[preparedSingleBook, ...booksObject]];
    setSearchHistoryArray(makeFirstSearchHistory);
  }
  return (
    <div className={styles.popup}>
      <form onSubmit={handleSubmit}>
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
        <input
          type="text"
          name="isFavourite"
          placeholder="It is favorite: true/false"
          value={state.favourite}
          onChange={handleChange}
        />
        <button id="saveBtn" type="submit">
          Save
        </button>
      </form>

      <button
        className="bg-green-500 m-1 p-1"
        onClick={() => {
          setIsPopup(false);
        }}
      >
        Close
      </button>
    </div>
  );
};
export default Popup;
