import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { UsuariosAdminComponent } from '../../usuarios-admin/usuarios-admin.component';
import { ProfesionesComponent } from '../../profesiones/profesiones.component';
import { ResenasComponent } from '../../resenas/resenas.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'usuarios-admin',     component: UsuariosAdminComponent },
    { path: 'profesiones',    component: ProfesionesComponent },
    { path: 'resenas',        component: ResenasComponent }
];
