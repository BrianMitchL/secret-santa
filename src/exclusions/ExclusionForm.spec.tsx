import { render, screen, waitFor, within } from '@testing-library/react';
import { ExclusionForm } from './ExclusionForm';
import userEvent from '@testing-library/user-event';
import { Exclusion } from 'gift-exchange';
import { exclusionKey } from '../common/utils';

const setExclusion = (exclusion: Exclusion) => {
  const groupSource = screen.getByRole('group', { name: /source/i });

  userEvent.click(
    within(groupSource).getByRole('radio', {
      name: new RegExp(exclusion.type, 'i'),
    })
  );
  userEvent.selectOptions(
    within(groupSource).getByRole('combobox', { name: /subject/i }),
    [exclusion.subject]
  );

  const groupExcluded = screen.getByRole('group', { name: /excluded/i });
  userEvent.click(
    within(groupExcluded).getByRole('radio', {
      name: new RegExp(exclusion.excludedType, 'i'),
    })
  );
  userEvent.selectOptions(
    within(groupExcluded).getByRole('combobox', { name: /subject/i }),
    [exclusion.excludedSubject]
  );
};

const renderHelper = (
  opts: {
    usedNames?: string[];
    usedGroups?: string[];
    usedExclusionKeys?: string[];
  } = {}
) => {
  const {
    usedNames = ['Test 1', 'Test 2', 'Test 3'],
    usedGroups = ['Group A', 'Group B'],
    usedExclusionKeys = [],
  } = opts;
  const onSubmit = jest.fn();

  const utils = render(
    <ExclusionForm
      usedNames={usedNames}
      usedGroups={usedGroups}
      usedExclusionKeys={usedExclusionKeys}
      onSubmit={onSubmit}
    />
  );

  return {
    ...utils,
    onSubmit,
  };
};

it('adds a person to person exclusion', async () => {
  const { onSubmit } = renderHelper();

  setExclusion({
    type: 'name',
    subject: 'Test 1',
    excludedType: 'name',
    excludedSubject: 'Test 2',
  });

  userEvent.click(screen.getByRole('button', { name: /add exclusion/i }));

  await waitFor(() => expect(onSubmit).toHaveBeenCalledTimes(1));
  expect(onSubmit).toHaveBeenLastCalledWith({
    type: 'name',
    subject: 'Test 1',
    excludedType: 'name',
    excludedSubject: 'Test 2',
  });
});

it('adds a person to group exclusion', async () => {
  const { onSubmit } = renderHelper();

  setExclusion({
    type: 'name',
    subject: 'Test 1',
    excludedType: 'group',
    excludedSubject: 'Group B',
  });

  userEvent.click(screen.getByRole('button', { name: /add exclusion/i }));

  await waitFor(() => expect(onSubmit).toHaveBeenCalledTimes(1));
  expect(onSubmit).toHaveBeenLastCalledWith({
    type: 'name',
    subject: 'Test 1',
    excludedType: 'group',
    excludedSubject: 'Group B',
  });
});

it('adds a group to group exclusion', async () => {
  const { onSubmit } = renderHelper();

  setExclusion({
    type: 'group',
    subject: 'Group A',
    excludedType: 'group',
    excludedSubject: 'Group B',
  });

  userEvent.click(screen.getByRole('button', { name: /add exclusion/i }));

  await waitFor(() => expect(onSubmit).toHaveBeenCalledTimes(1));
  expect(onSubmit).toHaveBeenLastCalledWith({
    type: 'group',
    subject: 'Group A',
    excludedType: 'group',
    excludedSubject: 'Group B',
  });
});

it('validates that no duplicates can be added', async () => {
  const { onSubmit } = renderHelper({
    usedExclusionKeys: [
      exclusionKey({
        type: 'name',
        subject: 'Test 1',
        excludedType: 'group',
        excludedSubject: 'Group B',
      }),
    ],
  });

  setExclusion({
    type: 'name',
    subject: 'Test 1',
    excludedType: 'group',
    excludedSubject: 'Group B',
  });

  userEvent.click(screen.getByRole('button', { name: /add exclusion/i }));

  expect(
    await screen.findByText(/this exclusion already exists/i)
  ).toBeInTheDocument();

  expect(onSubmit).toHaveBeenCalledTimes(0);
});
