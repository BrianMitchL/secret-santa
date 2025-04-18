import App from './App';
import { render, screen } from '@testing-library/react';

it('renders a random santa emoji and sets the document title', () => {
  render(<App />);

  expect(
    screen.queryByRole('heading', { name: /secret santa/i }),
  ).toHaveTextContent(/Secret Santa 🎅|🤶/i);
  expect(document.title).toMatch(/Secret Santa 🎅|🤶/i);
});
