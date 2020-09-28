import * as React from 'react';
import { Person } from 'gift-exchange';

interface Props {
  pairs: [Person, Person][];
  showGroups: boolean;
}

export function Pairs({ pairs, showGroups }: Props) {
  if (pairs.length < 1) {
    return null;
  }

  return (
    <table>
      <caption>Secret Santa Matches</caption>
      <thead>
        <tr>
          <th colSpan={showGroups ? 2 : 1}>Giver</th>
          <th colSpan={showGroups ? 2 : 1}>Receiver</th>
        </tr>
        {showGroups && (
          <tr>
            <th>Name</th>
            <th>Group</th>
            <th>Name</th>
            <th>Group</th>
          </tr>
        )}
      </thead>
      <tbody>
        {pairs.map(([a, b]) => (
          <tr key={a.name}>
            <td>{a.name}</td>
            {showGroups && <td>{a.group}</td>}
            <td>{b.name}</td>
            {showGroups && <td>{b.group}</td>}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
