import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  private readonly token = 'i7uwnfm4qhzfyutyclmn3zi3';
  constructor() {}

  sendEmail(subject: string, text: string) {
    return fetch('https://postmail.invotes.com/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ access_token: this.token, subject, text }),
    });
  }
}
