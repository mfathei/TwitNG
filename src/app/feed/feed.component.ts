import { Component, OnInit } from '@angular/core';
import { Tweet } from '../tweet';
import { UserService } from '../user.service';
import { FeedService } from '../feed.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

  tweets = [];
  tweetText = '';
  errorText = '';
  loaded = false;

  constructor(private feedervice: FeedService, private userService: UserService) { }

  ngOnInit() {
    this.feedervice.getCurrentFeed().subscribe((newTweets) => {
      this.tweets = newTweets;
    }, (err) => {
      this.errorText = `Oh no! We have experienced an internal error.(the underlying error was ${err} )`;
    }, () => {
      this.loaded = true;
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
    }, (err) => {
      this.errorText = `Oh no! We have experienced an internal error.(the underlying error was ${err} )`;
    });
    this.tweetText = '';
  }
}
