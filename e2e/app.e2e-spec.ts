import { TwitNgPage } from './app.po';

describe('twit-ng App', () => {
  let page: TwitNgPage;

  beforeEach(() => {
    page = new TwitNgPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
