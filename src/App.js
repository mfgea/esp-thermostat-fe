import React from 'react';
import { Thermostat } from "./components/Thermostat";
import './App.scss';

function App() {
  return (
    <div>
      <Thermostat
        apiDomain={window.apiDomain}
      />
    </div>
  );
}

export default App;
