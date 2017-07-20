import { browser } from 'protractor';
import { TwitNgPage } from './app.po';

describe('twit-ng App', () => {
  let page: TwitNgPage;

  beforeEach(() => {
    page = new TwitNgPage();
  });

  it('should be able to post new tweet', () => {
    page.navigateTo();
    page.postNewTweet("winning new tweet");
    // browser.pause();
    expect(page.getLatestFeed()).toEqual("winning new tweet");
    expect(page.getFeedCount()).toEqual(6);
    // expect(page.postNewTweet("winning new tweet")).toEqual('Welcome to app!!');
  });

  it("should increment retweet count", () => {
    page.navigateTo();
    page.retweetLatestTweet();
    // browser.pause();
    expect(page.getLatestTweetRetweetCount()).toEqual("2 Retweets");
  });

});
