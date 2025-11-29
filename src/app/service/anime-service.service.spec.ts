import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AnimeServiceService } from './anime-service.service';

describe('AnimeServiceService', () => {
  let service: AnimeServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(AnimeServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
