import React from "react";
import ReactDOM from "react-dom";
import { addArticle } from "./actions/index";
import "./styles.css";
import AppComponent from "./App";
import store from "./store/index";
window.store = store;
window.addArticle = addArticle;

function App() {
  return (
    <div className="App">
      <AppComponent />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
