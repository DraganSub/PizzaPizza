import React from 'react';
import { FC } from 'react';

interface IToppingsCardProps {
  imageSrc: string;
  toppingsName: string;
  isActiveTopping?: boolean;
  handleTopping?: () => void;
}
export const ToppingsCard: FC<IToppingsCardProps> = (
  props: IToppingsCardProps
) => {
  return (
    <article
      onClick={props.handleTopping}
      className={
        props.isActiveTopping
          ? ' toppings__card toppings__card--is-active'
          : 'toppings__card'
      }
    >
      <div
        className={`${
          props.isActiveTopping
            ? 'toppings__imgBox toppings__imgBox--is-active'
            : 'toppings__imgBox'
        }`}
      >
        <img className="toppings__img" src={props.imageSrc} alt="" />
      </div>
      <span className="toppings__name">{props.toppingsName}</span>
    </article>
  );
};
