import { useContext, useEffect, useRef } from "react";
import { booksContext } from "../contexts/Context";
import Loading from "./Loading";

export default function SearchElement() {
  const {
    searchResult,
    isLoading,
    setBooksObject,
    searchResultVisibility,
    setSearchResultVisibility,
  } = useContext(booksContext);
  const searchElementRef = useRef(null);
  console.log(searchResultVisibility);
  useEffect(() => {
    //checks if the click event's target is outside the div referenced by searchElementRef
    const handleClickOutside = (event) => {
      if (
        searchElementRef.current &&
        !searchElementRef.current.contains(event.target)
      ) {
        setSearchResultVisibility(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setSearchResultVisibility]);
  return (
    <div className="searchElements" ref={searchElementRef}>
      {isLoading && <p>Loading...</p>}
      {searchResultVisibility && (
        <ul>
          {searchResult.map((book) => (
            <li
              onClick={() => {
                setBooksObject([book]);
                setSearchResultVisibility(false);
              }}
              key={book._id}
            >
              {book.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
