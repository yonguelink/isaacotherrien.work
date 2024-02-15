import { Injectable } from '@angular/core';
import { Project } from './project';
import { GithubService } from './github.service';
import { map, mergeMap, toArray } from 'rxjs';
import { Repository } from './github/repository';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  projects: Project[] = [
    {
      description: $localize`Taxprep dashboard (now apparently CCH iFirm® Tracking)`,
      link: new URL(
        'https://www.wolterskluwer.com/en-ca/solutions/cch-ifirm/cch-ifirm-tracking',
      ),
      name: $localize`A PoC of what is now CCH iFirm Tracking, a trello board for accountants' tax season`,
    },
    {
      description: $localize`Hackaton: git for Taxprep`,
      link: new URL('https://github.com/Normis/VikingFS'),
      name: $localize`VikingFS`,
    },
    {
      description: $localize`Aster's Telescope Control`,
      link: new URL('https://www.asterbsl.ca/'),
      name: $localize`A website connected to a telescope, allowing clients to reserve & use the telescope to take pictures`,
    },
  ];
  constructor(private githubService: GithubService) {}

  private sortRepositories(a: Repository, b: Repository): number {
    if (a.pushedAt! < b.pushedAt!) {
      return 1;
    }
    if (a.pushedAt! > b.pushedAt!) {
      return -1;
    }
    return 0;
  }

  getProjects() {
    return this.githubService.getRepositories().pipe(
      mergeMap((repositories) =>
        repositories
          .map((repository) => {
            repository.pushedAt = new Date(repository.pushed_at);
            return repository;
          })
          .filter(
            (repository) =>
              !repository.fork &&
              !repository.disabled &&
              repository.pushedAt !== undefined &&
              repository.description !== null &&
              repository.language !== null &&
              repository.owner.login === 'yonguelink',
          )
          .sort(this.sortRepositories)
          // limit to 10 projects to keep this sightly & reduce load on GitHub's API
          .slice(0, 10),
      ),
      mergeMap((repository) =>
        this.githubService.getRepositoryImage(repository),
      ),
      toArray(),
      map((repositories) => repositories.sort(this.sortRepositories)),
      map((repositories) =>
        repositories.map(
          (repository) =>
            <Project>{
              name: repository.name,
              description: repository.description,
              link: repository.homepage || repository.html_url,
              image: repository.image,
              updatedAt: new Date(repository.pushed_at),
            },
        ),
      ),
      map((repositories) => repositories.concat(this.projects)),
    );
  }
}
