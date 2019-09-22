import React, { FC } from 'react';

interface Props {
  pairs: [string, string][];
}

export const Pairs: FC<Props> = ({ pairs }) => {
  return (
    <div className="responsive-table">
      <table>
        <caption>Secret Santa Matches</caption>
        <thead>
          <tr>
            <th>Giver</th>
            <th>Receiver</th>
          </tr>
        </thead>
        <tbody>
          {pairs.map(pair => (
            <tr key={pair[0]}>
              <td>{pair[0]}</td>
              <td>{pair[1]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
