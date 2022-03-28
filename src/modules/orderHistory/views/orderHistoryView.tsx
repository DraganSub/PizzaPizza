import React, { useEffect, useState } from 'react';
import '../styles/orderHistoryViewStyles.css';
import PizzaPlaceholder from '../../../assets/images/order-history-placeholder.png';
import { Button, Pagination } from '../../../components';
import { Link } from 'react-router-dom';
import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/rootReducer';
import { getOrderHistory } from '../redux';
import { IOrderHistory } from '../redux/types';

export const OrderHistoryView: FC = () => {
  const { user } = useSelector((state: RootState) => state.authUser);
  const { orderHistory, loading } = useSelector(
    (state: RootState) => state.orderHistory
  );
  const dispatch = useDispatch();
  const [data, setData] = useState<IOrderHistory[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage] = useState(4);

  useEffect(() => {
    if (!loading) {
      dispatch(getOrderHistory(user?.id!));
    } else if (orderHistory.length === 0) {
      dispatch(getOrderHistory(user?.id!));
    }
  }, [dispatch, data]);

  useEffect(() => {
    if (orderHistory.length > 0) {
      const list = orderHistory.slice();
      setData(list);
    } else {
      setData([]);
    }
  }, [orderHistory]);

  const indexOfLastPost = currentPage * dataPerPage;
  const indexOfFirstPost = indexOfLastPost - dataPerPage;
  const currentData = data.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  return (
    <div className="orderHistory_container">
      {!loading ? (
        <h1>There is no order history</h1>
      ) : (
        <section className="order-history">
          <div className="order-history-wrap">
            <table className="table">
              <thead className="table__head">
                <tr className="table__row">
                  <th className="table__head__elem"></th>
                  <th className="table__head__elem">Status</th>
                  <th className="table__head__elem">Date</th>
                  <th className="table__head__elem">Price</th>
                </tr>
              </thead>
              <tbody className="table__body">
                {orderHistory &&
                  currentData.map(item => {
                    console.log(item);
                    return (
                      <tr className="table__row" key={item.id}>
                        <td className="table__elem table__elem--pizza-placeholder">
                          <img
                            src={PizzaPlaceholder}
                            alt="pizzaPlaceholder"
                            className="table__elem--img"
                          />
                        </td>
                        <td
                          className={`table__head__elem table__elem--progress ${
                            item.progress === 'in progress'
                              ? 'table__elem--is-inProgress'
                              : 'table__elem--is-done'
                          }`}
                        >
                          {item.progress}
                        </td>
                        <td className="table__elem table__elem--createdAt">
                          {item.createdAt}
                        </td>
                        <td className="table__elem table__elem--total-price">
                          ${item.totalPrice}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
          <Pagination
            dataPerPage={dataPerPage}
            setCurrentData={paginate}
            totalData={data.length}
          />

          <div className="btn-toHome">
            <Link to="/">
              <Button
                className="is-active"
                custom__class="toHome-center"
                size="lg"
              >
                Buy more Pizza! Pizza!
              </Button>
            </Link>
          </div>
        </section>
      )}
    </div>
  );
};
