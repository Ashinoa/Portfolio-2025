import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Aboutme } from './components/aboutme/aboutme';
import { Projects } from './components/projects/projects';


export const routes: Routes = [
    {path: '', component: Home},
    {path: 'aboutme', component: Aboutme},
    {path: '**', redirectTo: ''}

];
