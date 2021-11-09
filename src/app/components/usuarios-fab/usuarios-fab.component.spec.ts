import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuariosFABComponent } from './usuarios-fab.component';

describe('UsuariosFABComponent', () => {
  let component: UsuariosFABComponent;
  let fixture: ComponentFixture<UsuariosFABComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsuariosFABComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuariosFABComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
