import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { ISymbol } from 'app/shared/model/symbol.model';
import { getEntities as getSymbols, getAllEntities as getSymbolsAll } from 'app/entities/symbol/symbol.reducer';
import { IFund } from 'app/shared/model/fund.model';
import { getEntities as getFunds } from 'app/entities/fund/fund.reducer';
import { IOrders } from 'app/shared/model/orders.model';
import { getEntity, updateEntity, createEntity, reset } from './orders.reducer';
import { format } from 'date-fns';

export const OrdersUpdate = () => {


  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const symbols = useAppSelector(state => state.symbol.entities);
  const funds = useAppSelector(state => state.fund.entities);
  const ordersEntity = useAppSelector(state => state.orders.entity);
  const loading = useAppSelector(state => state.orders.loading);
  const updating = useAppSelector(state => state.orders.updating);
  const updateSuccess = useAppSelector(state => state.orders.updateSuccess);

  const [dateTime, setDateTime] = useState('');

  const handleClose = () => {
    navigate('/orders' + location.search);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getSymbols({}));
    dispatch(getFunds({}));
  }, []);

  // Set default value to current date and time
  useEffect(() => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const defaultDateTime = `${year}-${month}-${day}T${hours}:${minutes}`;
    setDateTime(defaultDateTime);
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    values.isFollowed = values.isFollowed ? true : false;
    const entity = {
      ...ordersEntity,
      ...values,
      symbol: symbols.find(it => it.id.toString() === values.symbol.toString()),
      fund: funds.find(it => it.id.toString() === values.fund.toString()),
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
        isFollowed: true,
        }
      : {
        ...ordersEntity,
        symbol: ordersEntity?.symbol?.id,
        fund: ordersEntity?.fund?.id,
        isFollowed: ordersEntity.isFollowed,
      };

  const currentDate = new Date();

  const day = String(currentDate.getDate()).padStart(2, '0');
  const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0
  const year = currentDate.getFullYear();
  const hours = String(currentDate.getHours()).padStart(2, '0');
  const minutes = String(currentDate.getMinutes()).padStart(2, '0');

  const formattedDateTime = `${day}/${month}/${year} ${hours}:${minutes}`;

  const formatNumber = (value) => {
    const formatter = new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 3,
      maximumFractionDigits: 3
    });
    console.log('Formatted value:', formatter.format(value));
    return formatter.format(value);
  };

  // Format ngày và giờ hiện tại thành chuỗi có định dạng 'yyyy-mm-ddThh:mm'
  currentDate.setHours(currentDate.getHours() + 7);
  const currentDateTimeString = currentDate.toISOString().slice(0, 16);

  // function DateTimePicker() {
  //   const [selectedDate, setSelectedDate] = useState('');

  //   const handleChange = (event) => {
  //     setSelectedDate(event.target.value);
  //   };

  const handleChange = (event) => {
    const inputDateTime = event.target.value;
    // Perform your validation here
    // For example, you can check if the input is not empty
    setDateTime(inputDateTime);
  };


  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="vcbsGatewayOd2009FontendApp.orders.home.createOrEditLabel" data-cy="OrdersCreateUpdateHeading">
            {isNew ? "Thêm mới lệnh" : "Sửa lệnh"}
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew ? <ValidatedField name="id" required readOnly id="orders-id" label="ID" validate={{ required: true }} /> : null}

              <ValidatedField id="orders-fund" name="fund" data-cy="fund" label="Quỹ" type="select" validate={{
                required: { value: true, message: 'Thông tin quỹ không được để trống.' },
              }}>
                <option value="" key="0" />
                {funds
                  ? funds.map(otherEntity => (
                    <option value={otherEntity.id} key={otherEntity.id}>
                      {otherEntity.fundCode}
                    </option>
                  ))
                  : null}
              </ValidatedField>

              <ValidatedField id="orders-orderType" name="orderType" data-cy="orderType" label="Loại lệnh" type="select" validate={{
                required: { value: true, message: 'Loại lệnh không được để trống.' },
              }}>
                <option value="" key="-1" />
                <option value="0" key="0">Mua</option>
                <option value="1" key="1" >Bán</option>
              </ValidatedField>

              <ValidatedField id="orders-symbol" name="symbol" data-cy="symbol" label="Mã cổ phiếu" type="select" validate={{
                required: { value: true, message: 'Mã cổ phiếu không được để trống.' },
              }}>
                <option value="" key="0" />
                {symbols
                  ? symbols.map(otherEntity => (
                    <option value={otherEntity.id} key={otherEntity.id}>
                      {otherEntity.symbolCode}
                    </option>
                  ))
                  : null}
              </ValidatedField>
              {/* <ValidatedField
                label="Khối lượng"
                id="orders-volume"
                name="volume"
                data-cy="volume"
                type="text"
                validate={{
                  pattern: { value: /^\d+$/, message: 'Chỉ cho phép nhập giá trị số.' }
                }}
              />
              <ValidatedField
                label="Giá"
                id="orders-price"
                name="price"
                data-cy="price"
                type="text"
                validate={{
                  pattern: { value: /^\d+$/, message: 'Chỉ cho phép nhập giá trị số.' }
                }}
              /> */}
              <ValidatedField label="Thời gian" id="orders-timeExcute" name="timeExcute" data-cy="timeExcute" type="datetime-local" step="1"  />

              <ValidatedField type="time" label="Thời gian VWAP" id="orders-vwapTime" name="vwapTime" data-cy="vwapTime" />

              <ValidatedField label="Ghi chú" id="orders-description" name="description" data-cy="description" type="text" />
              <ValidatedField label="Theo dõi" id="isFollowed" name="isFollowed" data-cy="isFollowed" type="checkbox" value={ordersEntity.isFollowed} style={{display: 'block'}} />

              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/orders" replace color="info">
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

export default OrdersUpdate;
