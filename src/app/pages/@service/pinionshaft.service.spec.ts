import { TestBed } from '@angular/core/testing';

import { PinionshaftService } from './pinionshaft.service';

describe('PinionshaftService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PinionshaftService = TestBed.get(PinionshaftService);
    expect(service).toBeTruthy();
  });
});
