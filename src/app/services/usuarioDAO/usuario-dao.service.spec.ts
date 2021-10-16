import { TestBed } from '@angular/core/testing';

import { UsuarioDAOService } from './usuario-dao.service';

describe('UsuarioDAOService', () => {
  let service: UsuarioDAOService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsuarioDAOService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
