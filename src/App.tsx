import React from "react";
import { Panes } from "./panes/Panes";
import { createGlobalStyle } from "styled-components";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import { Selection } from "./panes/selection/Selection";
import { Visualization } from "./panes/visualization/Visualization";

function App() {
  return (
    <div>
      <GlobalStyles />
      <Routing />
    </div>
  );
}

export const GlobalStyles = createGlobalStyle`
  body {
    background-color: lightgrey;
      padding: 20px;
  }
`;

const Routing = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Navigate to="/selection" replace />} />
      <Route path="/" element={<Panes />}>
        <Route index={true} path="/selection" element={<Selection />}></Route>
        <Route path="/visualization" element={<Visualization />}></Route>
      </Route>
    </Routes>
  </Router>
);

export default App;
