import { MouseEventHandler } from 'react';
import VisuallyHidden from '@reach/visually-hidden';
import X from './x.svg?react';

interface Props {
  onClick: MouseEventHandler<HTMLButtonElement>;
}

export function RemoveButton({ onClick }: Props) {
  return (
    <button onClick={onClick} className="muted" title="Remove" type="button">
      <VisuallyHidden>Remove</VisuallyHidden>
      <X aria-hidden />
    </button>
  );
}
