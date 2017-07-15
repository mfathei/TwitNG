import { browser, by, element } from 'protractor';

export class TwitNgPage {
  navigateTo() {
    return browser.get('/feed');
  }

  postNewTweet(newTweet) {
    return element(by.name("body")).sendKeys(newTweet);
  }

  getFeedCount() {
    return element.all(by.css(".comment")).count();
  }

  getLatestFeed() {
    return element.all(by.css(".comment .content .text")).get(0).getText();
  }

  retweetLatestTweet() {
    element.all(by.css(".comment .content .actions .retweet")).get(0).click();
  }

  getLatesttweetRetweetCount() {
    return element.all(by.css(".comment .content .actions .retweet")).get(0).getText();
  }

}
