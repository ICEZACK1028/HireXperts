import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { ComponentsComponent } from './components/components.component';
import { LandingComponent } from './examples/landing/landing.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './examples/profile/profile.component';
import { NucleoiconsComponent } from './components/nucleoicons/nucleoicons.component';
import { HomeComponent } from './components/home/home.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfessionalRegisterComponent } from './components/professional-register/professional-register.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { CategoriesComponent } from './components/categories/categories.component';

const routes: Routes =[
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'index',                component: ComponentsComponent },
    { path: 'nucleoicons',          component: NucleoiconsComponent },
    { path: 'examples/landing',     component: LandingComponent },
    { path: 'examples/profile',     component: ProfileComponent },
    { path: 'login',                component: LoginComponent },
    { path: 'home',                component: HomeComponent },
    { path: 'perfil/:idUsuario',                component: PerfilComponent },
    { path: 'register',                component: RegisterComponent },
    { path: 'professional-register',                component: ProfessionalRegisterComponent }, {
        path: '',
        component: AdminLayoutComponent,
        children: [
            {
          path: '',
          loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule'
      }]},
    { path: 'categories',                component: CategoriesComponent}

];

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        RouterModule.forRoot(routes)
    ],
    exports: [
    ],
})
export class AppRoutingModule { }
