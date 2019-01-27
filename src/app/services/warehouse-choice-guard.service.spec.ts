import { TestBed } from '@angular/core/testing';

import { WarehouseChoiceGuardService } from './warehouse-choice-guard.service';

describe('WarehouseChoiceGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WarehouseChoiceGuardService = TestBed.get(WarehouseChoiceGuardService);
    expect(service).toBeTruthy();
  });
});
