import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './hang-order.reducer';

export const HangOrderDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const hangOrderEntity = useAppSelector(state => state.hangOrder.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="hangOrderDetailsHeading">Hang Order</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{hangOrderEntity.id}</dd>
          <dt>
            <span id="custodyCode">Custody Code</span>
          </dt>
          <dd>{hangOrderEntity.custodyCode}</dd>
          <dt>
            <span id="custodyName">Custody Name</span>
          </dt>
          <dd>{hangOrderEntity.custodyName}</dd>
          <dt>
            <span id="execType">Exec Type</span>
          </dt>
          <dd>{hangOrderEntity.execType}</dd>
          <dt>
            <span id="quantity">Quantity</span>
          </dt>
          <dd>{hangOrderEntity.quantity}</dd>
          <dt>
            <span id="execPrice">Exec Price</span>
          </dt>
          <dd>{hangOrderEntity.execPrice}</dd>
          <dt>
            <span id="transTime">Trans Time</span>
          </dt>
          <dd>
            {hangOrderEntity.transTime ? <TextFormat value={hangOrderEntity.transTime} type="date" format={APP_DATE_FORMAT} /> : null}
          </dd>
          <dt>Symbol</dt>
          <dd>{hangOrderEntity.symbol ? hangOrderEntity.symbol.symbolCode : ''}</dd>
        </dl>
        <Button tag={Link} to="/hang-order" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/hang-order/${hangOrderEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

export default HangOrderDetail;
