import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import Symbol from './symbol';
import SymbolDetail from './symbol-detail';
import SymbolUpdate from './symbol-update';
import SymbolDeleteDialog from './symbol-delete-dialog';

const SymbolRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<Symbol />} />
    <Route path="new" element={<SymbolUpdate />} />
    <Route path=":id">
      <Route index element={<SymbolDetail />} />
      <Route path="edit" element={<SymbolUpdate />} />
      <Route path="delete" element={<SymbolDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default SymbolRoutes;
