import { EnhancedExclusion } from '../Main';
import { RemoveButton } from '../common/RemoveButton';

interface Props {
  exclusions: EnhancedExclusion[];
  removeExclusion: (exclusionKey: EnhancedExclusion['key']) => void;
}

interface ExclusionItemProps {
  exclusion: EnhancedExclusion;
  removeHandler: () => void;
}

const ExclusionItem = ({ exclusion, removeHandler }: ExclusionItemProps) => (
  <li>
    <strong>{exclusion.subject}</strong> cannot give to{' '}
    {exclusion.excludedType === 'group' && 'group '}
    <strong>{exclusion.excludedSubject}</strong>{' '}
    <RemoveButton onClick={removeHandler} />
  </li>
);

export function Exclusions({ exclusions, removeExclusion }: Props) {
  if (!exclusions.length) {
    return null;
  }

  const names = exclusions.filter((e) => e.type === 'name');
  const groups = exclusions.filter((e) => e.type === 'group');

  return (
    <>
      <h3 id="added-exclusions-heading">Added Exclusions</h3>
      <ul aria-labelledby="added-exclusions-heading">
        {names.length > 0 && (
          <li>
            <span id="added-exclusions-person">Person</span>
            <ul aria-labelledby="added-exclusions-person">
              {names.map((e) => (
                <ExclusionItem
                  key={e.key}
                  exclusion={e}
                  removeHandler={() => removeExclusion(e.key)}
                />
              ))}
            </ul>
          </li>
        )}

        {groups.length > 0 && (
          <li>
            <span id="added-exclusions-group">Group</span>
            <ul aria-labelledby="added-exclusions-group">
              {groups.map((e) => (
                <ExclusionItem
                  key={e.key}
                  exclusion={e}
                  removeHandler={() => removeExclusion(e.key)}
                />
              ))}
            </ul>
          </li>
        )}
      </ul>
    </>
  );
}
