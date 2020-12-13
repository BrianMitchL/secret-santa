import { ReactNode } from 'react';

interface Props {
  children?: ReactNode;
}

export function ValidationError({ children }: Props) {
  return <span className="validation">{children}</span>;
}
