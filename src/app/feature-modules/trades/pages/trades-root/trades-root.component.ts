import { Component } from '@angular/core';

import { TradeStateService } from '../../services/trade-state.service';

@Component({
  template: '<router-outlet></router-outlet>',
  providers: [TradeStateService]
})
export class TradesRootComponent {}
