import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, finalize, Observable, ReplaySubject, tap } from 'rxjs';

import { ApiService } from '../../../services/api.service';
import { TradeListItem } from '../../../types/trade-list-item';

@Injectable()
export class TradeStateService implements OnDestroy {
  public fullTradeList$ = new BehaviorSubject<TradeListItem[]>([]);
  public selectedTradeItem$ = new BehaviorSubject<TradeListItem | null>(null);
  public loading$ = new ReplaySubject<boolean>(1);

  constructor(private api: ApiService) {
    this._loadTradeList().subscribe((tradeList) => this.fullTradeList$.next(tradeList));
  }

  public ngOnDestroy() {
    this.fullTradeList$.complete();
  }

  public addTrade(trade: TradeListItem): Observable<TradeListItem> {
    return this._addTrade(trade).pipe(
      tap(() => {
        const currentState = this.fullTradeList$.value;
        const nextState = [trade, ...currentState].sort((a, b) => new Date(b.exitDate).getTime() - new Date(a.exitDate).getTime());
        this.fullTradeList$.next(nextState);
        this.selectedTradeItem$.next(null);
      })
    );
  }

  public deleteTrade(): Observable<TradeListItem> {
    return this._deleteTrade(this.selectedTradeItem$.value!).pipe(
      tap(() => {
        const currentState = this.fullTradeList$.value;
        const nextState = currentState.filter((t) => t.id !== this.selectedTradeItem$.value!.id);
        this.fullTradeList$.next(nextState);
        this.selectedTradeItem$.next(null);
      })
    );
  }

  public editTrade(trade: TradeListItem): Observable<TradeListItem> {
    return this._editTrade(trade).pipe(
      tap(() => {
        const currentState = this.fullTradeList$.value;
        const nextState = [trade, ...currentState.filter((t) => t.id !== trade.id)].sort(
          (a, b) => new Date(b.exitDate).getTime() - new Date(a.exitDate).getTime()
        );
        this.fullTradeList$.next(nextState);
      })
    );
  }

  private _loadTradeList(): Observable<TradeListItem[]> {
    this.loading$.next(true);
    return this.api.loadTradeList().pipe(finalize(() => this.loading$.next(false)));
  }

  private _addTrade(trade: TradeListItem): Observable<TradeListItem> {
    this.loading$.next(true);
    return this.api.addTrade(trade).pipe(finalize(() => this.loading$.next(false)));
  }

  private _deleteTrade(trade: TradeListItem): Observable<TradeListItem> {
    this.loading$.next(true);
    return this.api.deleteTrade(trade).pipe(finalize(() => this.loading$.next(false)));
  }

  private _editTrade(trade: TradeListItem): Observable<TradeListItem> {
    this.loading$.next(true);
    return this.api.editTrade(trade).pipe(finalize(() => this.loading$.next(false)));
  }
}
