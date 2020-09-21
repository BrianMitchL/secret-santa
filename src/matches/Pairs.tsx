import * as React from 'react';
import { Person } from 'gift-exchange';

interface Props {
  pairs: [Person, Person][];
}

export function Pairs({ pairs }: Props) {
  return (
    <table>
      <caption>Secret Santa Matches</caption>
      <thead>
        <tr>
          <th>Giver</th>
          <th>Receiver</th>
        </tr>
      </thead>
      <tbody>
        {pairs.map(([a, b]) => (
          <tr key={a.name}>
            <td>
              {a.name}
              {a.group && ` ${a.group}`}
            </td>
            <td>
              {b.name}
              {b.group && ` ${b.group}`}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
