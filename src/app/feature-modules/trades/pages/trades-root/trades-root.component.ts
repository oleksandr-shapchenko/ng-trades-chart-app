import { Component } from '@angular/core';

import { TradeStateService } from '../../services/trade-state.service';

@Component({
  templateUrl: 'trades-root.component.html',
  styleUrls: ['trades-root.component.scss'],
  providers: [TradeStateService]
})
export class TradesRootComponent {
  public readonly links = ['list', 'chart'];
}
