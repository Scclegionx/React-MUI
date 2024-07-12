import orders from 'app/entities/orders/orders.reducer';
import fund from 'app/entities/fund/fund.reducer';
import symbol from 'app/entities/symbol/symbol.reducer';
import hangOrder from 'app/entities/hang-order/hang-order.reducer';
import hangOrderNew from 'app/entities/hang-order-new/hang-order-new.reducer';
import matchOrder from 'app/entities/match-order/match-order.reducer';
import matchOrderNew from 'app/entities/match-order-new/match-order-new.reducer';
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

const entitiesReducers = {
  orders,
  fund,
  symbol,
  hangOrder,
  hangOrderNew,
  matchOrder,
  matchOrderNew,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
};

export default entitiesReducers;
