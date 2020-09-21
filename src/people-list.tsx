import * as React from 'react';
import { Person } from 'gift-exchange';

/*
 we need to key on something when rendering the list of groups,
 hopefully no user will ever enter this GUID...
*/
const UNDEFINED_GROUP = 'fba449b5-deb3-400c-991c-4bac2bb1ad33';

interface PeopleListProps {
  people: Person[];
  removePerson: (person: Person) => void;
}

export function PeopleList({ people, removePerson }: PeopleListProps) {
  const groups = people.reduce<
    Array<{
      group: string | null;
      people: Person[];
    }>
  >((acc, person) => {
    const group = acc.find((item) => item.group === (person.group ?? null));
    if (group) {
      group.people.push(person);
    } else {
      acc.push({
        group: person.group ?? null,
        people: [person],
      });
    }
    return acc;
  }, []);

  return (
    <dl>
      {groups.map((group) => (
        <React.Fragment key={group.group ?? UNDEFINED_GROUP}>
          <dt>
            {group.group === null ? <strong>No Group</strong> : group.group}
          </dt>
          {group.people.map((p) => (
            <dd key={p.name}>
              {p.name} <button onClick={() => removePerson(p)}>Remove</button>
            </dd>
          ))}
        </React.Fragment>
      ))}
    </dl>
  );
}
