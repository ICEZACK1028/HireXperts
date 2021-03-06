import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { NouisliderModule } from 'ng2-nouislider';
import { JwBootstrapSwitchNg2Module } from 'jw-bootstrap-switch-ng2';
import { RouterModule } from '@angular/router';

import { BasicelementsComponent } from './basicelements/basicelements.component';
import { NavigationComponent } from './navigation/navigation.component';
import { TypographyComponent } from './typography/typography.component';
import { NucleoiconsComponent } from './nucleoicons/nucleoicons.component';
import { ComponentsComponent } from './components.component';
import { NotificationComponent } from './notification/notification.component';
import { NgbdModalBasic } from './modal/modal.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { PerfilComponent } from './perfil/perfil.component';
import { RegisterComponent } from './register/register.component';
import { ProfessionalRegisterComponent } from './professional-register/professional-register.component';
import { FooterAdminComponent } from './footer-admin/footer.component';
import { SidebarComponent } from './sidebar-admin/sidebar.component';
import { NavbarAdminComponent } from './navbar-admin/navbar-admin.component';
import { CategoriesComponent } from './categories/categories.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgbModule,
        NouisliderModule,
        RouterModule,
        JwBootstrapSwitchNg2Module
      ],
    declarations: [
        ComponentsComponent,
        BasicelementsComponent,
        NavigationComponent,
        TypographyComponent,
        NucleoiconsComponent,
        NotificationComponent,
        NgbdModalBasic,
        LoginComponent,
        HomeComponent,
        PerfilComponent,
        RegisterComponent,
        ProfessionalRegisterComponent,
        FooterAdminComponent,
        NavbarAdminComponent,
        SidebarComponent,
        CategoriesComponent
    ],
    exports:[ 
        ComponentsComponent,
        FooterAdminComponent,
        NavbarAdminComponent,
        SidebarComponent 
    ]
})
export class ComponentsModule { }
