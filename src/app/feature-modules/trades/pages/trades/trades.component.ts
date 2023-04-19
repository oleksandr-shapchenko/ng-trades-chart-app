import { Component } from '@angular/core';

import { TradeStateService } from '../../services/trade-state.service';

@Component({
  selector: 'app-trades',
  templateUrl: './trades.component.html',
  styleUrls: ['./trades.component.scss']
})
export class TradesComponent {
  constructor(public tradeState: TradeStateService) {}
}
