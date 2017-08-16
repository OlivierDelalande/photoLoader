import { PhotoLoaderPage } from './app.po';

describe('photo-loader App', () => {
  let page: PhotoLoaderPage;

  beforeEach(() => {
    page = new PhotoLoaderPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
