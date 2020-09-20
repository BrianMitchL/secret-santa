import * as React from 'react';

interface Props {
  pairs: [string, string][];
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
        {pairs.map((pair) => (
          <tr key={pair[0]}>
            <td>{pair[0]}</td>
            <td>{pair[1]}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
