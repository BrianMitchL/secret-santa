import { calculateSync, Person } from 'gift-exchange';

beforeEach(() => {
  globalThis.GiftExchange = {
    calculateSync: jest.fn().mockImplementation(calculateSync),
  };
});

it('calls GiftExchange and maps people to pairs', () => {
  const matchPairs = require('./match-pairs').default;
  const input: Person[] = [
    {
      name: 'A',
    },
    { name: 'B' },
  ];

  expect(matchPairs(input)).toEqual([
    [
      {
        name: 'A',
      },
      {
        name: 'B',
      },
    ],
    [
      { name: 'B' },
      {
        name: 'A',
      },
    ],
  ]);
});
