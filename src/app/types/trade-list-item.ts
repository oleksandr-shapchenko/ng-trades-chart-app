export interface TradeListItem {
  id?: string;
  entryPrice: number;
  exitPrice: number;
  profit: number;
  /** @desc Date as UTC string */
  entryDate: string;
  exitDate: string;
}
