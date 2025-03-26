import React, { useEffect, useState } from "react";
import { fetchBooks, addBook } from "../api/api.js";
import Swal from "sweetalert2"; // Import SweetAlert2
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap styling

const Books = () => {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");

  useEffect(() => {
    loadBooks();
  }, []);

  const loadBooks = async () => {
    try {
      const response = await fetchBooks();
      setBooks(response.data);
    } catch (err) {
      console.error("Error fetching books:", err);
      Swal.fire("Error!", "Failed to fetch books. Try again!", "error");
    }
  };

  const handleAddBook = async () => {
    if (!title || !author) {
      Swal.fire("Warning!", "Please enter both title and author!", "warning");
      return;
    }

    try {
      await addBook({ title, author });
      Swal.fire("Success!", "Book added successfully!", "success");
      setTitle("");
      setAuthor("");
      loadBooks(); // Refresh the book list
    } catch (err) {
      console.error("Error adding book:", err);
      Swal.fire("Error!", "Failed to add book. Try again!", "error");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card p-4 shadow-lg">
        <h2 className="text-center mb-4">Library Books</h2>

        {/* Add New Book Form */}
        <div className="mb-3">
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Book Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Author Name"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
          <button className="btn btn-success w-100" onClick={handleAddBook}>
            Add Book
          </button>
        </div>

        {/* Book List */}
        <ul className="list-group">
          {books.length > 0 ? (
            books.map((book) => (
              <li key={book._id} className="list-group-item d-flex justify-content-between">
                <span>
                  <strong>{book.title}</strong> by {book.author}
                </span>
              </li>
            ))
          ) : (
            <li className="list-group-item text-center">No books available</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Books;
