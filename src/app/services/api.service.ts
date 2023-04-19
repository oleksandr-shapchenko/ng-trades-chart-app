import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay, Observable, of } from 'rxjs';

import { TradeListItem } from '../types/trade-list-item';

@Injectable({ providedIn: 'root' })
export class ApiService {
  constructor(private http: HttpClient) {}

  public loadTradeList(): Observable<TradeListItem[]> {
    const url = '/assets/trades.json';
    return this.http.get<TradeListItem[]>(url).pipe(delay(2000));
  }

  public addTrade(trade: TradeListItem): Observable<TradeListItem> {
    const id = Math.floor(Math.random() * 9000 + 1000).toString();
    return of({ ...trade, id }).pipe(delay(2000));
  }

  public deleteTrade(trade: TradeListItem): Observable<TradeListItem> {
    return of(trade).pipe(delay(2000));
  }

  public editTrade(trade: TradeListItem): Observable<TradeListItem> {
    return of(trade).pipe(delay(2000));
  }
}
