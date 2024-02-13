import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Project } from '../project';
import { ProjectsService } from '../projects.service';

@Component({
  selector: 'projects',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.sass',
})
export class ProjectsComponent {
  projects: Project[] = [];

  constructor(projectsService: ProjectsService) {
    projectsService
      .getProjects()
      .subscribe((projects) => (this.projects = projects));
  }

  openLink(link: URL) {
    window.open(link, '_blank');
  }
}
