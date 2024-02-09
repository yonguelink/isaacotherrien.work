import { Component } from '@angular/core';
import {
  FormControl,
  Validators,
  ReactiveFormsModule,
  Form,
  FormsModule,
  FormGroup,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'contact',
  standalone: true,
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.sass',
})
export class ContactComponent {
  form = new FormGroup({
    subject: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    message: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
    ]),
    name: new FormControl('', [Validators.required]),
  });

  sendEmail() {
    if (this.form.invalid) {
      return;
    }
    window.open(
      `mailto:isaac@isaacotherrien.work?subject=${this.form.controls.subject.value}&body=From: ${this.form.controls.name.value}\n${this.form.controls.message.value}`,
    );
  }

  getErrorMessage(validator: FormControl) {
    if (validator.errors?.['required']) {
      return 'You must enter a value';
    }

    if (validator.errors?.['minlength']) {
      return `At least ${validator.errors?.['minlength'].requiredLength} characters required`;
    }

    return validator.invalid ? 'Not a valid email' : '';
  }
}
