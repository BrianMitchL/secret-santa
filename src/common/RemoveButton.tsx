import { MouseEventHandler } from 'react';
import X from './x.svg?react';

interface Props {
  onClick: MouseEventHandler<HTMLButtonElement>;
}

export function RemoveButton({ onClick }: Props) {
  return (
    <button onClick={onClick} className="muted" title="Remove" type="button">
      <span className="visually-hidden">Remove</span>
      <X aria-hidden />
    </button>
  );
}
