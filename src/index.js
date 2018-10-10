import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

// Edit  const to set html element to render widget
const elementId = 'root';
// Edit const to set default sort on load
const sortBy = 'gold';
ReactDOM.render(<App sortBy={sortBy} />, document.getElementById(elementId));
// Uncomment this line to see default sort by gold when no sortBy value passed
// ReactDOM.rnder(<App />, document.getElementById(elementId));
