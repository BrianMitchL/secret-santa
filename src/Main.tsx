import * as React from 'react';
import { PersonForm } from './people/PersonForm';
import { People } from './people/People';
import { Exclusion, Person } from 'gift-exchange';
import { Matches } from './matches/Matches';
import { exclusionKey } from './common/utils';
import { Exclusions } from './exclusions/Exclusions';
import { ExclusionForm } from './exclusions/ExclusionForm';
import { Section } from './common/Section';
import { Tab, TabList, TabPanels, Tabs, TabPanel } from '@reach/tabs';
import './common/tabs.css';
import { Seed } from './Seed';

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
      <section>
        <p>
          Create a matching of names for your gift exchange or Secret Santa. It
          supports grouping of people as well as directional exclusions based on
          the group or individual name to support all of your custom rules.
        </p>
        <Seed
          setPeople={setPeople}
          setExclusions={setExclusions}
          clean={people.length + exclusions.length === 0}
        />
      </section>
      <Tabs>
        <TabList>
          <Tab>People</Tab>
          <Tab>Exclusions</Tab>
          <Tab disabled={people.length < 1}>Matches</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <Section heading="People">
              <PersonForm
                usedNames={usedNames}
                usedGroups={usedGroups}
                onSubmit={addPerson}
              />
              <People people={people} removePerson={removePerson} />
            </Section>
          </TabPanel>
          <TabPanel>
            <Section heading="Exclusions">
              <ExclusionForm
                usedNames={usedNames}
                usedGroups={usedGroups}
                usedExclusionKeys={usedExclusionKeys}
                onSubmit={addExclusion}
              />
              <Exclusions
                exclusions={exclusions}
                removeExclusion={removeExclusion}
              />
            </Section>
          </TabPanel>
          <TabPanel>
            <Section heading="Matches">
              <Matches people={people} exclusions={exclusions} />
            </Section>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </main>
  );
}
