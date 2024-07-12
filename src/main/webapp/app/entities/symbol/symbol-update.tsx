import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { ISymbol } from 'app/shared/model/symbol.model';
import { getEntity, updateEntity, createEntity, reset } from './symbol.reducer';

export const SymbolUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const symbolEntity = useAppSelector(state => state.symbol.entity);
  const loading = useAppSelector(state => state.symbol.loading);
  const updating = useAppSelector(state => state.symbol.updating);
  const updateSuccess = useAppSelector(state => state.symbol.updateSuccess);

  const handleClose = () => {
    navigate('/symbol' + location.search);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...symbolEntity,
      ...values,
    };

    if (isNew) {
      dispatch(createEntity(entity));
    } else {
      dispatch(updateEntity(entity));
    }
  };

  const defaultValues = () =>
    isNew
      ? {}
      : {
          ...symbolEntity,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="vcbsGatewayOd2009FontendApp.symbol.home.createOrEditLabel" data-cy="SymbolCreateUpdateHeading">
            Create or edit a Symbol
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew ? <ValidatedField name="id" required readOnly id="symbol-id" label="ID" validate={{ required: true }} /> : null}
              <ValidatedField
                label="Symbol Code"
                id="symbol-symbolCode"
                name="symbolCode"
                data-cy="symbolCode"
                type="text"
                validate={{
                  required: { value: true, message: 'Mã cổ phiếu không được để trống.' },
                }}
              />
              <ValidatedField
                label="Symbol Name"
                id="symbol-symbolName"
                name="symbolName"
                data-cy="symbolName"
                type="text"
                validate={{
                  required: { value: true, message: 'Tên cổ phiếu không được để trống.' },
                }}
              />
              <ValidatedField label="Description" id="symbol-description" name="description" data-cy="description" type="text" />
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/symbol" replace color="info">
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

export default SymbolUpdate;
