import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import MatchOrderNew from './match-order-new';
import MatchOrderNewDetail from './match-order-new-detail';
import MatchOrderNewUpdate from './match-order-new-update';
import MatchOrderNewDeleteDialog from './match-order-new-delete-dialog';

const MatchOrderNewRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<MatchOrderNew />} />
    <Route path="new" element={<MatchOrderNewUpdate />} />
    <Route path=":id">
      <Route index element={<MatchOrderNewDetail />} />
      <Route path="edit" element={<MatchOrderNewUpdate />} />
      <Route path="delete" element={<MatchOrderNewDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default MatchOrderNewRoutes;
