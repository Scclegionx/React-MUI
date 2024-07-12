import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import HangOrder from './hang-order';
import HangOrderDetail from './hang-order-detail';
import HangOrderUpdate from './hang-order-update';
import HangOrderDeleteDialog from './hang-order-delete-dialog';

const HangOrderRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<HangOrder />} />
    <Route path="new" element={<HangOrderUpdate />} />
    <Route path=":id">
      <Route index element={<HangOrderDetail />} />
      <Route path="edit" element={<HangOrderUpdate />} />
      <Route path="delete" element={<HangOrderDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default HangOrderRoutes;
