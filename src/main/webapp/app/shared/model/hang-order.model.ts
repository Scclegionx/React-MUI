import dayjs from 'dayjs';
import { ISymbol } from 'app/shared/model/symbol.model';

export interface IHangOrder {
  id?: number;
  custodyCode?: string;
  custodyName?: string;
  execType?: string | null;
  quantity?: number | null;
  execPrice?: number | null;
  transTime?: string;
  symbol?: ISymbol | null;
}

export const defaultValue: Readonly<IHangOrder> = {};
