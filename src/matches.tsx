import * as React from 'react';
import { calculate, Exclusion, Person } from 'gift-exchange';
import { Pairs } from './pairs';

interface Props {
  people: Person[];
  exclusions: Exclusion[];
}

export function Matches({ people, exclusions }: Props) {
  const [pairs, setPairs] = React.useState<[Person, Person][]>([]);
  const [error, setError] = React.useState<null | Error>(null);

  // needs to be a layout effect to prevent flashing when changing people
  React.useLayoutEffect(() => {
    setPairs([]);
  }, [people, exclusions]);

  const calculateMatches = async () => {
    try {
      const m = await calculate(people, exclusions);
      setPairs(m.map((p, i) => [people[i], p]));
    } catch (e) {
      setError(e);
      setPairs([]);
    }
  };

  return (
    <>
      <button
        onClick={() => {
          setError(null);
          calculateMatches();
        }}
        type="button"
        disabled={people.length < 1}
      >
        Match
      </button>
      {!error && pairs.length > 0 && <Pairs pairs={pairs} />}
      {error && error.message}
    </>
  );
}
