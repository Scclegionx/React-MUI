import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import Fund from './fund';
import FundDetail from './fund-detail';
import FundUpdate from './fund-update';
import FundDeleteDialog from './fund-delete-dialog';

const FundRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<Fund />} />
    <Route path="new" element={<FundUpdate />} />
    <Route path=":id">
      <Route index element={<FundDetail />} />
      <Route path="edit" element={<FundUpdate />} />
      <Route path="delete" element={<FundDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default FundRoutes;
