import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as firebase from "firebase";
import "firebase/storage";
import "firebase/messaging";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App />, div);
});
