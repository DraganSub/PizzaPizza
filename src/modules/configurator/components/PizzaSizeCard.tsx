import React from 'react';
import { FC } from 'react';

interface IPizzaSizeProps {
  isSizeActive?: boolean;
  sizeContent: string;
  handleSize: () => void;
}
export const PizzaSizeCard: FC<IPizzaSizeProps> = (props: IPizzaSizeProps) => {
  return (
    <article
      onClick={props.handleSize}
      className={` ${
        props.isSizeActive
          ? 'size-box__element size-box__element--is-active'
          : 'size-box__element'
      }`}
    >
      {props.sizeContent}
    </article>
  );
};
