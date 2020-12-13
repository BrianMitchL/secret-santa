import { ReactNode } from 'react';

interface Props {
  children?: ReactNode;
  heading: string;
}

export function Section({ children, heading }: Props) {
  return (
    <section>
      <h2>{heading}</h2>
      {children}
    </section>
  );
}
