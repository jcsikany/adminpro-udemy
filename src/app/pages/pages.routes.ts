import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { PagesComponent } from './pages.component';


const pagesRoutes: Routes = [
    {
         path: '',
      component: PagesComponent,
     children: [
        { path: 'dashboard', component: DashboardComponent },   
        { path: 'progress', component: ProgressComponent },
        { path: 'graficas1', component: Graficas1Component },
        { path: '', redirectTo:'/dashboard', pathMatch: 'full' }
     ] 
    }
];

//El forRoot se usa cuando es la ruta principal pero como estas son rutas q estan dentro de otras rutas
//O mejor dicho son router-outlet q estan dentro de otros router-outlet va 'forChild'
export const PAGES_ROUTES = RouterModule.forChild ( pagesRoutes );