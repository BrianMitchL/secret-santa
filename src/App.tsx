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
          . View the source on{' '}
          <a
            href="https://github.com/BrianMitchL/secret-santa"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          .
        </p>
      </header>
      <Main />
    </>
  );
}

export default App;
