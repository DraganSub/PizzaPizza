import React from 'react';
import { ReactNode } from 'react';
import { Navigation } from '../components';

interface Props {
  children: ReactNode;
}

export const MainLayout: React.FunctionComponent<Props> = (props: Props) => {
  return (
    <div>
      <Navigation />
      <div>{props.children}</div>
    </div>
  );
};
