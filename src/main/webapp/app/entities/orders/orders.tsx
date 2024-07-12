import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Table, Row, Col } from 'reactstrap';
import { Translate, getSortState, TextFormat, JhiPagination, JhiItemCount, ValidatedField } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ASC, DESC, ITEMS_PER_PAGE, SORT } from 'app/shared/util/pagination.constants';
import { overridePaginationStateWithQueryParams } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IOrders } from 'app/shared/model/orders.model';
import { getEntities } from './orders.reducer';
import { format } from 'date-fns';
import { APP_LONGTIME_FORMAT, APP_SHORTTIME_FORMAT } from 'app/config/constants';

import axios from 'axios';
import { createAsyncThunk, isFulfilled, isPending, isRejected } from '@reduxjs/toolkit';



export const Orders = () => {
  const dispatch = useAppDispatch();

  const location = useLocation();
  const navigate = useNavigate();

  const [paginationState, setPaginationState] = useState(
    overridePaginationStateWithQueryParams(getSortState(location, ITEMS_PER_PAGE, 'id'), location.search)
  );

  const ordersList = useAppSelector(state => state.orders.entities);
  const loading = useAppSelector(state => state.orders.loading);
  const totalItems = useAppSelector(state => state.orders.totalItems);

  const getAllEntities = () => {
    dispatch(
      getEntities({
        page: paginationState.activePage - 1,
        size: paginationState.itemsPerPage,
        sort: `${paginationState.sort},${paginationState.order}`,
      })
    );
  };

  const sortEntities = () => {
    getAllEntities();
    const endURL = `?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`;
    if (location.search !== endURL) {
      navigate(`${location.pathname}${endURL}`);
    }
  };

  useEffect(() => {
    sortEntities();
  }, [paginationState.activePage, paginationState.order, paginationState.sort]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const page = params.get('page');
    const sort = params.get(SORT);
    if (page && sort) {
      const sortSplit = sort.split(',');
      setPaginationState({
        ...paginationState,
        activePage: +page,
        sort: sortSplit[0],
        order: sortSplit[1],
      });
    }
  }, [location.search]);

  const sort = p => () => {
    setPaginationState({
      ...paginationState,
      order: paginationState.order === ASC ? DESC : ASC,
      sort: p,
    });
  };

  const handlePagination = currentPage =>
    setPaginationState({
      ...paginationState,
      activePage: currentPage,
    });

  const handleSyncList = () => {
    sortEntities();
  };

  const apiUrl = 'api/orders';
  const updateVWAPPriceOrder = async (time) => {
    try {
      console.log("Time: ", time);
      const res = await axios.post(apiUrl + '/updateVWAP', { time });
      sortEntities();
    } catch (err) {

    }
  };


  const [time, setTime] = useState('09:32');

  const handleTimeChange = (e) => {
    setTime(e.target.value);
  };

  // useEffect(() => {
  //   updateVWAPPriceOrder();
  // }, [time]);



  const padingRow = {
    paddingTop: '30px',
    display: 'flex',
  };

  const padingCol = {
    display: 'flex',
  };

  const buttonBlue = {
    backgroundColor: '#007bff',
    color: '#fffff',
    display: 'flex',
  };

  const buttonRed = {
    backgroundColor: '#dc3545',
    color: '#fffff',
    display: 'flex',
  };

  const setVwapTime = (sTime) => {
    setTime(sTime);
    updateVWAPPriceOrder(sTime);
  };

  return (
    <div>
      <h2 id="orders-heading" data-cy="OrdersHeading">
        Đặt lệnh ban đầu
        <div>
          <Row style={padingRow} className="justify-content-left">
            <Col  md="1">
              <Button style={buttonBlue} className="btn btn-primary" onClick={() => setVwapTime(time)}>
                Đặt giờ VWAP
              </Button>
            </Col>

            <Col  md="1">
              <Button style={buttonRed} className="btn btn-primary" onClick={() => setVwapTime('')}>
                Hủy giờ VWAP
              </Button>
            </Col>


            <Col md="1">
              <ValidatedField style={padingCol}
                name='timeInput'
                type="time"
                id="timeInput"
                value={time}
                onChange={handleTimeChange}
                step="3600"
                min="00:00" max="23:59"
              />
            </Col>
          </Row>
        </div>

      </h2>
      <div className="table-responsive">
        {ordersList && ordersList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={sort('id')}>
                  ID lệnh <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  Quỹ <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('orderType')}>
                  Loại lệnh <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  Mã cổ phiếu <FontAwesomeIcon icon="sort" />
                </th>
                {/* <th>
                  Khối lượng <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  Giá <FontAwesomeIcon icon="sort" />
                </th> */}
                <th className="hand" onClick={sort('timeExcute')}>
                  Thời gian đặt <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('vwapTime')}>
                  Thời gian VWAP <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('description')}>
                  Ghi chú <FontAwesomeIcon icon="sort" />
                </th>
                <th className="isFollowed" >
                  Theo dõi
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {ordersList.map((orders, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/orders/${orders.id}`} color="link" size="sm">
                      {orders.id}
                    </Button>
                  </td>
                  <td>{orders.fund ? <Link to={`/fund/${orders.fund.id}`}>{orders.fund.fundCode}</Link> : ''}</td>
                  <td>{orders.orderType == 0 ? "Mua" : "Bán"}</td>
                  <td>{orders.symbol ? <Link to={`/symbol/${orders.symbol.id}`}>{orders.symbol.symbolCode}</Link> : ''}</td>
                  {/* <td>{Intl.NumberFormat('de-DE').format(orders.volume)}</td>
                  <td>{Intl.NumberFormat('de-DE').format(orders.price)}</td> */}
                  <td>{orders.timeExcute ? <TextFormat type="date" value={orders.timeExcute} format={APP_SHORTTIME_FORMAT} /> : null}</td>
                  <td>{orders.vwapTime}</td>
                  <td>{orders.description}</td>
                  <td>{orders.isFollowed ? "Có" : "Không"}</td>


                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`/orders/${orders.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`/orders/${orders.id}/edit?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
                        color="primary"
                        size="sm"
                        data-cy="entityEditButton"
                      >
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      {/* <Button
                        tag={Link}
                        to={`/orders/${orders.id}/delete?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
                        color="danger"
                        size="sm"
                        data-cy="entityDeleteButton"
                      >
                        <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                      </Button> */}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && <div className="alert alert-warning">No Orders found</div>
        )}
      </div>
      {totalItems ? (
        <div className={ordersList && ordersList.length > 0 ? '' : 'd-none'}>
          <div className="justify-content-center d-flex">
            <JhiItemCount page={paginationState.activePage} total={totalItems} itemsPerPage={paginationState.itemsPerPage} />
          </div>
          <div className="justify-content-center d-flex">
            <JhiPagination
              activePage={paginationState.activePage}
              onSelect={handlePagination}
              maxButtons={5}
              itemsPerPage={paginationState.itemsPerPage}
              totalItems={totalItems}
            />
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default Orders;
