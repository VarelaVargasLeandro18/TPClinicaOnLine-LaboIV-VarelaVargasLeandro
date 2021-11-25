import { TestBed } from '@angular/core/testing';

import { GenerarExcelLogsService } from './generar-excel-logs.service';

describe('GenerarExcelLogsService', () => {
  let service: GenerarExcelLogsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GenerarExcelLogsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
