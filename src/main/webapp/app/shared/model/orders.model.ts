import { ISymbol } from 'app/shared/model/symbol.model';
import { IFund } from 'app/shared/model/fund.model';

export interface IOrders {
  id?: number;
  timeExcute?: string | null;
  orderType?: number | null;
  orderState?: number | null;
  volume?: number | null;
  price?: number | null;
  state?: number | null;
  description?: string | null;
  symbol?: ISymbol | null;
  fund?: IFund | null;
}

export const defaultValue: Readonly<IOrders> = {};
