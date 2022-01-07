import { TestBed } from '@angular/core/testing';

import { ShopContentService } from './shop-content.service';

describe('ShopContentService', () => {
  let service: ShopContentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShopContentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
