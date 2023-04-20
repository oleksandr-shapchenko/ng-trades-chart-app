import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { NgxEchartsModule } from 'ngx-echarts';

import { TradesRoutingModule } from './trades-routing.module';
import { LoaderModule } from '../../components/loader/loader.module';
import { DatetimepickerModule } from '../../components/datetimepicker/datetimepicker.module';
import { TradesRootComponent } from './pages/trades-root/trades-root.component';
import { TradesChartComponent } from './pages/trades-chart/trades-chart.component';
import { TradesComponent } from './pages/trades/trades.component';
import { TradeEditComponent } from './components/trade-edit/trade-edit.component';
import { TradesListComponent } from './components/trades-list/trades-list.component';

@NgModule({
  declarations: [TradeEditComponent, TradesChartComponent, TradesComponent, TradesListComponent, TradesRootComponent],
  imports: [
    CommonModule,
    RouterOutlet,
    TradesRoutingModule,
    MatTabsModule,
    MatButtonModule,
    LoaderModule,
    ReactiveFormsModule,
    DatetimepickerModule,
    NgxEchartsModule.forRoot({ echarts: () => import('echarts') })
  ]
})
export class TradesModule {}
