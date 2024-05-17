import React, { useState, useEffect } from "react"; // Import useEffect
import { booksData } from "../utils/books";
import { useSharedState } from "../SharedContext.js";

function BookMain() {
  const [searchTerm, setSearchTerm] = useState("");
  const { cartItems, setCartItems } = useSharedState();

  const filteredBooks = booksData.filter((book) => {
    const titleMatch = book.title.toLowerCase().includes(searchTerm.toLowerCase());
    const descriptionMatch = book.description.toLowerCase().includes(searchTerm.toLowerCase());
    return titleMatch || descriptionMatch;
  });

  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem("cartItems"));
    if (storedCartItems) {
      setCartItems(storedCartItems);
    }
  }, []); // Add useEffect to load cart items from localStorage on component mount

  function addToCart(book) {
    const newCartItems = [...cartItems, book];
    setCartItems(newCartItems);
    localStorage.setItem("cartItems", JSON.stringify(newCartItems)); // Save cart items to localStorage
    console.log(newCartItems);
  }

  return (
    <div className="flex flex-wrap justify-center py-[8rem] text-sm gap-10 mx-4">
      <input
        type="text"
        placeholder="Search for books by title, author, or keyword"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border border-gray-300 rounded-md p-2 mb-4 absolute mt-[-5.5rem] md:w-[25rem] w-[12rem]"
      />
      {filteredBooks.map((book) => (
        <div
          key={book.id}
          className="w-[25rem] h-[24rem] bg-gray-100 p-4 rounded-lg shadow-md mb-4 mr-4 flex flex-col justify-between"
        >
          <div>
            <img src={book.cover_image} alt={book.title} className="mb-2 h-[10rem] mx-auto rounded-md" />
            <h3 className="text-xl font-semibold">{book.title}</h3>
            <p className="text-gray-700">Price: {book.price}kr</p>
            <p className="text-gray-700">Publication Date: {book.publication_date}</p>
            <p className="text-gray-700">{book.description}</p>
          </div>
          <button
            onClick={() => addToCart(book)}
            className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-md"
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
}

export default BookMain;
