import React from 'react';
import { FC } from 'react';
import { PizzaSizeCard } from '.';
import { ISizeList } from '../../../const/constTypes';

interface IPizzaSize {
  pizzaSize: ISizeList[];
  handlePizzaSize: (index: number) => void;
}
export const PizzaSizeWrap: FC<IPizzaSize> = (props: IPizzaSize) => {
  return (
    <div className="size-box">
      {props.pizzaSize.map(({ size, isActive }, index) => {
        return (
          <PizzaSizeCard
            sizeContent={size}
            key={size}
            isSizeActive={isActive}
            handleSize={() => props.handlePizzaSize(index)}
          />
        );
      })}
    </div>
  );
};
