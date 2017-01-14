import { RegexDesignPage } from './app.po';

describe('regex-design App', function() {
  let page: RegexDesignPage;

  beforeEach(() => {
    page = new RegexDesignPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
