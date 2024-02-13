import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Repository } from './github/repository';

@Injectable({
  providedIn: 'root',
})
export class GithubService {
  readonly baseUrl = 'https://api.github.com';
  constructor(private httpClient: HttpClient) {}

  getRepositories() {
    const headers = new HttpHeaders();
    headers.set(
      'authorization',
      `Bearer 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`,
    );
    return this.httpClient.get<Repository[]>(
      `${this.baseUrl}/users/yonguelink/repos`,
      { headers },
    );
  }
}
