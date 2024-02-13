import { Injectable } from '@angular/core';
import { Project } from './project';
import { GithubService } from './github.service';
import { map } from 'rxjs';

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

  getProjects() {
    return this.githubService.getRepositories().pipe(
      map((repositories) =>
        repositories
          .filter(
            (repository) =>
              !repository.fork &&
              !repository.disabled &&
              repository.language !== null &&
              repository.owner.login === 'yonguelink',
          )
          .sort((a, b) => {
            if (a.pushed_at >= b.pushed_at) {
              return 0;
            }
            return 1;
          })
          // limit to 10 projects to keep this sightly
          .slice(0, 10)
          .map(
            (repository) =>
              <Project>{
                name: repository.name,
                description: repository.description,
                link: repository.homepage || repository.html_url,
              },
          )
          .concat(this.projects),
      ),
    );
  }
}
