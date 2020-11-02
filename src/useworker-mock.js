import { calculateSync } from 'gift-exchange';

export const useWorker = () => {
  const workerFn = async (people, exclusions) => {
    return calculateSync(people, exclusions).map((p, i) => [people[i], p]);
  };
  return [workerFn, { status: 'PENDING', kill: jest.fn() }];
};
