import { TestBed } from '@angular/core/testing';

import { IceCreamFlavoursService } from './ice-cream-flavours.service';

describe('IceCreamFlavoursService', () => {
  let service: IceCreamFlavoursService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IceCreamFlavoursService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
