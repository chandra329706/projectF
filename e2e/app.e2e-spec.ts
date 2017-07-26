import { FlexypayPage } from './app.po';

describe('flexypay App', function() {
  let page: FlexypayPage;

  beforeEach(() => {
    page = new FlexypayPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
