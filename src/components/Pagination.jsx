/* eslint-disable react/prop-types */
import { useState } from "react";

const Pagination = ({
  totalPosts,
  postsPerPage,
  setCurrentPage,
  currentPage,
}) => {
  const [btnDisable, setBtnDisable] = useState({ prev: false, next: false });
  let pages = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pages.push(i);
  }
  function handleCurrentPage(page) {
    setCurrentPage(page);
    setBtnDisable({ prev: false, next: false });
  }
  function goPrev() {
    console.log(currentPage);
    setBtnDisable({ ...btnDisable, next: false });
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
    else setBtnDisable({ ...btnDisable, prev: true });
  }
  function goNext() {
    console.log(currentPage);
    setBtnDisable({ ...btnDisable, prev: false });
    if (currentPage < pages.length) {
      setCurrentPage((prev) => prev + 1);
    } else setBtnDisable({ ...btnDisable, next: true });
  }

  return (
    <div className="pagination">
      <button disabled={btnDisable.prev} onClick={goPrev}>
        Prev
      </button>
      {pages.map((page, index) => {
        return (
          <button
            key={index}
            onClick={() => handleCurrentPage(page)}
            className={page == currentPage ? "active" : ""}
          >
            {page}
          </button>
        );
      })}
      <button disabled={btnDisable.next} onClick={goNext}>
        Next
      </button>
    </div>
  );
};

export default Pagination;
