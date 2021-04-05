import { TestBed } from '@angular/core/testing';

import { WorkDaysService } from './work-days.service';

describe('WorkDaysService', () => {
  let service: WorkDaysService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkDaysService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
