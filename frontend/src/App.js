import React from 'react';

import Income from './components/Income';
import Expense from './components/Expense';

function App() {
  return (
    <div className='App flex'>
      <Income />
      <Expense />
    </div>
  );
}

export default App;
