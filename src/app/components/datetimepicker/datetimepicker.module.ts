import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';

import { DatetimepickerComponent } from './datetimepicker.component';

@NgModule({
  declarations: [DatetimepickerComponent],
  exports: [DatetimepickerComponent],
  imports: [CommonModule, MatDatepickerModule, MatNativeDateModule, MatInputModule, FormsModule],
  providers: [DatePipe]
})
export class DatetimepickerModule {}
