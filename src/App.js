import React from "react";
import { Routes, Route } from "react-router-dom";

//Styles
import "./App.css";

//Pages
import { Home, Admin, Payment } from "./pages";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
