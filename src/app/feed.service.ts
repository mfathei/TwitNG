import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { UserService } from './user.service';
import { Tweet } from './tweet';

@Injectable()
export class FeedService {

  tweets = [];

  constructor(private userService: UserService, private http: Http) { }

  private getTweetFromJson(obj: Tweet): Tweet {
    return new Tweet(
      obj.id, obj.body, obj.author, obj.date, obj.retweets, obj.favorites
    );
  }

  getCurrentFeed(): Observable<Tweet[]> {
    return this.http.get('/api/tweets').map((resp: Response) => {
      console.log(resp.json());
      const fetchedTweets = [];
      for (const tweet of resp.json().data) {
        fetchedTweets.push(this.getTweetFromJson(tweet));
      }
      return fetchedTweets as Array<Tweet>;
      // throw 'A really nasty internal error';
    }).catch(this.handleError);
  }

  private handleError(err) {
    console.log(err);
    return Observable.throw(err);
  }

  updateTweet(tweet: Tweet) {
    const body = JSON.stringify(tweet);
    const url = `/api/tweets/${tweet.id}`;

    return this.http.put(url, body).map((resp: Response) => {
      console.log(resp);
      if (resp.status === 204) {
        console.log('Success. Yay!')
      } else {
        throw `Error fetching tweet ${tweet.id}. Received status code : ${resp.status}`;
      }
    }).catch(this.handleError);
  }

  postNewTweet(tweetText: string) {

    const body = JSON.stringify({
      body: tweetText, author: this.userService.getCurrentUser(), date: new Date(), retweets: [], favorites: []
    });

    return this.http.post('/api/tweets', body).map((resp: Response) => {
      console.log(resp.json());
      return this.getTweetFromJson(resp.json().data);
    });
  }

  favoriteTweet(tweet: Tweet) {
    if (!tweet.hasFavorited(this.userService.getCurrentUser())) {
      tweet.favorites.push(this.userService.getCurrentUser());
      this.updateTweet(tweet).subscribe(resp => console.log(resp));
    }
  }

  reTweet(tweet: Tweet) {
    if (!tweet.hasRetweeted(this.userService.getCurrentUser())) {
      tweet.retweets.push(this.userService.getCurrentUser());
      this.updateTweet(tweet).subscribe(resp => console.log(resp));
    }
  }

  getFriends(): Observable<string[]> {
    return this.http.get('./assets/friends.json').map((resp: Response) => resp.json() as string[]);
    // return ['Mary', 'Joe', 'Karen', 'Phil', 'Toni'];
  }
}
