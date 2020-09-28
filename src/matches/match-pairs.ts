import { Exclusion, Person } from 'gift-exchange';

function matchPairs(people: Person[], exclusions?: Exclusion[]) {
  // @ts-ignore
  return (GiftExchange.calculateSync(people, {
    exclusions,
    timeout: 5000,
  }) as Person[]).map<[Person, Person]>((p, i) => [people[i], p]);
}

export default matchPairs;
