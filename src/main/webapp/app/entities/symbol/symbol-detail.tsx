import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import {} from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './symbol.reducer';

export const SymbolDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const symbolEntity = useAppSelector(state => state.symbol.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="symbolDetailsHeading">Symbol</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{symbolEntity.id}</dd>
          <dt>
            <span id="symbolCode">Symbol Code</span>
          </dt>
          <dd>{symbolEntity.symbolCode}</dd>
          <dt>
            <span id="symbolName">Symbol Name</span>
          </dt>
          <dd>{symbolEntity.symbolName}</dd>
          <dt>
            <span id="description">Description</span>
          </dt>
          <dd>{symbolEntity.description}</dd>
        </dl>
        <Button tag={Link} to="/symbol" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/symbol/${symbolEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

export default SymbolDetail;
