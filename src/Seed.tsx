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
  disabled?: boolean;
}

export function Seed({ setPeople, setExclusions, disabled }: Props) {
  const handleClick = () => {
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
  };

  return (
    <button onClick={handleClick} type="button" disabled={disabled}>
      Fill with Example Data
    </button>
  );
}
