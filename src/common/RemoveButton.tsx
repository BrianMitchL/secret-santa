import React, { MouseEventHandler } from 'react';
import VisuallyHidden from '@reach/visually-hidden';
import { ReactComponent as X } from './x.svg';

interface Props {
  onClick: MouseEventHandler<HTMLButtonElement>;
}

export function RemoveButton({ onClick }: Props) {
  return (
    <button onClick={onClick} className="muted" title="Remove">
      <VisuallyHidden>Remove</VisuallyHidden>
      <X aria-hidden />
    </button>
  );
}
