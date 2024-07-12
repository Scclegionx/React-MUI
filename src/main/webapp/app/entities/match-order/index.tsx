import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import MatchOrder from './match-order';
import MatchOrderDetail from './match-order-detail';
import MatchOrderUpdate from './match-order-update';
import MatchOrderDeleteDialog from './match-order-delete-dialog';

const MatchOrderRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<MatchOrder />} />
    <Route path="new" element={<MatchOrderUpdate />} />
    <Route path=":id">
      <Route index element={<MatchOrderDetail />} />
      <Route path="edit" element={<MatchOrderUpdate />} />
      <Route path="delete" element={<MatchOrderDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default MatchOrderRoutes;
