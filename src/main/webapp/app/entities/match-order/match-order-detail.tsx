import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './match-order.reducer';

export const MatchOrderDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const matchOrderEntity = useAppSelector(state => state.matchOrder.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="matchOrderDetailsHeading">Match Order</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{matchOrderEntity.id}</dd>
          <dt>
            <span id="custodyCode">Custody Code</span>
          </dt>
          <dd>{matchOrderEntity.custodyCode}</dd>
          <dt>
            <span id="custodyName">Custody Name</span>
          </dt>
          <dd>{matchOrderEntity.custodyName}</dd>
          <dt>
            <span id="grpId">Grp Id</span>
          </dt>
          <dd>{matchOrderEntity.grpId}</dd>
          <dt>
            <span id="grpName">Grp Name</span>
          </dt>
          <dd>{matchOrderEntity.grpName}</dd>
          <dt>
            <span id="side">Side</span>
          </dt>
          <dd>{matchOrderEntity.side}</dd>
          <dt>
            <span id="quantity">Quantity</span>
          </dt>
          <dd>{matchOrderEntity.quantity}</dd>
          <dt>
            <span id="price">Price</span>
          </dt>
          <dd>{matchOrderEntity.price}</dd>
          <dt>
            <span id="execAmount">Exec Amount</span>
          </dt>
          <dd>{matchOrderEntity.execAmount}</dd>
          <dt>
            <span id="transTime">Trans Time</span>
          </dt>
          <dd>
            {matchOrderEntity.transTime ? <TextFormat value={matchOrderEntity.transTime} type="date" format={APP_DATE_FORMAT} /> : null}
          </dd>
          <dt>Symbol</dt>
          <dd>{matchOrderEntity.symbol ? matchOrderEntity.symbol.symbolCode : ''}</dd>
        </dl>
        <Button tag={Link} to="/match-order" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/match-order/${matchOrderEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

export default MatchOrderDetail;
