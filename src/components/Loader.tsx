import React, { FC } from 'react';
import './styles/loader.css';
export const Loader: FC = () => {
  return (
    <div className="loader">
      <div className="loader__child"></div>
      <div className="loader__child"></div>
      <div className="loader__child"></div>
      <div className="loader__child"></div>
    </div>
  );
};
