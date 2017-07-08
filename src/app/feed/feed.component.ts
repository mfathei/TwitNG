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
    this.tweets = this.feedervice.getCurrentFeed();
  }

  OnFavorite(tweet) {
    this.feedervice.favoriteTweet(tweet);
  }

  OnRetweet(tweet) {
    this.feedervice.reTweet(tweet);
  }

  OnNewTweet() {
    console.log(this.tweetText);
    this.feedervice.postNewTweet(this.tweetText);
    this.tweetText = '';
  }
}
