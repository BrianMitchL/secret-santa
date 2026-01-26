import { calculate } from 'gift-exchange';
import { vi } from 'vitest';

export const useWorker = () => {
  const workerFn = async (people, exclusions) => {
    return calculate(people, exclusions).map((p, i) => [people[i], p]);
  };
  return [workerFn, { status: 'PENDING', kill: vi.fn() }];
};
