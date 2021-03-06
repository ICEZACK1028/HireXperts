import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuariosAdminComponent } from './usuarios-admin.component';

describe('TableListComponent', () => {
  let component: UsuariosAdminComponent;
  let fixture: ComponentFixture<UsuariosAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsuariosAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuariosAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
