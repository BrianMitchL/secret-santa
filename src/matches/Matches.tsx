import { useEffect, useLayoutEffect, useState } from 'react';
import { Exclusion, Person } from 'gift-exchange';
import { useWorker } from '@koale/useworker';
import { Pairs } from './Pairs';
import matchPairs from './match-pairs';
import './matches.css';

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
  const [error, setError] = useState<null | Error>(null);
  const [showGroups, setShowGroups] = useState(false);

  // needs to be a layout effect to prevent flashing when changing people
  useLayoutEffect(() => {
    setPairs([]);
  }, [people, exclusions]);

  const [workerFn, { status: workerStatus, kill: terminateWorker }] = useWorker(
    matchPairs,
    {
      autoTerminate: false,
      remoteDependencies: [giftExchangeUmdPath],
    },
  );

  useEffect(() => {
    if (workerStatus === 'ERROR') {
      setError(new Error(errorMessage));
    }
  }, [workerStatus]);

  useEffect(
    () => () => {
      terminateWorker();
    },
    [terminateWorker],
  );

  const calculateMatches = async () => {
    setError(null);
    try {
      setPairs(await workerFn(people, exclusions));
    } catch (e) {
      console.error(e);
      setError(new Error(errorMessage));
      setPairs([]);
    }
  };

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
      {error && <p className="error">{error.message}</p>}
      <Pairs pairs={error ? [] : pairs} showGroups={showGroups} />
    </>
  );
}
