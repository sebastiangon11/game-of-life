import React, { useState } from 'react';
import Grid from '../../components/Grid/Grid';

function App() {

  const [isRunning, setRunning] = useState(false);

  return (
    <div>
        {/* <img src={logo} alt="logo" /> */}
        <Grid height={30} width={40} isRunning={isRunning} />
        <button onClick={() => { setRunning(!isRunning) }}>
          {isRunning ? 'Stop' : 'Start'}
        </button>
    </div>
  );
}

export default App;
