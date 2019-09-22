import React, { FC, useState } from 'react';
import './App.css';
import { PersonForm } from './form/person-form';
import { PeopleList } from './people-list';
import { Person } from 'gift-exchange';
import { Matches } from './matches';

const App: FC = () => {
  const [people, setPeople] = useState<Person[]>([]);

  const addPerson = (person: Person) => {
    setPeople(prev => prev.concat(person));
  };

  const removePerson = (person: Person) => {
    setPeople(prevPeople => prevPeople.filter(p => p.name !== person.name));
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Secret Santa</h1>
      </header>
      <main>
        <PersonForm people={people} onSubmit={addPerson} />
        <PeopleList people={people} removePerson={removePerson} />
        <Matches people={people} />
      </main>
    </div>
  );
};

export default App;
