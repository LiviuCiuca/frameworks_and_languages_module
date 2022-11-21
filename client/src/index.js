import React from 'react';
import ReactDOM from 'react-dom/client';
import { Items } from './components/getItems';
import reportWebVitals from './reportWebVitals';
import { PostItems } from './components/postItem';
import 'purecss/build/pure.css'
import './App.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
     <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/purecss@3.0.0/build/grids-responsive-min.css"></link>
    <PostItems/>
    <Items />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
