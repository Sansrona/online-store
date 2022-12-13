import React from "react";
import { Link } from "react-router-dom";

import "./App.scss";

function App() {
  return (
    <div className="App">
      <header className="App-header"></header>
      <Link to="cart">Cart</Link>
    </div>
  );
}

export default App;
