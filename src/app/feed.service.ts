import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { UserService } from './user.service';
import { Tweet } from './tweet';

@Injectable()
export class FeedService {

  tweets = [
    ];

  constructor(private userService: UserService, private http: Http) { }

  getCurrentFeed(): Array<Tweet> {
    return this.tweets;
  }

  postNewTweet(tweetText: string) {
    this.tweets.unshift(
      new Tweet(5,tweetText, this.userService.getCurrentUser(), new Date(), [], [])
    );
  }

  favoriteTweet(tweet: Tweet) {
    if (!tweet.hasFavorited(this.userService.getCurrentUser())) {
      tweet.favorites.push(this.userService.getCurrentUser());
    }
  }

  reTweet(tweet: Tweet) {
    if (!tweet.hasRetweeted(this.userService.getCurrentUser())) {
      tweet.retweets.push(this.userService.getCurrentUser());
    }
  }

  getFriends(): Observable<string[]> {
    return this.http.get('./assets/friends.json').map((resp: Response) => resp.json() as string[]);
    // return ['Mary', 'Joe', 'Karen', 'Phil', 'Toni'];
  }
}
