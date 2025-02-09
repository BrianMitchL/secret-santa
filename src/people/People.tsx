import { useMemo } from 'react';
import { Person } from 'gift-exchange';
import { RemoveButton } from '../common/RemoveButton';
import { mapPeopleByGroup } from './map-people-by-group';

/*
 we need to key on something when rendering the list of groups,
 hopefully no user will ever enter this GUID...
*/
const UNDEFINED_GROUP = 'fba449b5-deb3-400c-991c-4bac2bb1ad33';

interface PeopleListProps {
  people: Person[];
  removePerson: (person: Person) => void;
}

export function People({ people, removePerson }: PeopleListProps) {
  const groups = useMemo(() => mapPeopleByGroup(people), [people]);

  if (!people.length) {
    return null;
  }

  return (
    <>
      <h3 id="added-people-heading">Added People</h3>
      <ul aria-labelledby="added-people-heading">
        {groups.map((group) => {
          const groupId = `person-group-${group.group ?? UNDEFINED_GROUP}`;
          return (
            <li key={groupId}>
              <span id={groupId}>
                <span className="visually-hidden">Group </span>
                {group.group === null ? 'No Group' : group.group}
              </span>
              <ul aria-labelledby={groupId}>
                {group.people.map((p) => (
                  <li key={p.name}>
                    {p.name} <RemoveButton onClick={() => removePerson(p)} />
                  </li>
                ))}
              </ul>
            </li>
          );
        })}
      </ul>
    </>
  );
}
