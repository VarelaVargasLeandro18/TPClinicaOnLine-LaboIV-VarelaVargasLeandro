import { TestBed } from '@angular/core/testing';

import { GenerarExcelTurnosService } from './generar-excel-turnos.service';

describe('GenerarExcelTurnosService', () => {
  let service: GenerarExcelTurnosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GenerarExcelTurnosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
