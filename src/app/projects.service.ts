import { Injectable } from '@angular/core';
import { Project } from './project';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  projects: Project[] = [
    {
      description: $localize`my personal website... I hope to make this evolve to be some kind of reference at some point for me (and possibly others)`,
      link: new URL('https://isaacotherrien.work/'),
      // image: new URL(
      //   'https://isaacotherrien.work/images/fulls/isaacotherrien.png',
      // ),
      name: $localize`isaacotherrien.work (this)`,
    },
    {
      description: $localize`Taxprep dashboard (now apparently CCH iFirm® Tracking)`,
      link: new URL('https://isaacotherrien.work/'),
      // image: new URL(
      //   'https://isaacotherrien.work/images/fulls/isaacotherrien.png',
      // ),
      name: $localize`Taxprep dashboard / CCH iFirm® Tracking`,
    },
    {
      description: $localize`SuperMetaBoard`,
      link: new URL('https://isaacotherrien.work/'),
      name: $localize`SuperMetaBoard`,
    },
    {
      description: $localize`VikingFS`,
      link: new URL('https://isaacotherrien.work/'),
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
    {
      description: $localize`public repos, TODO fetch from github`,
      link: new URL('https://isaacotherrien.work/'),
      name: $localize`public repos, TODO fetch from github`,
    },
  ];
  constructor() {}

  getProjects() {
    return this.projects;
  }
}
