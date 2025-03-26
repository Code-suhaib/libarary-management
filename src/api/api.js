import axios from "axios";

const API_URL = "http://localhost:5000/api/books";
const BORROW_URL = "http://localhost:5000/api/borrow"; 

export const fetchBooks = () => axios.get(API_URL);
export const addBook = (book) => axios.post(API_URL, book);
export const borrowBook = (borrowDetails) => axios.post(BORROW_URL, borrowDetails); // ✅ Fixed
export const returnBook = (id) => axios.post(`${BORROW_URL}/return/${id}`);
