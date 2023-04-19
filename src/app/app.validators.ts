import { AbstractControl, ValidatorFn } from '@angular/forms';

export const dateRangeValidator =
  (startDateControl: AbstractControl, errorKey: string): ValidatorFn =>
  (endDateControl: AbstractControl) =>
    !endDateControl?.value || startDateControl.value < endDateControl.value ? null : { [errorKey]: true };
