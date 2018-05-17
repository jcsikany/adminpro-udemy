import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { PagesComponent } from './pages.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';

import { LoginGuardGuard } from '../services/guards/login-guard.guard';
import { AdminGuard, VerificaTokenGuard } from '../services/service.index';
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { HospitalesComponent } from './hospitales/hospitales.component';
import { MedicosComponent } from './medicos/medicos.component';
import { MedicoComponent } from './medicos/medico.component';
import { BusquedaComponent } from './busqueda/busqueda.component';


// a los componentes le agregamos un nuevo parametro q se llama data, alli adentro podemos agregar lo q queramos tener como informacion
// esto lo vamos a usar para mostrar el titulo en el breadcrumbs donde dice BlankPage
const pagesRoutes: Routes = [
    
        {
             path: 'dashboard', 
             component: DashboardComponent, 
             canActivate: [ VerificaTokenGuard ],
             data: { titulo: 'Dashboard' }
        },   
        { path: 'progress', component: ProgressComponent, data: { titulo: 'ProgressBars' } },
        { path: 'graficas1', component: Graficas1Component, data: { titulo: 'Gráficas' } },
        { path: 'promesas', component: PromesasComponent, data: { titulo: 'Promesas' } },
        { path: 'rxjs', component: RxjsComponent, data: { titulo: 'Rxjs' } },
        { path: 'account-settings', component: AccountSettingsComponent, data: { titulo: 'Ajustes de Tema' } },
        { path: 'perfil', component: ProfileComponent, data: { titulo: 'Perfil de usuario' } },
        { path: 'busqueda/:termino', component: BusquedaComponent, data: { titulo: 'Buscador' } },
        
        //Mantenimientos
        { 
            path: 'usuarios', 
            component: UsuariosComponent,
            canActivate: [ AdminGuard ], 
            data: { titulo: 'Mantenimiento de Usuarios' } 
        },
        { path: 'hospitales', component: HospitalesComponent, data: { titulo: 'Mantenimiento de Hospitales' } },
        { path: 'medicos', component: MedicosComponent, data: { titulo: 'Mantenimiento de Medicos' } },
        { path: 'medico/:id', component: MedicoComponent, data: { titulo: 'Actualizar Médico' } },
        { path: '', redirectTo:'/dashboard', pathMatch: 'full' }
      
    
];

//El forRoot se usa cuando es la ruta principal pero como estas son rutas q estan dentro de otras rutas
//O mejor dicho son router-outlet q estan dentro de otros router-outlet va 'forChild'
export const PAGES_ROUTES = RouterModule.forChild ( pagesRoutes );