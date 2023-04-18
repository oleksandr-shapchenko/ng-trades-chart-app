import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TradesRootComponent } from './pages/trades-root/trades-root.component';
import { TradesComponent } from './pages/trades/trades.component';
import { TradesChartComponent } from './pages/trades-chart/trades-chart.component';

const children: Routes = [
  { path: '', component: TradesComponent },
  { path: 'chart', component: TradesChartComponent }
];

const routes: Routes = [
  { path: '', component: TradesRootComponent, children },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TradesRoutingModule {}
