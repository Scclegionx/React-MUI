import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { ISymbol } from 'app/shared/model/symbol.model';
import { getEntities as getSymbols } from 'app/entities/symbol/symbol.reducer';
import { IMatchOrderNew } from 'app/shared/model/match-order-new.model';
import { getEntity, updateEntity, createEntity, reset } from './match-order-new.reducer';

export const MatchOrderNewUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const symbols = useAppSelector(state => state.symbol.entities);
  const matchOrderNewEntity = useAppSelector(state => state.matchOrderNew.entity);
  const loading = useAppSelector(state => state.matchOrderNew.loading);
  const updating = useAppSelector(state => state.matchOrderNew.updating);
  const updateSuccess = useAppSelector(state => state.matchOrderNew.updateSuccess);

  const handleClose = () => {
    navigate('/match-order-new' + location.search);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getSymbols({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    values.transTime = convertDateTimeToServer(values.transTime);

    const entity = {
      ...matchOrderNewEntity,
      ...values,
      symbol: symbols.find(it => it.id.toString() === values.symbol.toString()),
    };

    if (isNew) {
      dispatch(createEntity(entity));
    } else {
      dispatch(updateEntity(entity));
    }
  };

  const defaultValues = () =>
    isNew
      ? {
          transTime: displayDefaultDateTime(),
        }
      : {
          ...matchOrderNewEntity,
          transTime: convertDateTimeFromServer(matchOrderNewEntity.transTime),
          symbol: matchOrderNewEntity?.symbol?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="vcbsGatewayOd2009FontendApp.matchOrderNew.home.createOrEditLabel" data-cy="MatchOrderNewCreateUpdateHeading">
            Create or edit a Match Order New
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew ? (
                <ValidatedField name="id" required readOnly id="match-order-new-id" label="ID" validate={{ required: true }} />
              ) : null}
              <ValidatedField
                label="Custody Code"
                id="match-order-new-custodyCode"
                name="custodyCode"
                data-cy="custodyCode"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField
                label="Custody Name"
                id="match-order-new-custodyName"
                name="custodyName"
                data-cy="custodyName"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField label="Grp Id" id="match-order-new-grpId" name="grpId" data-cy="grpId" type="text" />
              <ValidatedField label="Grp Name" id="match-order-new-grpName" name="grpName" data-cy="grpName" type="text" />
              <ValidatedField label="Side" id="match-order-new-side" name="side" data-cy="side" type="text" />
              <ValidatedField label="Quantity" id="match-order-new-quantity" name="quantity" data-cy="quantity" type="text" />
              <ValidatedField label="Price" id="match-order-new-price" name="price" data-cy="price" type="text" />
              <ValidatedField label="Exec Amount" id="match-order-new-execAmount" name="execAmount" data-cy="execAmount" type="text" />
              <ValidatedField
                label="Trans Time"
                id="match-order-new-transTime"
                name="transTime"
                data-cy="transTime"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField id="match-order-new-symbol" name="symbol" data-cy="symbol" label="Symbol" type="select">
                <option value="" key="0" />
                {symbols
                  ? symbols.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.symbolCode}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/match-order-new" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">Back</span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" data-cy="entityCreateSaveButton" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp; Save
              </Button>
            </ValidatedForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default MatchOrderNewUpdate;
