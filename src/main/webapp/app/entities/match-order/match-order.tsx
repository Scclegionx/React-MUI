import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { Translate, TextFormat, getSortState, JhiPagination, JhiItemCount } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ASC, DESC, ITEMS_PER_PAGE, SORT } from 'app/shared/util/pagination.constants';
import { overridePaginationStateWithQueryParams } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IMatchOrder } from 'app/shared/model/match-order.model';
import { getEntities } from './match-order.reducer';

export const MatchOrder = () => {
  const dispatch = useAppDispatch();

  const location = useLocation();
  const navigate = useNavigate();

  const [paginationState, setPaginationState] = useState(
    overridePaginationStateWithQueryParams(getSortState(location, ITEMS_PER_PAGE, 'id'), location.search)
  );

  const matchOrderList = useAppSelector(state => state.matchOrder.entities);
  const loading = useAppSelector(state => state.matchOrder.loading);
  const totalItems = useAppSelector(state => state.matchOrder.totalItems);

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
      <h2 id="match-order-heading" data-cy="MatchOrderHeading">
        Match Orders
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} /> Refresh list
          </Button>
          <Link to="/match-order/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp; Create a new Match Order
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {matchOrderList && matchOrderList.length > 0 ? (
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
                <th className="hand" onClick={sort('grpId')}>
                  Grp Id <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('grpName')}>
                  Grp Name <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('side')}>
                  Side <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('quantity')}>
                  Quantity <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('price')}>
                  Price <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('execAmount')}>
                  Exec Amount <FontAwesomeIcon icon="sort" />
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
              {matchOrderList.map((matchOrder, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/match-order/${matchOrder.id}`} color="link" size="sm">
                      {matchOrder.id}
                    </Button>
                  </td>
                  <td>{matchOrder.custodyCode}</td>
                  <td>{matchOrder.custodyName}</td>
                  <td>{matchOrder.grpId}</td>
                  <td>{matchOrder.grpName}</td>
                  <td>{matchOrder.side}</td>
                  <td>{matchOrder.quantity}</td>
                  <td>{matchOrder.price}</td>
                  <td>{matchOrder.execAmount}</td>
                  <td>{matchOrder.transTime ? <TextFormat type="date" value={matchOrder.transTime} format={APP_DATE_FORMAT} /> : null}</td>
                  <td>{matchOrder.symbol ? <Link to={`/symbol/${matchOrder.symbol.id}`}>{matchOrder.symbol.symbolCode}</Link> : ''}</td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`/match-order/${matchOrder.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`/match-order/${matchOrder.id}/edit?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
                        color="primary"
                        size="sm"
                        data-cy="entityEditButton"
                      >
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`/match-order/${matchOrder.id}/delete?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
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
          !loading && <div className="alert alert-warning">No Match Orders found</div>
        )}
      </div>
      {totalItems ? (
        <div className={matchOrderList && matchOrderList.length > 0 ? '' : 'd-none'}>
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

export default MatchOrder;
