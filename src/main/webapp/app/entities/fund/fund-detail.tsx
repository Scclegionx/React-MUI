import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import {} from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './fund.reducer';

export const FundDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const fundEntity = useAppSelector(state => state.fund.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="fundDetailsHeading">Fund</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{fundEntity.id}</dd>
          <dt>
            <span id="fundCode">Fund Code</span>
          </dt>
          <dd>{fundEntity.fundCode}</dd>
          <dt>
            <span id="fundName">Fund Name</span>
          </dt>
          <dd>{fundEntity.fundName}</dd>
          <dt>
            <span id="custodyCode">Custody Code</span>
          </dt>
          <dd>{fundEntity.custodyCode}</dd>
          <dt>
            <span id="description">Description</span>
          </dt>
          <dd>{fundEntity.description}</dd>
        </dl>
        <Button tag={Link} to="/fund" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/fund/${fundEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

export default FundDetail;
