import * as React from 'react';
import { PersonForm } from './form/person-form';
import { PeopleList } from './people-list';
import { Person } from 'gift-exchange';
import { Matches } from './matches';

const isString = (str: unknown): str is string => typeof str === 'string';

export function Main() {
  const [people, setPeople] = React.useState<Person[]>([]);

  const usedNames = React.useMemo(() => people.map((p) => p.name), [people]);
  const usedGroups = React.useMemo(
    () => [...new Set(people.map((p) => p.group).filter(isString))],
    [people]
  );

  const addPerson = (person: Person) => {
    setPeople((prev) => prev.concat(person));
  };

  const removePerson = (person: Person) => {
    setPeople((prevPeople) => prevPeople.filter((p) => p.name !== person.name));
  };

  return (
    <main>
      <PersonForm
        usedNames={usedNames}
        usedGroups={usedGroups}
        onSubmit={addPerson}
      />
      <hr />
      <PeopleList people={people} removePerson={removePerson} />
      <Matches people={people} />
    </main>
  );
}
