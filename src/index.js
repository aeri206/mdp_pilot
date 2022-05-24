import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Single from './Single';
import Penta from './Penta';
import Sort from './Sort';
import reportWebVitals from './reportWebVitals';
import { HashRouter as Router, useRoutes } from "react-router-dom";


const Pages = () => useRoutes([
  { path: "/single", element: <Single />},
  { path: "/penta", element: <Penta />},
  { path: "/sort", element: <Sort />},

])


ReactDOM.render(
  <Router basename={process.env.PUBLIC_URL}>
    <Pages />
  </Router>,
  
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
