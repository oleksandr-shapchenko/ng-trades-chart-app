import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { TradeListItem } from '../../../../types/trade-list-item';

@Component({
  selector: 'app-trades-list',
  templateUrl: './trades-list.component.html',
  styleUrls: ['./trades-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TradesListComponent {
  @Input() tradeList: TradeListItem[];
  @Input() selectedTrade: TradeListItem;
  @Output() selectTrade = new EventEmitter<TradeListItem>();
}
