import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT, APP_LONGTIME_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './orders.reducer';

export const OrdersDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const ordersEntity = useAppSelector(state => state.orders.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="ordersDetailsHeading">Chi tiết đặt lệnh</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID lệnh</span>
          </dt>
          <dd>{ordersEntity.id}</dd>

          <dt>Quỹ</dt>
          <dd>{ordersEntity.fund ? ordersEntity.fund.fundCode : ''}</dd>

          <dt>
            <span id="orderType">Loại lệnh</span>
          </dt>
          <dd>{ordersEntity.orderType==0?"Mua":"Bán"}</dd>

          <dt>Mã cổ phiếu</dt>
          <dd>{ordersEntity.symbol ? ordersEntity.symbol.symbolCode : ''}</dd>

          {/* <dt>
            <span id="volume">Khối lượng</span>
          </dt>
          <dd>{ordersEntity.volume}</dd>

          <dt>
            <span id="price">Giá</span>
          </dt>
          <dd>{Intl.NumberFormat('de-DE').format(ordersEntity.price)}</dd> */}

          <dt>
            <span id="timeExcute">Thời gian đặt</span>
          </dt>
          <dd>{ordersEntity.timeExcute ? <TextFormat type="date" value={ordersEntity.timeExcute} format={APP_LONGTIME_FORMAT} /> : null}</dd>

          <dt>
            <span id="vwapTime">Thời gian VWAP</span>
          </dt>
          <dd>{ordersEntity.vwapTime}</dd>

          <dt>
            <span id="description">Ghi chú</span>
          </dt>
          <dd>{ordersEntity.description}</dd>
          <dt>
            <span id="isFollowed">Theo dõi</span>
          </dt>
          <dd>{ordersEntity.isFollowed ? 'Có' : 'Không'}</dd>

        </dl>
        <Button tag={Link} to="/orders" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/orders/${ordersEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

export default OrdersDetail;
