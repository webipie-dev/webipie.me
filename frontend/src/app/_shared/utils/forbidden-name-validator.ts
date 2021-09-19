import { AbstractControl, FormControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function nameValidator(): ValidatorFn{
    const nameRegexp: RegExp = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
    return (control: AbstractControl): ValidationErrors | null => {
      const forbidden = nameRegexp.test(control.value);
      return forbidden ? {forbiddenName: {value: control.value}} : null ;
    };
  }

