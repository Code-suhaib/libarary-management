import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/api/books";
const BORROW_API = "http://localhost:5000/api/borrow";
const RETURN_API = "http://localhost:5000/api/return";

const BorrowReturnBook = () => {
  const [books, setBooks] = useState([]);
  const [selectedBookId, setSelectedBookId] = useState("");

  // Fetch books from backend
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(API_URL);
        setBooks(response.data);
      } catch (error) {
        console.error("Error fetching books:", error);
        alert("Failed to fetch books. Please try again later.");
      }
    };
    fetchBooks();
  }, []);

  // Handle book borrowing
  const handleBorrow = async () => {
    if (!selectedBookId) {
      alert("Please select a book to borrow.");
      return;
    }
    try {
      const response = await axios.post(BORROW_API, { bookId: selectedBookId });
      alert(response.data.message || "Book borrowed successfully!");
    } catch (error) {
      console.error("Borrow error:", error.response?.data || error.message);
      alert(error.response?.data?.error || "Failed to borrow the book.");
    }
  };

  // Handle book return
  const handleReturn = async () => {
    if (!selectedBookId) {
      alert("Please select a book to return.");
      return;
    }
    try {
      console.log("Returning book with ID:", selectedBookId);
      const response = await axios.post(`${RETURN_API}/${selectedBookId}`);
      alert(response.data.message || "Book returned successfully!");
    } catch (error) {
      console.error("Return error:", error.response?.data || error.message);
      alert(error.response?.data?.error || "Failed to return the book.");
    }
  };

  return (
    <div>
      <h2>Borrow or Return a Book</h2>
      <select value={selectedBookId} onChange={(e) => setSelectedBookId(e.target.value)}>
        <option value="">Select a Book</option>
        {books.map((book) => (
          <option key={book._id} value={book._id}>
            {book.title}
          </option>
        ))}
      </select>
      <br /><br />
      <button onClick={handleBorrow} style={{ backgroundColor: "blue", color: "white" }}>
        Borrow Book
      </button>
      <button onClick={handleReturn} style={{ backgroundColor: "red", color: "white", marginLeft: "10px" }}>
        Return Book
      </button>
    </div>
  );
};

export default BorrowReturnBook;