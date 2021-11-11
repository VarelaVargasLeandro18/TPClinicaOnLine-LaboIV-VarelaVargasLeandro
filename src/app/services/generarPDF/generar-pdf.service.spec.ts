import { TestBed } from '@angular/core/testing';

import { GenerarPDFService } from './generar-pdf.service';

describe('GenerarPDFService', () => {
  let service: GenerarPDFService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GenerarPDFService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
