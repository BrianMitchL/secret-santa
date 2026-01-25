import { render, screen } from '@testing-library/react';

import App from './App';

it('renders a random santa emoji and sets the document title', () => {
  render(<App />);

  expect(
    screen.queryByRole('heading', { name: /secret santa/i }),
  ).toHaveTextContent(/Secret Santa 🎅|🤶/i);
  expect(document.title).toMatch(/Secret Santa 🎅|🤶/i);
});
