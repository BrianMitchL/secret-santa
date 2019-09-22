import React, { FC, useLayoutEffect, useState } from 'react';
import { calculate, Person } from 'gift-exchange';
import { Pairs } from './pairs';

interface Props {
  people: Person[];
}

export const Matches: FC<Props> = ({ people }) => {
  const [pairs, setPairs] = useState<[string, string][]>([]);
  const [error, setError] = useState<null | Error>(null);

  // needs to be a layout effect to prevent flashing when changing people
  useLayoutEffect(() => {
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
};
