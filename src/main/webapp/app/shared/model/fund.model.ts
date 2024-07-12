import { IOrders } from 'app/shared/model/orders.model';

export interface IFund {
  id?: number;
  fundCode?: string;
  fundName?: string;
  description?: string | null;
  orders?: IOrders[] | null;
}

export const defaultValue: Readonly<IFund> = {};
