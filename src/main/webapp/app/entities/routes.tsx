import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import Orders from './orders';
import Fund from './fund';
import Symbol from './symbol';
import HangOrder from './hang-order';
import HangOrderNew from './hang-order-new';
import MatchOrder from './match-order';
import MatchOrderNew from './match-order-new';
/* jhipster-needle-add-route-import - JHipster will add routes here */

export default () => {
  return (
    <div>
      <ErrorBoundaryRoutes>
        {/* prettier-ignore */}
        <Route path="orders/*" element={<Orders />} />
        <Route path="fund/*" element={<Fund />} />
        <Route path="symbol/*" element={<Symbol />} />
        <Route path="hang-order/*" element={<HangOrder />} />
        <Route path="hang-order-new/*" element={<HangOrderNew />} />
        <Route path="match-order/*" element={<MatchOrder />} />
        <Route path="match-order-new/*" element={<MatchOrderNew />} />
        {/* jhipster-needle-add-route-path - JHipster will add routes here */}
      </ErrorBoundaryRoutes>
    </div>
  );
};
