import { TestBed } from '@angular/core/testing';

import { CommadeService } from './commade.service';

describe('CommadeService', () => {
  let service: CommadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
