import * as React from 'react';

interface Props {
  children?: React.ReactNode;
}

export function ValidationError({ children }: Props) {
  return <span className="validation">{children}</span>;
}
