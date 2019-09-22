import React, { Fragment, FC } from 'react';
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
export const PeopleList: FC<PeopleListProps> = ({ people, removePerson }) => {
  const groups = people.reduce<
    Array<{
      group: string;
      people: Person[];
    }>
  >((acc, person) => {
    const group = acc.find(
      item => item.group === (person.group || UNDEFINED_GROUP)
    );
    if (group) {
      group.people.push(person);
    } else {
      acc.push({
        group: person.group || UNDEFINED_GROUP,
        people: [person]
      });
    }
    return acc;
  }, []);

  return (
    <dl>
      {groups.map(group => (
        <Fragment key={group.group}>
          <dt>
            {group.group === UNDEFINED_GROUP ? (
              <strong>No Group</strong>
            ) : (
              group.group
            )}
          </dt>
          {group.people.map(p => (
            <dd key={p.name}>
              {p.name}
              <button onClick={() => removePerson(p)}>Remove</button>
            </dd>
          ))}
        </Fragment>
      ))}
    </dl>
  );
};
