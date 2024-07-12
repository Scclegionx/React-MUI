import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IFund } from 'app/shared/model/fund.model';
import { getEntity, updateEntity, createEntity, reset } from './fund.reducer';

export const FundUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const fundEntity = useAppSelector(state => state.fund.entity);
  const loading = useAppSelector(state => state.fund.loading);
  const updating = useAppSelector(state => state.fund.updating);
  const updateSuccess = useAppSelector(state => state.fund.updateSuccess);

  const handleClose = () => {
    navigate('/fund' + location.search);
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
      ...fundEntity,
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
          ...fundEntity,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="vcbsGatewayOd2009FontendApp.fund.home.createOrEditLabel" data-cy="FundCreateUpdateHeading">
            Create or edit a Fund
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew ? <ValidatedField name="id" required readOnly id="fund-id" label="ID" validate={{ required: true }} /> : null}
              <ValidatedField
                label="Fund Code"
                id="fund-fundCode"
                name="fundCode"
                data-cy="fundCode"
                type="text"
                validate={{
                  required: { value: true, message: 'Mã quỹ không được để trống.' },
                }}
              />
              <ValidatedField
                label="Fund Name"
                id="fund-fundName"
                name="fundName"
                data-cy="fundName"
                type="text"
                validate={{
                  required: { value: true, message: 'Tên quỹ không được để trống.' },
                }}
              />
              <ValidatedField
                label="Custody Code"
                id="fund-custodyCode"
                name="custodyCode"
                data-cy="custodyCode"
                validate={{
                  required: { value: true, message: 'Mã tham chiếu không được để trống.' },
                }}
                type="text"
              />
              <ValidatedField label="Description" id="fund-description" name="description" data-cy="description" type="text" />
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/fund" replace color="info">
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

export default FundUpdate;
