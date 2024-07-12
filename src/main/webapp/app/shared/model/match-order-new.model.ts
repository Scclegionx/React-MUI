import dayjs from 'dayjs';
import { ISymbol } from 'app/shared/model/symbol.model';

export interface IMatchOrderNew {
  id?: number;
  custodyCode?: string;
  custodyName?: string;
  grpId?: string | null;
  grpName?: string | null;
  side?: string | null;
  quantity?: number | null;
  price?: number | null;
  execAmount?: number | null;
  transTime?: string;
  symbol?: ISymbol | null;
}

export const defaultValue: Readonly<IMatchOrderNew> = {};
