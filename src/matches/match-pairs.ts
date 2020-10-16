import { Exclusion, Person, calculateSync } from 'gift-exchange';

declare global {
  var GiftExchange: {
    calculateSync: typeof calculateSync;
  };
}

function matchPairs(people: Person[], exclusions?: Exclusion[]) {
  return (GiftExchange.calculateSync(people, {
    exclusions,
    timeout: 5000,
  }) as Person[]).map<[Person, Person]>((p, i) => [people[i], p]);
}

export default matchPairs;
