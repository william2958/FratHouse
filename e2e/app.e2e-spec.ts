import { FratHousePage } from './app.po';

describe('frat-house App', () => {
  let page: FratHousePage;

  beforeEach(() => {
    page = new FratHousePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
