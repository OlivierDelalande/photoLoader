import { TestBed, inject } from '@angular/core/testing';

import { PhotoLoaderService } from './photo-loader.service';

describe('PhotoLoaderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PhotoLoaderService]
    });
  });

  it('should be created', inject([PhotoLoaderService], (service: PhotoLoaderService) => {
    expect(service).toBeTruthy();
  }));
});
