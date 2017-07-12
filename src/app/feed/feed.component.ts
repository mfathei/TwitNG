import { Component, OnInit } from '@angular/core';
import { Tweet } from '../tweet';
import { UserService } from '../user.service';
import { FeedService } from '../feed.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

  tweets = [];

  tweetText = '';

  constructor(private feedervice: FeedService, private userService: UserService) { }

  ngOnInit() {
    this.feedervice.getCurrentFeed().subscribe((newTweets) => {
      this.tweets = newTweets;
    });
  }

  OnFavorite(tweet) {
    this.feedervice.favoriteTweet(tweet);
  }

  OnRetweet(tweet) {
    this.feedervice.reTweet(tweet);
  }

  OnNewTweet() {
    this.feedervice.postNewTweet(this.tweetText).subscribe((newTweet: Tweet) => {
      this.tweets.unshift(newTweet);
    });
    this.tweetText = '';
  }
}
