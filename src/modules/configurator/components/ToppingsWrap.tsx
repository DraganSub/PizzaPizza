import React from 'react';
import { FC } from 'react';
import { ToppingsCard } from './';
import { IIngredientsList } from '../../../const/constTypes';

interface IToppingsProps {
  ingredients: IIngredientsList[];
  totalPriceToppings: number;
  handleIngredients: (index: number, isActive: boolean) => void;
}

export const ToppingsWrap: FC<IToppingsProps> = (props: IToppingsProps) => {
  return (
    <div className="toppings">
      {props.ingredients.map(({ name, isActive, img }, index) => {
        return (
          <ToppingsCard
            key={img}
            imageSrc={img}
            toppingsName={name}
            isActiveTopping={isActive}
            handleTopping={() => props.handleIngredients(index, isActive)}
          />
        );
      })}
    </div>
  );
};
