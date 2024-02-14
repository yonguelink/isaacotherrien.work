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
      // image: new URL(
      //   'https://isaacotherrien.work/images/fulls/isaacotherrien.png',
      // ),
      name: $localize`A PoC of what is now CCH iFirm Tracking, a trello board for accountants' tax season`,
    },
    {
      description: $localize`Hackaton: git for Taxprep`,
      link: new URL('https://github.com/Normis/VikingFS'),
      // image: new URL(
      //   'https://isaacotherrien.work/images/fulls/isaacotherrien.png',
      // ),
      name: $localize`VikingFS`,
    },
    {
      description: $localize`Aster's website`,
      link: new URL('https://isaacotherrien.work/'),
      // image: new URL(
      //   'https://isaacotherrien.work/images/fulls/isaacotherrien.png',
      // ),
      name: $localize`Aster's website`,
    },
  ];
  constructor(private githubService: GithubService) {}

  private sortRepositories(a: Repository, b: Repository) {
    if (a.pushed_at >= b.pushed_at) {
      return 0;
    }
    return 1;
  }

  getProjects() {
    return this.githubService.getRepositories().pipe(
      mergeMap((repositories) =>
        repositories
          .filter(
            (repository) =>
              !repository.fork &&
              !repository.disabled &&
              repository.language !== null &&
              repository.owner.login === 'yonguelink',
          )
          .sort(this.sortRepositories)
          // limit to 10 projects to keep this sightly
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
            },
        ),
      ),
      map((repositories) => repositories.concat(this.projects)),
    );
  }
}
