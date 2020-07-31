import React from 'react';
import { Thermostat } from "./components/Thermostat";
import './App.scss';

function App() {
  const apiDomain = window.apiDomain || '/api/';
  return (
    <div>
      <Thermostat
        apiDomain={apiDomain}
      />
    </div>
  );
}

export default App;
