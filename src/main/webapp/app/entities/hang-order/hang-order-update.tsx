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
import { IHangOrder } from 'app/shared/model/hang-order.model';
import { getEntity, updateEntity, createEntity, reset } from './hang-order.reducer';

export const HangOrderUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const symbols = useAppSelector(state => state.symbol.entities);
  const hangOrderEntity = useAppSelector(state => state.hangOrder.entity);
  const loading = useAppSelector(state => state.hangOrder.loading);
  const updating = useAppSelector(state => state.hangOrder.updating);
  const updateSuccess = useAppSelector(state => state.hangOrder.updateSuccess);

  const handleClose = () => {
    navigate('/hang-order' + location.search);
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
      ...hangOrderEntity,
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
          ...hangOrderEntity,
          transTime: convertDateTimeFromServer(hangOrderEntity.transTime),
          symbol: hangOrderEntity?.symbol?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="vcbsGatewayOd2009FontendApp.hangOrder.home.createOrEditLabel" data-cy="HangOrderCreateUpdateHeading">
            Create or edit a Hang Order
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew ? <ValidatedField name="id" required readOnly id="hang-order-id" label="ID" validate={{ required: true }} /> : null}
              <ValidatedField
                label="Custody Code"
                id="hang-order-custodyCode"
                name="custodyCode"
                data-cy="custodyCode"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField
                label="Custody Name"
                id="hang-order-custodyName"
                name="custodyName"
                data-cy="custodyName"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField label="Exec Type" id="hang-order-execType" name="execType" data-cy="execType" type="text" />
              <ValidatedField label="Quantity" id="hang-order-quantity" name="quantity" data-cy="quantity" type="text" />
              <ValidatedField label="Exec Price" id="hang-order-execPrice" name="execPrice" data-cy="execPrice" type="text" />
              <ValidatedField
                label="Trans Time"
                id="hang-order-transTime"
                name="transTime"
                data-cy="transTime"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField id="hang-order-symbol" name="symbol" data-cy="symbol" label="Symbol" type="select">
                <option value="" key="0" />
                {symbols
                  ? symbols.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.symbolCode}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/hang-order" replace color="info">
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

export default HangOrderUpdate;
