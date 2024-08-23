import { useContext, useEffect, useRef } from "react";
import { booksContext } from "../contexts/Context";

export default function SearchElement() {
  const {
    searchResult,
    setBooksObject,
    searchResultVisibility,
    setSearchResultVisibility,
  } = useContext(booksContext);
  const searchElementRef = useRef(null);
  console.log(searchResultVisibility);
  useEffect(() => {
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
