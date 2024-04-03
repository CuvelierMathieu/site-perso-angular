import { Component } from '@angular/core';
import { bootstrapFileEarmarkPdfFill, bootstrapGithub, bootstrapLinkedin } from '@ng-icons/bootstrap-icons';
import { matAlternateEmail } from '@ng-icons/material-icons/baseline';
import { heroHome } from '@ng-icons/heroicons/outline';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { RouterLink } from '@angular/router';

export const linkedInUrl: string = 'https://www.linkedin.com/in/mathieu%F0%9F%92%BB-cuvelier-736423156/';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgIconComponent, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  providers: [provideIcons({ 
    cv: bootstrapFileEarmarkPdfFill,
    home: heroHome,
    linkedIn: bootstrapLinkedin,
    github: bootstrapGithub,
    mailto: matAlternateEmail,
  })]
})
export class HeaderComponent {
  linkedInUrl: string = linkedInUrl;
}
