import * as React from 'react';
import { calculate, Person } from 'gift-exchange';
import { Pairs } from './pairs';

interface Props {
  people: Person[];
}

export function Matches({ people }: Props) {
  const [pairs, setPairs] = React.useState<[string, string][]>([]);
  const [error, setError] = React.useState<null | Error>(null);

  // needs to be a layout effect to prevent flashing when changing people
  React.useLayoutEffect(() => {
    setPairs([]);
  }, [people]);

  const calculateMatches = async () => {
    try {
      const m = await calculate(people);
      setPairs(m.map((p, i) => [people[i].name, p.name]));
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
