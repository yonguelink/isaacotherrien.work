import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Repository } from './github/repository';
import { RepositoryImage } from './github/repository-image';
import { map } from 'rxjs';
import { GraphQlResponse } from './github/graphqlResponse';

@Injectable({
  providedIn: 'root',
})
export class GithubService {
  readonly baseUrl = 'https://api.github.com';
  constructor(private httpClient: HttpClient) {}

  getHeaders() {
    return new HttpHeaders().set(
      'authorization',
      // token from throwawaygithubaccount
      // TODO: Make this work in dev too plz
      `Bearer ${(<any>window).GITHUB_TOKEN}`,
    );
  }

  getRepositories() {
    return this.httpClient.get<Repository[]>(
      `${this.baseUrl}/users/yonguelink/repos`,
      { headers: this.getHeaders() },
    );
  }

  getRepositoryImage(repository: Repository) {
    const query = `{
      repository(owner: "${repository.owner.login}", name: "${repository.name}") {
        openGraphImageUrl
      }
    }`;
    return this.httpClient
      .post<
        GraphQlResponse<RepositoryImage>
      >(`${this.baseUrl}/graphql`, { query }, { headers: this.getHeaders() })
      .pipe(
        map((response) => {
          repository.image = response.data.repository.openGraphImageUrl;
          return repository;
        }),
      );
  }
}
