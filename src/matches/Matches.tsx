import './matches.css';

import { useWorker } from '@koale/useworker';
import type { Exclusion, Person } from 'gift-exchange';
import { useEffect, useState } from 'react';

import matchPairs from './match-pairs';
import { Pairs } from './Pairs';

interface Props {
  people: Person[];
  exclusions: Exclusion[];
}

const giftExchangeUmdPath =
  window.location.origin +
  import.meta.env.BASE_URL +
  (import.meta.env.PROD
    ? '/giftexchange.umd.production.js'
    : '/giftexchange.umd.development.js');

const errorMessage =
  'No matches are possible with the given people and exclusions, or there was an error with the matching Worker. Please try again or change your configuration to allow everyone to match with someone.';

export function Matches({ people, exclusions }: Props) {
  const [pairs, setPairs] = useState<[Person, Person][]>([]);
  const [error, setError] = useState<boolean>(false);
  const [showGroups, setShowGroups] = useState(false);

  const [workerFn, { status: workerStatus, kill: terminateWorker }] = useWorker(
    matchPairs,
    {
      autoTerminate: false,
      remoteDependencies: [giftExchangeUmdPath],
    },
  );

  useEffect(
    () => () => {
      terminateWorker();
    },
    [terminateWorker],
  );

  const calculateMatches = async () => {
    setError(false);
    try {
      setPairs(await workerFn(people, exclusions));
    } catch (e) {
      console.error(e);
      setError(true);
      setPairs([]);
    }
  };

  const errorDisplay = workerStatus === 'ERROR' || error ? errorMessage : false;

  return (
    <>
      <button
        onClick={calculateMatches}
        type="button"
        disabled={people.length < 1 || workerStatus === 'RUNNING'}
      >
        Match
      </button>{' '}
      <label>
        <input
          type="checkbox"
          onChange={() => setShowGroups((prevState) => !prevState)}
          checked={showGroups}
        />{' '}
        Show Groups
      </label>
      {errorDisplay ? <p className="error">{errorDisplay}</p> : null}
      <Pairs pairs={error ? [] : pairs} showGroups={showGroups} />
    </>
  );
}
