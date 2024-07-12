import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import HangOrderNew from './hang-order-new';
import HangOrderNewDetail from './hang-order-new-detail';
import HangOrderNewUpdate from './hang-order-new-update';
import HangOrderNewDeleteDialog from './hang-order-new-delete-dialog';

const HangOrderNewRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<HangOrderNew />} />
    <Route path="new" element={<HangOrderNewUpdate />} />
    <Route path=":id">
      <Route index element={<HangOrderNewDetail />} />
      <Route path="edit" element={<HangOrderNewUpdate />} />
      <Route path="delete" element={<HangOrderNewDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default HangOrderNewRoutes;
