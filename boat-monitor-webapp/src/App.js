import React from 'react';

import logo from './logo.svg';
import './App.css';
import SimpleMap from "./Map.js";

function App() {
  return (
    <div className="App">
      <div>
        Map
        <SimpleMap/>
      </div>
      <div>
        Details
      </div>
    </div>
  );
}

export default App;
