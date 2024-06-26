import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function nameValidator(): ValidatorFn{
    const nameRegexp: RegExp = /[!@#$%^&*()+=\[\]{};':"\\|,.<>\/?]/;
    return (control: AbstractControl): ValidationErrors | null => {
      const forbidden = nameRegexp.test(control.value);
      return forbidden ? {forbiddenName: {value: control.value}} : null ;
    };
  }

