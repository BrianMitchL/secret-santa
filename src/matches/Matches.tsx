import * as React from 'react';
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
  process.env.PUBLIC_URL +
  (process.env.NODE_ENV === 'production'
    ? '/gift-exchange.umd.production.min.js'
    : '/gift-exchange.umd.development.js');

export function Matches({ people, exclusions }: Props) {
  const [pairs, setPairs] = React.useState<[Person, Person][]>([]);
  const [error, setError] = React.useState<null | Error>(null);
  const [showGroups, setShowGroups] = React.useState(false);

  // needs to be a layout effect to prevent flashing when changing people
  React.useLayoutEffect(() => {
    setPairs([]);
  }, [people, exclusions]);

  const [workerFn, { status: workerStatus, kill: terminateWorker }] = useWorker(
    matchPairs,
    {
      autoTerminate: false,
      remoteDependencies: [giftExchangeUmdPath],
    }
  );

  React.useEffect(() => {
    if (workerStatus === 'ERROR') {
      setError(
        new Error(
          'There was an error with the matching Worker, please try again.'
        )
      );
    }
  }, [workerStatus]);

  React.useEffect(
    () => () => {
      terminateWorker();
    },
    [terminateWorker]
  );

  const calculateMatches = async () => {
    setError(null);
    workerFn(people, exclusions)
      .then((matches) => {
        setPairs(matches);
      })
      .catch((e) => {
        if (e.message.startsWith('DerangementError')) {
          setError(
            new Error(
              'No matches are possible with the given people and exclusions.'
            )
          );
        } else {
          setError(e);
        }
        setPairs([]);
      });
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
      {error && <span className="error">{error.message}</span>}
      <Pairs pairs={error ? [] : pairs} showGroups={showGroups} />
    </>
  );
}
