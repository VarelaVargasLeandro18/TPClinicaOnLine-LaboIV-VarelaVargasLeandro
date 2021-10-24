import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioEnListaComponent } from './usuario-en-lista.component';

describe('UsuarioEnListaComponent', () => {
  let component: UsuarioEnListaComponent;
  let fixture: ComponentFixture<UsuarioEnListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsuarioEnListaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuarioEnListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
