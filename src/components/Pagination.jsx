/* eslint-disable react/prop-types */
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { booksContext } from "../contexts/Context";

const Pagination = ({
  loading,
  searchMode,
  setLoading,
  postsPerPage,
  totalPages,
  selectedOption,
  totlaBooks,
}) => {
  const {
    setBooksObject,
    setTotalPages,
    setTotalBooks,
    searchTerm,
    btnDisable,
    setBtnDisable,
    currentPage,
    setCurrentPage,
  } = useContext(booksContext);

  useEffect(() => {
    if (currentPage == 1) setBtnDisable({ prev: true, next: false });
    if (currentPage == totalPages) setBtnDisable({ prev: false, next: true });
  }, [currentPage]);

  let pages = [];

  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }
  function handleCurrentPage(page) {
    let apiUrl = `https://book-shop-backend-sooty.vercel.app/api/v1/books?limit=${postsPerPage}&page=${page}`;
    // setLoading(true);
    if (page == 1) setBtnDisable({ ...btnDisable, prev: true });
    console.log(
      "st: ",
      searchTerm,
      "page: ",
      page,
      "searchModee; ",
      searchMode
    );
    setCurrentPage(page);
    //setBtnDisable({ prev: false, next: false });
    //console.log("Loading: ", loading);
    if (searchMode && searchTerm) {
      console.log("searchmode");
      //apiUrl = `https://book-shop-backend-sooty.vercel.app/api/v1/books?limit=${postsPerPage}&page=${page}`
      // duplication task as required!
      switch (selectedOption) {
        case "Select an option":
          apiUrl = `https://book-shop-backend-sooty.vercel.app/api/v1/books?search=${searchTerm}&limit=3`;
          break;
        case "Price":
          apiUrl = `https://book-shop-backend-sooty.vercel.app/api/v1/books?search=${searchTerm}&limit=3&page=${page}&sortBy=price`;
          break;
        case "Relase Year":
          apiUrl = `https://book-shop-backend-sooty.vercel.app/api/v1/books?search=${searchTerm}&limit=3&page=${page}&sortBy=published_year`;
          break;
        case "Author":
          // Assuming author is a string, sort alphabetically
          apiUrl = `https://book-shop-backend-sooty.vercel.app/api/v1/books?search=${searchTerm}&limit=3&page=${page}&sortBy=author`;
          break;
        default:
          apiUrl = `https://book-shop-backend-sooty.vercel.app/api/v1/books?search=${searchTerm}&limit=3&page=${page}`;
      }
    }
    //api task
    axios
      .get(apiUrl)
      .then((res) => {
        //setLoading(false);
        setLoading(false);
        setBooksObject(res.data.data.books);
        console.log(res.data.data);
        setTotalPages(res.data.data.pagination.totalPages);
        setTotalBooks(res.data.data.pagination.totalBooks);
        console.log(res.data.data.pagination.totalPages);
        if (page == res.data.data.pagination.totalPages)
          setBtnDisable({ ...btnDisable, next: true });
        if (page != 1 && page != res.data.data.pagination.totalPages)
          setBtnDisable({ prev: false, next: false });
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  }
  console.log(btnDisable);
  function goPrev() {
    console.log(currentPage);
    setBtnDisable({ ...btnDisable, next: false });
    if (currentPage > 1) setCurrentPage((prev) => handleCurrentPage(prev - 1));
    else setBtnDisable({ ...btnDisable, prev: true });
  }
  function goNext() {
    console.log(currentPage);
    setBtnDisable({ ...btnDisable, prev: false });
    if (currentPage < pages.length) {
      setCurrentPage((prev) => handleCurrentPage(prev + 1));
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
