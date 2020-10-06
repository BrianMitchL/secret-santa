import * as React from 'react';
import { Person } from 'gift-exchange';
import VisuallyHidden from '@reach/visually-hidden';
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
  const groups = React.useMemo(() => mapPeopleByGroup(people), [people]);

  if (!people.length) {
    return null;
  }

  return (
    <>
      <h3 id="added-people-heading">Added People</h3>
      <ul aria-labelledby="added-people-heading">
        {groups.map((group) => (
          <li key={group.group ?? UNDEFINED_GROUP}>
            <>
              <VisuallyHidden>Group </VisuallyHidden>
              {group.group === null ? 'No Group' : group.group}
            </>
            <ul>
              {group.people.map((p) => (
                <li key={p.name}>
                  {p.name} <RemoveButton onClick={() => removePerson(p)} />
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </>
  );
}
