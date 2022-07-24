import { calculate, Person } from 'gift-exchange';
import matchPairs from './match-pairs';

beforeEach(() => {
  globalThis.GiftExchange = {
    calculate: vi.fn().mockImplementation(calculate),
  };
});

it('calls GiftExchange and maps people to pairs', () => {
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
