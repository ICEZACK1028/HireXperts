import { Routes } from '@angular/router';

import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { UsuariosAdminComponent } from '../../usuarios-admin/usuarios-admin.component';
import { ProfesionesComponent } from '../../profesiones/profesiones.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'usuarios-admin',     component: UsuariosAdminComponent },
    { path: 'profesiones',    component: ProfesionesComponent },
];
