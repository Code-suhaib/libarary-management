import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Button, Form, Container, Row, Col, Alert } from "react-bootstrap";

const API_URL = "http://localhost:5000/api/books";
const BORROW_API = "http://localhost:5000/api/borrow";
const RETURN_API = "http://localhost:5000/api/return";

const BorrowReturnBook = () => {
  const [books, setBooks] = useState([]);
  const [selectedBookId, setSelectedBookId] = useState("");
  const [message, setMessage] = useState({ type: "", text: "" });

  // Fetch books from backend
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(API_URL);
        setBooks(response.data);
      } catch (error) {
        setMessage({ type: "danger", text: "Failed to fetch books. Try again later." });
      }
    };
    fetchBooks();
  }, []);

  // Handle book borrowing
  const handleBorrow = async () => {
    if (!selectedBookId) {
      setMessage({ type: "warning", text: "Please select a book to borrow." });
      return;
    }
    try {
      const response = await axios.post(BORROW_API, { bookId: selectedBookId });
      setMessage({ type: "success", text: response.data.message || "Book borrowed successfully!" });
    } catch (error) {
      setMessage({ type: "danger", text: error.response?.data?.error || "Failed to borrow the book." });
    }
  };

  // Handle book return
  const handleReturn = async () => {
    if (!selectedBookId) {
      setMessage({ type: "warning", text: "Please select a book to return." });
      return;
    }
    try {
      const response = await axios.post(`${RETURN_API}/${selectedBookId}`);
      setMessage({ type: "success", text: response.data.message || "Book returned successfully!" });
    } catch (error) {
      setMessage({ type: "danger", text: error.response?.data?.error || "Failed to return the book." });
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card className="shadow-sm">
            <Card.Body>
              <h2 className="text-center text-primary">Borrow or Return a Book</h2>
              {message.text && <Alert variant={message.type}>{message.text}</Alert>}

              <Form.Group controlId="bookSelect" className="mt-3">
                <Form.Label>Select a Book</Form.Label>
                <Form.Select value={selectedBookId} onChange={(e) => setSelectedBookId(e.target.value)}>
                  <option value="">-- Choose a Book --</option>
                  {books.map((book) => (
                    <option key={book._id} value={book._id}>
                      {book.title}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              <div className="d-flex justify-content-between mt-4">
                <Button variant="primary" onClick={handleBorrow}>
                  Borrow Book
                </Button>
                <Button variant="danger" onClick={handleReturn}>
                  Return Book
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default BorrowReturnBook;
