import { Person } from 'gift-exchange';
import { mapPeopleByGroup } from './map-people-by-group';

it('preserves order when there are no groups', () => {
  const initialPeople: Person[] = ['X', 'Y', 'Z', 'A', 'B', 'C'].map(
    (name) => ({
      name,
    })
  );
  const expectedPeople: Person[] = ['X', 'Y', 'Z', 'A', 'B', 'C'].map(
    (name) => ({
      name,
    })
  );

  expect(mapPeopleByGroup(initialPeople)).toEqual([
    {
      group: null,
      people: expectedPeople,
    },
  ]);
});

it('preserves order when there is a group', () => {
  const group = 'Group A';
  const initialPeople: Person[] = ['X', 'Y', 'Z', 'A', 'B', 'C'].map(
    (name) => ({
      name,
      group,
    })
  );
  const expectedPeople: Person[] = ['X', 'Y', 'Z', 'A', 'B', 'C'].map(
    (name) => ({
      name,
      group,
    })
  );

  expect(mapPeopleByGroup(initialPeople)).toEqual([
    {
      group,
      people: expectedPeople,
    },
  ]);
});

it('sorts groups by group name, putting null group last', () => {
  const initialPeople: Person[] = [
    {
      name: 'X',
      group: 'Group B',
    },
    {
      name: 'Y',
      group: 'Group A',
    },
    {
      name: 'Z',
    },
    {
      name: 'A',
    },
    {
      name: 'B',
      group: 'Group A',
    },
    {
      name: 'C',
      group: 'Group B',
    },
  ];

  expect(mapPeopleByGroup(initialPeople)).toEqual([
    {
      group: 'Group A',
      people: [
        {
          name: 'Y',
          group: 'Group A',
        },
        {
          name: 'B',
          group: 'Group A',
        },
      ],
    },
    {
      group: 'Group B',
      people: [
        {
          name: 'X',
          group: 'Group B',
        },
        {
          name: 'C',
          group: 'Group B',
        },
      ],
    },
    {
      group: null,
      people: [
        {
          name: 'Z',
        },
        {
          name: 'A',
        },
      ],
    },
  ]);
});
