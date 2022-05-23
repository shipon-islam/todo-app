import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Todos from "./todos_app/Todos";

export default function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="">
            <Todos />
          </div>
        }
      />
    </Routes>
  );
}
