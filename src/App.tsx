import * as React from 'react';
import { Main } from './Main';

function App() {
  return (
    <>
      <header>
        <h1>Secret Santa</h1>
        <p>
          By{' '}
          <a href="https://brianm.me" rel="noopener noreferrer">
            Brian Mitchell
          </a>
        </p>
      </header>
      <Main />
    </>
  );
}

export default App;
