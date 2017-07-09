import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { Tweet } from './tweet';

@Injectable()
export class FeedService {

  tweets = [
    new Tweet('Always code as if the guy who ends up maintaining your code will be a violent psychopath who knows where you live.', 'Glen', new Date(), ['Joe'], []),
    new Tweet('Measuring programming progress by lines of code is like measuring aircraft building progress by weight', 'Joe', new Date(), [], ['Mary']),
    new Tweet('Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.', 'Mary', new Date(), ['Glen'], ['Mary']),
    new Tweet('People think that computer science is the art of geniuses but the actual reality is the opposite, just many people doing things that build on each other, like a wall of mini stones', 'Glen', new Date(), ['Joe', 'Mary'], []),
    new Tweet('You can’t have great software without a great team, and most software teams behave like dysfunctional families.', 'Joe', new Date(), [], ['Mary', 'Glen'])
  ];

  constructor(private userService: UserService) { }

  getCurrentFeed(): Array<Tweet> {
    return this.tweets;
  }

  postNewTweet(tweetText: string) {
    this.tweets.unshift(
      new Tweet(tweetText, this.userService.getCurrentUser(), new Date(), [], [])
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

  getFriends(): Array<string> {
    return ['Mary', 'Joe', 'Karen', 'Phil', 'Toni'];
  }
}
