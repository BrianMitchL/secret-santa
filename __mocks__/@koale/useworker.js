import { vi } from 'vitest';
import { calculate } from 'gift-exchange';

export const useWorker = () => {
  const workerFn = async (people, exclusions) => {
    return calculate(people, exclusions).map((p, i) => [people[i], p]);
  };
  return [workerFn, { status: 'PENDING', kill: vi.fn() }];
};
