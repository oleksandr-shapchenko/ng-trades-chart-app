import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { EChartsOption } from 'echarts';

import { INITIAL_BALANCE } from '../../../../app.constant';
import { TradeStateService } from '../../services/trade-state.service';
import { TradeListItem } from '../../../../types/trade-list-item';

@Component({
  selector: 'app-trades-chart',
  templateUrl: './trades-chart.component.html',
  styleUrls: ['./trades-chart.component.scss']
})
export class TradesChartComponent implements OnInit {
  public initialBalance = INITIAL_BALANCE;
  public options: EChartsOption;

  private loadedTradeList: TradeListItem[];

  constructor(public tradeState: TradeStateService, private datePipe: DatePipe) {}

  ngOnInit(): void {
    this.tradeState.fullTradeList$.subscribe((tradeList) => {
      this.loadedTradeList = tradeList.slice().reverse();
      this.options = this.buildOptions();
    });
  }

  private buildOptions(): EChartsOption {
    const data = this.loadedTradeList.map((trade) => {
      this.initialBalance += trade.profit;
      return {
        name: new Date(trade.exitDate).toString(),
        value: [this.datePipe.transform(trade.exitDate, 'yyyy/MM/d')!, this.initialBalance]
      };
    });

    return {
      title: {
        text: 'Cumulative balance over time'
      },
      tooltip: {
        trigger: 'axis',
        formatter: (params: any) => {
          params = params[0];
          return this.datePipe.transform(params.name, 'dd/MM/yyyy HH:mm') + ' : ' + params.value[1];
        },
        axisPointer: {
          animation: false
        }
      },
      xAxis: {
        type: 'time',
        boundaryGap: ['5%', '5%'],
        splitLine: {
          show: false
        }
      },
      yAxis: {
        type: 'value',
        boundaryGap: [0, '100%']
      },
      series: [
        {
          type: 'line',
          data
        }
      ]
    };
  }
}
