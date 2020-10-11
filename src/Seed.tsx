import * as React from 'react';
import { Exclusion, Person } from 'gift-exchange';
import { exclusionKey } from './common/utils';
import { EnhancedExclusion } from './Main';

const date = new Date();

const names = Array.from(Array(12).keys()).map((num) => {
  date.setMonth(num);
  return date.toLocaleDateString(undefined, { month: 'long' });
});

interface Props {
  setPeople: (people: Person[]) => void;
  setExclusions: (exclusions: EnhancedExclusion[]) => void;
  clean: boolean;
}

export function Seed({ setPeople, setExclusions, clean }: Props) {
  const [pendingConfirm, setPendingConfirm] = React.useState(false);

  const handleClick = () => {
    if (clean || pendingConfirm) {
      setPeople(
        names.map((name, index) => ({
          name,
          group: (Math.floor(index % 3) + 1).toString(),
        }))
      );

      const es: Exclusion[] = [
        {
          type: 'group',
          subject: '1',
          excludedType: 'name',
          excludedSubject: names[1],
        },
        {
          type: 'name',
          subject: names[5],
          excludedType: 'group',
          excludedSubject: '2',
        },
      ];
      setExclusions(es.map((e) => ({ ...e, key: exclusionKey(e) })));
    }

    setPendingConfirm((prevState) => (!clean ? !prevState : false));
  };

  return (
    <button
      onClick={handleClick}
      type="button"
      className={pendingConfirm ? 'danger' : ''}
    >
      {pendingConfirm ? 'Are you sure?' : 'Fill with example data'}
    </button>
  );
}
