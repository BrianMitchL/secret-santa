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

it('seeds with example data when clicking the fill with example data button', async () => {
  render(<Main />);

  expect(screen.queryByRole('tab', { name: 'Matches' })).toBeDisabled();
  expect(screen.queryByLabelText('Added People')).not.toBeInTheDocument();

  userEvent.click(
    screen.getByRole('button', { name: /fill with example data/i })
  );

  const peopleTabpanel = screen.getByRole('tabpanel', { name: 'People' });
  expect(queries.queryAllByRole(peopleTabpanel, 'listitem')).toHaveLength(15);

  userEvent.click(
    queries.getAllByRole(peopleTabpanel, 'button', { name: /remove/i })[0]
  );

  expect(queries.queryAllByRole(peopleTabpanel, 'listitem')).toHaveLength(14);

  const seedButton = screen.getByRole('button', {
    name: /fill with example data/i,
  });
  userEvent.click(seedButton);
  expect(seedButton).toHaveTextContent(/are you sure/i);
  expect(queries.queryAllByRole(peopleTabpanel, 'listitem')).toHaveLength(14);
  userEvent.click(seedButton);
  expect(seedButton).toHaveTextContent(/fill with example data/i);
  expect(queries.queryAllByRole(peopleTabpanel, 'listitem')).toHaveLength(15);
});
