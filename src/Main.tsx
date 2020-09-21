import * as React from 'react';
import { PersonForm } from './form/person-form';
import { PeopleList } from './people-list';
import { Exclusion, Person } from 'gift-exchange';
import { Matches } from './matches';
import { exclusionKey } from './utils';
import { ExclusionsList } from './exclusions-list';
import { ExclusionForm } from './form/exclusion-form';

export interface EnhancedExclusion extends Exclusion {
  key: string;
}

const isString = (str: unknown): str is string => typeof str === 'string';

export function Main() {
  const [people, setPeople] = React.useState<Person[]>([]);
  const [exclusions, setExclusions] = React.useState<EnhancedExclusion[]>([]);

  const usedNames = React.useMemo(() => people.map((p) => p.name), [people]);
  const usedGroups = React.useMemo(
    () => [...new Set(people.map((p) => p.group).filter(isString))],
    [people]
  );
  const usedExclusionKeys = React.useMemo(() => exclusions.map((e) => e.key), [
    exclusions,
  ]);

  const addPerson = (person: Person) => {
    setPeople((prev) => prev.concat(person));
  };

  const removePerson = (person: Person) => {
    setPeople((prevPeople) => prevPeople.filter((p) => p.name !== person.name));
  };

  const addExclusion = (exclusion: Exclusion) => {
    setExclusions((prevExclusions) =>
      prevExclusions.concat({ ...exclusion, key: exclusionKey(exclusion) })
    );
  };

  const removeExclusion = (exclusionKey: string) => {
    setExclusions((prevExclusions) =>
      prevExclusions.filter((p) => p.key !== exclusionKey)
    );
  };

  return (
    <main>
      <PersonForm
        usedNames={usedNames}
        usedGroups={usedGroups}
        onSubmit={addPerson}
      />
      <hr />
      <ExclusionForm
        usedNames={usedNames}
        usedGroups={usedGroups}
        usedExclusionKeys={usedExclusionKeys}
        onSubmit={addExclusion}
      />
      <hr />
      <PeopleList people={people} removePerson={removePerson} />
      <ExclusionsList
        exclusions={exclusions}
        removeExclusion={removeExclusion}
      />
      <Matches people={people} exclusions={exclusions} />
    </main>
  );
}
