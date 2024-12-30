import { TestBed } from '@angular/core/testing';

import { MovimentationsService } from './movimentations.service';

describe('MovimentationsService', () => {
  let service: MovimentationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MovimentationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
