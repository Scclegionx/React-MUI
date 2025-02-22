import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { Translate, TextFormat, getSortState, JhiPagination, JhiItemCount } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ASC, DESC, ITEMS_PER_PAGE, SORT } from 'app/shared/util/pagination.constants';
import { overridePaginationStateWithQueryParams } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IHangOrderNew } from 'app/shared/model/hang-order-new.model';
import { getEntities } from './hang-order-new.reducer';

export const HangOrderNew = () => {
  const dispatch = useAppDispatch();

  const location = useLocation();
  const navigate = useNavigate();

  const [paginationState, setPaginationState] = useState(
    overridePaginationStateWithQueryParams(getSortState(location, ITEMS_PER_PAGE, 'id'), location.search)
  );

  const hangOrderNewList = useAppSelector(state => state.hangOrderNew.entities);
  const loading = useAppSelector(state => state.hangOrderNew.loading);
  const totalItems = useAppSelector(state => state.hangOrderNew.totalItems);

  const getAllEntities = () => {
    dispatch(
      getEntities({
        page: paginationState.activePage - 1,
        size: paginationState.itemsPerPage,
        sort: `${paginationState.sort},${paginationState.order}`,
      })
    );
  };

  const sortEntities = () => {
    getAllEntities();
    const endURL = `?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`;
    if (location.search !== endURL) {
      navigate(`${location.pathname}${endURL}`);
    }
  };

  useEffect(() => {
    sortEntities();
  }, [paginationState.activePage, paginationState.order, paginationState.sort]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const page = params.get('page');
    const sort = params.get(SORT);
    if (page && sort) {
      const sortSplit = sort.split(',');
      setPaginationState({
        ...paginationState,
        activePage: +page,
        sort: sortSplit[0],
        order: sortSplit[1],
      });
    }
  }, [location.search]);

  const sort = p => () => {
    setPaginationState({
      ...paginationState,
      order: paginationState.order === ASC ? DESC : ASC,
      sort: p,
    });
  };

  const handlePagination = currentPage =>
    setPaginationState({
      ...paginationState,
      activePage: currentPage,
    });

  const handleSyncList = () => {
    sortEntities();
  };

  return (
    <div>
      <h2 id="hang-order-new-heading" data-cy="HangOrderNewHeading">
        Hang Order News
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} /> Refresh list
          </Button>
          <Link to="/hang-order-new/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp; Create a new Hang Order New
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {hangOrderNewList && hangOrderNewList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={sort('id')}>
                  ID <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('custodyCode')}>
                  Custody Code <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('custodyName')}>
                  Custody Name <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('execType')}>
                  Exec Type <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('quantity')}>
                  Quantity <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('execPrice')}>
                  Exec Price <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('transTime')}>
                  Trans Time <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  Symbol <FontAwesomeIcon icon="sort" />
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {hangOrderNewList.map((hangOrderNew, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/hang-order-new/${hangOrderNew.id}`} color="link" size="sm">
                      {hangOrderNew.id}
                    </Button>
                  </td>
                  <td>{hangOrderNew.custodyCode}</td>
                  <td>{hangOrderNew.custodyName}</td>
                  <td>{hangOrderNew.execType}</td>
                  <td>{hangOrderNew.quantity}</td>
                  <td>{hangOrderNew.execPrice}</td>
                  <td>
                    {hangOrderNew.transTime ? <TextFormat type="date" value={hangOrderNew.transTime} format={APP_DATE_FORMAT} /> : null}
                  </td>
                  <td>
                    {hangOrderNew.symbol ? <Link to={`/symbol/${hangOrderNew.symbol.id}`}>{hangOrderNew.symbol.symbolCode}</Link> : ''}
                  </td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`/hang-order-new/${hangOrderNew.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`/hang-order-new/${hangOrderNew.id}/edit?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
                        color="primary"
                        size="sm"
                        data-cy="entityEditButton"
                      >
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`/hang-order-new/${hangOrderNew.id}/delete?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
                        color="danger"
                        size="sm"
                        data-cy="entityDeleteButton"
                      >
                        <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && <div className="alert alert-warning">No Hang Order News found</div>
        )}
      </div>
      {totalItems ? (
        <div className={hangOrderNewList && hangOrderNewList.length > 0 ? '' : 'd-none'}>
          <div className="justify-content-center d-flex">
            <JhiItemCount page={paginationState.activePage} total={totalItems} itemsPerPage={paginationState.itemsPerPage} />
          </div>
          <div className="justify-content-center d-flex">
            <JhiPagination
              activePage={paginationState.activePage}
              onSelect={handlePagination}
              maxButtons={5}
              itemsPerPage={paginationState.itemsPerPage}
              totalItems={totalItems}
            />
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default HangOrderNew;
