
import { AbstractControl, ValidationErrors } from '@angular/forms';

export function imageTypeValidator(control: AbstractControl): ValidationErrors | null {
  if (control.value) {
    const file = control.value as File;
    const FileExtension=control.value.split('.').pop().toLowerCase();
    if (FileExtension!=='jpeg'&&FileExtension!=='jpg'&&FileExtension!=='png')
     {
      return { invalidImage:true};
     }
  }
  return null;
}

