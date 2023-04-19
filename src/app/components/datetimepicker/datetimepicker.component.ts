import { Component, Input } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-datetimepicker',
  templateUrl: './datetimepicker.component.html',
  styleUrls: ['./datetimepicker.component.scss']
})
export class DatetimepickerComponent implements ControlValueAccessor {
  @Input() label: string;
  public value: Date | null;
  public date: Date | null;
  public time: string | null = '';
  public now = new Date();
  public disabled = false;

  public onChange(newValue: Date) {}
  public onTouched() {}

  constructor(public control: NgControl, private datePipe: DatePipe) {
    this.control.valueAccessor = this;
  }

  public writeValue(value: Date | null): void {
    if (!value) {
      this.value = this.date = this.time = value;
      return;
    }
    value = new Date(value);
    if (isNaN(value.getTime())) return;
    this.date = this.value = value;
    this.time = this.datePipe.transform(this.value, 'HH:mm')!;
  }
  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  public setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  public handleDateChange(date: Date) {
    this.date = date;
    this.updateValue();
  }

  public handleTimeChange(time: string) {
    this.time = time;
    this.updateValue();
  }

  private updateValue() {
    this.onTouched();

    if (!this.date || !this.time) return;

    const [hours, minutes] = this.time.split(':').map((e) => parseInt(e, 10));
    this.date.setHours(hours, minutes);
    this.value = this.date;
    this.onChange(this.value);
  }
}
