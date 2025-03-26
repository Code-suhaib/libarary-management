import React from "react";
import Books from "./components/Book.jsx"; 
import Borrow from "./components/Borrow.jsx";


function App() {
  return (
    <div>
      <h1>Library Management</h1>
      <Books />
      <Borrow />
    </div>
  );
}

export default App;
