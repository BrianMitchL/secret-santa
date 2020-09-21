import * as React from 'react';
import { EnhancedExclusion } from './Main';

interface Props {
  exclusions: EnhancedExclusion[];
  removeExclusion: (exclusionKey: EnhancedExclusion['key']) => void;
}

interface ExclusionItemProps {
  exclusion: EnhancedExclusion;
  removeHandler: () => void;
}

const ExclusionItem = ({ exclusion, removeHandler }: ExclusionItemProps) => (
  <dd>
    <strong>{exclusion.subject}</strong> cannot give to{' '}
    {exclusion.excludedType === 'group' && 'group '}
    <strong>{exclusion.excludedSubject}</strong>{' '}
    <button onClick={removeHandler}>Remove</button>
  </dd>
);

export function ExclusionsList({ exclusions, removeExclusion }: Props) {
  const names = exclusions.filter((e) => e.type === 'name');
  const groups = exclusions.filter((e) => e.type === 'group');

  return (
    <dl>
      {names.length > 0 && <dt>Person</dt>}
      {names.map((e) => (
        <ExclusionItem
          key={e.key}
          exclusion={e}
          removeHandler={() => removeExclusion(e.key)}
        />
      ))}
      {groups.length > 0 && <dt>Group</dt>}
      {groups.map((e) => (
        <ExclusionItem
          key={e.key}
          exclusion={e}
          removeHandler={() => removeExclusion(e.key)}
        />
      ))}
    </dl>
  );
}
