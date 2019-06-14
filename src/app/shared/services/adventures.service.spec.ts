import { TestBed } from '@angular/core/testing';

import { AdventuresService } from './adventures.service';

describe('AdventuresService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdventuresService = TestBed.get(AdventuresService);
    expect(service).toBeTruthy();
  });
});
