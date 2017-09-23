import { TestBed, inject } from '@angular/core/testing';

import { NetService } from './net.service';

describe('NetService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NetService]
    });
  });

  it('should be created', inject([NetService], (service: NetService) => {
    expect(service).toBeTruthy();
  }));
});
