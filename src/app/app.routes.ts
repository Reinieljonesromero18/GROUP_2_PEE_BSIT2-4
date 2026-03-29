import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { BlogPostComponent } from './pages/blog-post/blog-post';
import { AboutComponent } from './pages/about/about';
import { ReferencesComponent } from './pages/references/references';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'post/:slug',
    component: BlogPostComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'references',
    component: ReferencesComponent
  },
  {
    path: 'blog',
    component: HomeComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];
