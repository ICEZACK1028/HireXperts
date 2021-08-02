import { Component, OnInit } from '@angular/core';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/profesiones', title: 'Profesiones',  icon:'business_briefcase-24', class: '' },

    { path: '/usuarios-admin', title: 'Usuarios',  icon:'users_circle-08', class: '' },
    { path: '/resenas', title: 'Reseñas',  icon:'education_paper', class: '' },
    { path: '/user-profile', title: 'Perfil',  icon:'users_single-02', class: '' },
    { path: '/login', title: 'Cerrar sesión',  icon:'arrows-1_share-66', class: 'active active-pro' }

];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ( window.innerWidth > 991) {
          return false;
      }
      return true;
  };
}
