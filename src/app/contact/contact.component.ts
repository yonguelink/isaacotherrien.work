import { Component } from '@angular/core';
import {
  FormControl,
  Validators,
  ReactiveFormsModule,
  FormsModule,
  FormGroup,
  FormGroupDirective,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { EmailService } from '../email.service';

@Component({
  selector: 'contact',
  standalone: true,
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.sass',
})
export class ContactComponent {
  form = new FormGroup({
    subject: new FormControl('asdasdsda', [
      Validators.required,
      Validators.minLength(3),
    ]),
    message: new FormControl('asdasdaasdasdsd', [
      Validators.required,
      Validators.minLength(10),
    ]),
    name: new FormControl('asdasd', [Validators.required]),
    email: new FormControl('asdasd@asdasd', [
      Validators.required,
      Validators.email,
    ]),
  });
  sending = false;

  constructor(
    private emailService: EmailService,
    private snackBar: MatSnackBar,
  ) {}

  async sendEmail(formDirective: FormGroupDirective) {
    if (this.form.invalid) {
      return;
    }

    this.sending = true;

    await this.emailService.sendEmail(
      `${this.form.controls.subject.value}`,
      `From: ${this.form.controls.name.value} - ${this.form.controls.email.value}\n${this.form.controls.message.value}`,
    );

    this.snackBar.open('Message Received!', 'OK', {
      duration: 2000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: ['snack'],
    });

    formDirective.resetForm();
    this.form.reset();
    this.sending = false;
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
