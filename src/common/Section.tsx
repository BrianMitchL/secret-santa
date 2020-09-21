import * as React from 'react';

interface Props {
  children?: React.ReactNode;
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
