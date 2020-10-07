import React from 'react';
import { render, screen, queries, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Main } from './Main';

jest.mock('@koale/useworker', () => require('../__mocks__/@koale/useworker'));

it('should add two persons and match them', async () => {
  render(<Main />);

  expect(screen.queryByRole('tab', { name: 'People' })).toHaveAttribute(
    'aria-selected',
    'true'
  );
  expect(screen.queryByRole('tab', { name: 'Matches' })).toBeDisabled();

  const peopleTabpanel = screen.getByRole('tabpanel', { name: 'People' });

  await act(async () => {
    await userEvent.type(
      queries.getByLabelText(peopleTabpanel, 'Name'),
      'Test 1'
    );
  });

  userEvent.click(
    queries.getByRole(peopleTabpanel, 'button', {
      name: 'Add Person',
    })
  );

  expect(await screen.findByLabelText('Added People')).toBeInTheDocument();
  expect(await screen.findByLabelText('Group No Group')).toBeInTheDocument();
  expect(
    await queries.findByText(peopleTabpanel, /Test 1/)
  ).toBeInTheDocument();

  expect(queries.getByLabelText(peopleTabpanel, 'Name')).toHaveValue('');

  await act(async () => {
    await userEvent.type(
      queries.getByLabelText(peopleTabpanel, 'Name'),
      'Test 2'
    );
  });

  userEvent.click(
    queries.getByRole(peopleTabpanel, 'button', {
      name: 'Add Person',
    })
  );

  expect(await screen.findByLabelText('Group No Group')).toBeInTheDocument();
  expect(
    await queries.findByText(peopleTabpanel, /Test 1/)
  ).toBeInTheDocument();
  expect(
    await queries.findByText(peopleTabpanel, /Test 2/)
  ).toBeInTheDocument();

  userEvent.click(screen.getByRole('tab', { name: 'Matches' }));

  expect(screen.queryByRole('button', { name: 'Match' })).toBeInTheDocument();

  userEvent.click(screen.getByRole('button', { name: 'Match' }));

  expect(
    await screen.findByRole('table', { name: 'Secret Santa Matches' })
  ).toHaveTextContent('Test 1Test 2Test 2Test 1');
});
