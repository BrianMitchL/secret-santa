import { Exclusion, Person, calculate } from 'gift-exchange';

declare global {
  var GiftExchange: {
    calculate: typeof calculate;
  };
}

function matchPairs(people: Person[], exclusions?: Exclusion[]) {
  return (GiftExchange.calculate(people, {
    exclusions,
    timeout: 5000,
  }) as Person[]).map<[Person, Person]>((p, i) => [people[i], p]);
}

export default matchPairs;
