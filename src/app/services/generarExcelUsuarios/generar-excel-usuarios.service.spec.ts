import { TestBed } from '@angular/core/testing';

import { GenerarExcelUsuariosService } from './generar-excel-usuarios.service';

describe('GenerarExcelUsuariosService', () => {
  let service: GenerarExcelUsuariosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GenerarExcelUsuariosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
