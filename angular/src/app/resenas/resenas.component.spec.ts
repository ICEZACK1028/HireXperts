import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResenasComponent } from './resenas.component';

describe('UpgradeComponent', () => {
  let component: ResenasComponent;
  let fixture: ComponentFixture<ResenasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResenasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResenasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
