import { render, screen, queries, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Main } from './Main';

jest.mock('@koale/useworker', () => require('./useworker-mock'));

beforeEach(() => {
  localStorage.clear();
});

it('should add two persons, add and remove an exclusion, and match them', async () => {
  render(<Main />);

  // People
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

  // Exclusions
  userEvent.click(screen.getByRole('tab', { name: 'Exclusions' }));

  const source = screen.getByRole('group', { name: /source/i });
  expect(queries.queryByRole(source, 'radio', { name: /name/i })).toBeChecked();
  expect(queries.queryByLabelText(source, 'Subject')).toHaveValue('Test 1');
  userEvent.selectOptions(queries.getByLabelText(source, 'Subject'), [
    'Test 2',
  ]);
  expect(queries.queryByLabelText(source, 'Subject')).toHaveValue('Test 2');

  const excluded = screen.getByRole('group', { name: /excluded/i });
  expect(
    queries.queryByRole(excluded, 'radio', { name: /name/i })
  ).toBeChecked();
  expect(queries.queryByLabelText(excluded, 'Subject')).toHaveValue('Test 1');
  userEvent.selectOptions(queries.getByLabelText(excluded, 'Subject'), [
    'Test 2',
  ]);
  expect(queries.queryByLabelText(excluded, 'Subject')).toHaveValue('Test 2');

  userEvent.click(
    screen.getByRole('button', {
      name: 'Add Exclusion',
    })
  );

  const addedExclusionsPersonList = await screen.findByRole('list', {
    name: /person/i,
  });

  expect(addedExclusionsPersonList.textContent).toMatch(
    /test 2 cannot give to test 2/i
  );

  userEvent.click(
    queries.getByRole(addedExclusionsPersonList, 'button', { name: /remove/i })
  );
  expect(
    screen.queryByRole('list', { name: /added exclusions/i })
  ).not.toBeInTheDocument();

  // Matches
  userEvent.click(screen.getByRole('tab', { name: 'Matches' }));

  expect(screen.queryByRole('button', { name: 'Match' })).toBeInTheDocument();

  userEvent.click(screen.getByRole('button', { name: 'Match' }));

  expect(
    await screen.findByRole('table', { name: 'Secret Santa Matches' })
  ).toHaveTextContent('Test 1Test 2Test 2Test 1');
});

it('seeds with example data when clicking the fill with example data button and clears with when clicking clear', async () => {
  render(<Main />);

  expect(screen.queryByRole('tab', { name: 'Matches' })).toBeDisabled();
  expect(screen.queryByLabelText('Added People')).not.toBeInTheDocument();
  expect(
    screen.queryByRole('button', { name: /fill with example data/i })
  ).not.toBeDisabled();
  expect(screen.queryByRole('button', { name: /clear/i })).toBeInTheDocument();

  userEvent.click(
    screen.getByRole('button', { name: /fill with example data/i })
  );

  const peopleTabpanel = screen.getByRole('tabpanel', { name: 'People' });
  expect(queries.queryAllByRole(peopleTabpanel, 'listitem')).toHaveLength(15);

  userEvent.click(
    queries.getAllByRole(peopleTabpanel, 'button', { name: /remove/i })[0]
  );

  expect(queries.queryAllByRole(peopleTabpanel, 'listitem')).toHaveLength(14);

  expect(
    screen.queryByRole('button', { name: /fill with example data/i })
  ).toBeDisabled();

  userEvent.click(
    screen.getByRole('button', {
      name: /clear/i,
    })
  );
  expect(queries.queryAllByRole(peopleTabpanel, 'listitem')).toHaveLength(0);
});
