import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { TradeStateService } from '../../services/trade-state.service';
import { dateRangeValidator } from '../../../../app.validators';
import { TradeListItem } from '../../../../types/trade-list-item';
import { Nullable } from '../../../../types/utility/nullable';

@Component({
  selector: 'app-trade-edit',
  templateUrl: './trade-edit.component.html',
  styleUrls: ['./trade-edit.component.scss']
})
export class TradeEditComponent implements OnInit, OnDestroy {
  public form: FormGroup;
  public initialFormValue: Partial<Nullable<TradeListItem>>;

  private subs: Subscription = new Subscription();

  constructor(public tradeState: TradeStateService, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.buildForm();
  }

  public submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    if (!this.tradeState.selectedTradeItem$.value) {
      this.tradeState.addTrade(this.form.getRawValue()).subscribe();
      this.resetForm();
    } else {
      this.tradeState.editTrade(this.form.getRawValue()).subscribe();
    }
  }

  public deleteTrade() {
    this.subs.add(this.tradeState.deleteTrade().subscribe());
    this.resetForm();
  }

  public resetForm() {
    this.form.reset(this.initialFormValue);
  }

  private buildForm(): FormGroup {
    const entryDateControl = new FormControl(null, Validators.required);
    const exitDateControl = new FormControl(null, [Validators.required, dateRangeValidator(entryDateControl, 'invalidDateRange')]);
    const entryPriceControl = new FormControl(0, Validators.required);
    const exitPriceControl = new FormControl(0, Validators.required);
    const profitControl = new FormControl(0);
    const form = this.formBuilder.group({
      entryDate: entryDateControl,
      exitDate: exitDateControl,
      entryPrice: entryPriceControl,
      exitPrice: exitPriceControl,
      profit: profitControl
    });
    this.initialFormValue = form.getRawValue()!;

    this.subs.add(entryPriceControl.valueChanges.subscribe((value) => profitControl.setValue(exitPriceControl.value! - value!)));
    this.subs.add(exitPriceControl.valueChanges.subscribe((value) => profitControl.setValue(value! - entryPriceControl.value!)));
    this.subs.add(entryDateControl.valueChanges.subscribe(() => exitDateControl.updateValueAndValidity()));
    this.subs.add(
      this.tradeState.selectedTradeItem$.subscribe((value) => {
        if (value) this.form.patchValue(value);
      })
    );

    return form;
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
