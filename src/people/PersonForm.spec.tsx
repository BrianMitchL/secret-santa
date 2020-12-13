import { act, render, screen, waitFor } from '@testing-library/react';
import { PersonForm } from './PersonForm';
import userEvent from '@testing-library/user-event';

const addPerson = () => {
  userEvent.click(
    screen.getByRole('button', {
      name: 'Add Person',
    })
  );
};

const renderHelper = (
  opts: {
    usedNames?: string[];
    usedGroups?: string[];
  } = {}
) => {
  const { usedNames = [], usedGroups = [] } = opts;
  const onSubmit = jest.fn();

  const result = render(
    <PersonForm
      usedNames={usedNames}
      usedGroups={usedGroups}
      onSubmit={onSubmit}
    />
  );

  return {
    ...result,
    onSubmit,
  };
};

it('submits a new person without a group', async () => {
  const { onSubmit } = renderHelper();

  expect(screen.getByLabelText('Name')).toHaveValue('');
  expect(screen.getByLabelText('Group')).toHaveValue('');

  await act(async () => {
    await userEvent.type(screen.getByLabelText('Name'), 'Test 1');
  });

  addPerson();

  await waitFor(() => expect(screen.getByLabelText('Name')).toHaveValue(''));
  expect(screen.getByLabelText('Group')).toHaveValue('');

  expect(onSubmit).toHaveBeenCalledTimes(1);
  expect(onSubmit).toHaveBeenLastCalledWith({
    name: 'Test 1',
    group: undefined,
  });
});

it('submits a new person with a group', async () => {
  const { onSubmit } = renderHelper({ usedGroups: ['Group A', 'Group B'] });

  expect(screen.getByLabelText('Name')).toHaveValue('');
  expect(screen.getByLabelText('Group')).toHaveValue('');

  // I can't figure out how to query for a datalist, so this will do for now
  expect(screen.getByText('Group A')).toBeInTheDocument();
  expect(screen.getByText('Group B')).toBeInTheDocument();

  await act(async () => {
    await userEvent.type(screen.getByLabelText('Name'), 'Test 1');
  });

  await act(async () => {
    await userEvent.type(screen.getByLabelText('Group'), 'Group A');
  });

  addPerson();

  await waitFor(() => expect(screen.getByLabelText('Name')).toHaveValue(''));
  expect(screen.getByLabelText('Group')).toHaveValue('');

  expect(onSubmit).toHaveBeenCalledTimes(1);
  expect(onSubmit).toHaveBeenLastCalledWith({
    name: 'Test 1',
    group: 'Group A',
  });
});

it('validates that names are unique', async () => {
  const { onSubmit } = renderHelper({ usedNames: ['Test 1'] });

  expect(screen.getByLabelText('Name')).toHaveValue('');
  expect(screen.getByLabelText('Group')).toHaveValue('');

  await act(async () => {
    await userEvent.type(screen.getByLabelText('Name'), 'Test 1');
  });

  addPerson();

  expect(screen.getByLabelText('Name')).toHaveValue('Test 1');

  await waitFor(() => expect(screen.getByLabelText('Name')).toHaveFocus());
  expect(screen.queryByText('The name must be unique')).toBeInTheDocument();

  await act(async () => {
    await userEvent.clear(screen.getByLabelText('Name'));
    await userEvent.type(screen.getByLabelText('Name'), 'Test 2');
  });

  addPerson();

  await waitFor(() => expect(screen.getByLabelText('Name')).toHaveValue(''));
  expect(screen.getByLabelText('Group')).toHaveValue('');

  expect(onSubmit).toHaveBeenCalledTimes(1);
  expect(onSubmit).toHaveBeenLastCalledWith({
    name: 'Test 2',
    group: undefined,
  });
});
