import { TestBed } from '@angular/core/testing';

import { AshalService } from './ashal.service';

describe('AshalService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AshalService = TestBed.get(AshalService);
    expect(service).toBeTruthy();
  });
});
