import { Injectable } from '@angular/core';
import { Project } from './project';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  projects: Project[] = [
    {
      description:
        'my personal website... I hope to make this evolve to be some kind of reference at some point for me (and possibly others)',
      link: new URL('https://isaacotherrien.work/'),
      image: new URL(
        'https://isaacotherrien.work/images/fulls/isaacotherrien.png',
      ),
      name: 'isaacotherrien.work (this)',
    },
    {
      description: 'Taxprep dashboard (now apparently CCH iFirm® Tracking)',
      link: new URL('https://isaacotherrien.work/'),
      image: new URL(
        'https://isaacotherrien.work/images/fulls/isaacotherrien.png',
      ),
      name: 'Taxprep dashboard / CCH iFirm® Tracking',
    },
    {
      description: 'SuperMetaBoard',
      link: new URL('https://isaacotherrien.work/'),
      name: 'SuperMetaBoard',
    },
    {
      description: 'VikingFS',
      link: new URL('https://isaacotherrien.work/'),
      image: new URL(
        'https://isaacotherrien.work/images/fulls/isaacotherrien.png',
      ),
      name: 'VikingFS',
    },
    {
      description: "Aster's website",
      link: new URL('https://isaacotherrien.work/'),
      image: new URL(
        'https://isaacotherrien.work/images/fulls/isaacotherrien.png',
      ),
      name: "Aster's website",
    },
    {
      description: 'public repos, TODO fetch from github',
      link: new URL('https://isaacotherrien.work/'),
      name: 'public repos, TODO fetch from github',
    },
  ];
  constructor() {}

  getProjects() {
    return this.projects;
  }
}
