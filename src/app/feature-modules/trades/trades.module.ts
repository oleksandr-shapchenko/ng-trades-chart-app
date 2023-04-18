import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

import { TradesRoutingModule } from './trades-routing.module';
import { TradesRootComponent } from './pages/trades-root/trades-root.component';
import { TradesChartComponent } from './pages/trades-chart/trades-chart.component';
import { TradesComponent } from './pages/trades/trades.component';
import { TradeEditComponent } from './components/trade-edit/trade-edit.component';
import { TradesListComponent } from './components/trades-list/trades-list.component';

@NgModule({
  declarations: [TradeEditComponent, TradesChartComponent, TradesComponent, TradesListComponent, TradesRootComponent],
  imports: [CommonModule, RouterOutlet, TradesRoutingModule]
})
export class TradesModule {}
