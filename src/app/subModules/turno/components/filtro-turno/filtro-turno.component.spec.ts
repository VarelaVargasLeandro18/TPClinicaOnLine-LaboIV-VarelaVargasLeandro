import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroTurnoComponent } from './filtro-turno.component';

describe('FiltroTurnoComponent', () => {
  let component: FiltroTurnoComponent;
  let fixture: ComponentFixture<FiltroTurnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FiltroTurnoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltroTurnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
