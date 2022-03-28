import React from 'react';
import { FC } from 'react';
import './styles/paginate.css';
interface IProps {
  totalData: any;
  dataPerPage: number;
  setCurrentData: (number: number) => void;
}
export const Pagination: FC<IProps> = (props: IProps) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(props.totalData / props.dataPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <ul className="pagination__list">
      {pageNumbers.map(number => (
        <li key={number} className="pagination__list-item">
          <button
            className="paginate__btn"
            onClick={() => props.setCurrentData(number)}
          >
            {number}
          </button>
        </li>
      ))}
    </ul>
  );
};
