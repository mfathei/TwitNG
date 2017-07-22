import { TestBed, inject } from '@angular/core/testing';
import { HttpModule} from '@angular/http';
import { FeedService } from './feed.service';
import { UserService } from './user.service';

describe('FeedService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [FeedService, UserService ]
    });
  });

  it('should be created', inject([FeedService], (service: FeedService) => {
    expect(service).toBeTruthy();
  }));
});
