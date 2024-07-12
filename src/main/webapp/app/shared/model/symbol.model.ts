import { IHangOrder } from 'app/shared/model/hang-order.model';
import { IHangOrderNew } from 'app/shared/model/hang-order-new.model';
import { IMatchOrder } from 'app/shared/model/match-order.model';
import { IMatchOrderNew } from 'app/shared/model/match-order-new.model';
import { IOrders } from 'app/shared/model/orders.model';

export interface ISymbol {
  id?: number;
  symbolCode?: string;
  symbolName?: string;
  description?: string | null;
  hangorders?: IHangOrder[] | null;
  hangordernews?: IHangOrderNew[] | null;
  matchorders?: IMatchOrder[] | null;
  matchordernews?: IMatchOrderNew[] | null;
  orders?: IOrders[] | null;
}

export const defaultValue: Readonly<ISymbol> = {};
