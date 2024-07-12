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
import { IHangOrderNew } from 'app/shared/model/hang-order-new.model';
import { getEntity, updateEntity, createEntity, reset } from './hang-order-new.reducer';

export const HangOrderNewUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const symbols = useAppSelector(state => state.symbol.entities);
  const hangOrderNewEntity = useAppSelector(state => state.hangOrderNew.entity);
  const loading = useAppSelector(state => state.hangOrderNew.loading);
  const updating = useAppSelector(state => state.hangOrderNew.updating);
  const updateSuccess = useAppSelector(state => state.hangOrderNew.updateSuccess);

  const handleClose = () => {
    navigate('/hang-order-new' + location.search);
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
      ...hangOrderNewEntity,
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
          ...hangOrderNewEntity,
          transTime: convertDateTimeFromServer(hangOrderNewEntity.transTime),
          symbol: hangOrderNewEntity?.symbol?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="vcbsGatewayOd2009FontendApp.hangOrderNew.home.createOrEditLabel" data-cy="HangOrderNewCreateUpdateHeading">
            Create or edit a Hang Order New
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
                <ValidatedField name="id" required readOnly id="hang-order-new-id" label="ID" validate={{ required: true }} />
              ) : null}
              <ValidatedField
                label="Custody Code"
                id="hang-order-new-custodyCode"
                name="custodyCode"
                data-cy="custodyCode"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField
                label="Custody Name"
                id="hang-order-new-custodyName"
                name="custodyName"
                data-cy="custodyName"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField label="Exec Type" id="hang-order-new-execType" name="execType" data-cy="execType" type="text" />
              <ValidatedField label="Quantity" id="hang-order-new-quantity" name="quantity" data-cy="quantity" type="text" />
              <ValidatedField label="Exec Price" id="hang-order-new-execPrice" name="execPrice" data-cy="execPrice" type="text" />
              <ValidatedField
                label="Trans Time"
                id="hang-order-new-transTime"
                name="transTime"
                data-cy="transTime"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField id="hang-order-new-symbol" name="symbol" data-cy="symbol" label="Symbol" type="select">
                <option value="" key="0" />
                {symbols
                  ? symbols.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.symbolCode}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/hang-order-new" replace color="info">
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

export default HangOrderNewUpdate;
