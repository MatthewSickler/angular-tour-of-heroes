import {HeroListPage} from './app.po';
import { browser, element, by } from 'protractor';

describe('angular-tour-of-heroes App', () => {
  let page: HeroListPage, addNameElement, addHeroButton, allHeroElements, initialNumberOfHeroes, deleteHeroButton, title;

  beforeEach(() => {
    page = new HeroListPage();

    allHeroElements = page.getAllHeroElements();
    initialNumberOfHeroes = 0;
  });

  afterEach(() => {
    page.getConsoleLogs();
  });

  it('should have a title', () => {
    page.navigateTo();
    title = page.getTitle();

    expect(title).toEqual('AngularTourOfHeroes');
  });

  // it('should have a title sync', () => {
  //   page.navigateTo();
  //   let titlePromise = page.getTitle().then(t => title = t);
  //
  //   let waitPromise = browser.wait(titlePromise, 30 * 1000, 'Getting Title');
  //
  //   waitPromise.then(() => {
  //     expect(title).toEqual('AngularTourOfHeroes');
  //   })
  // });

  it('should add a hero', () => {
    page.navigateTo();

    addNameElement = page.getAddNameElement();
    addHeroButton = page.getAddHeroButtonElement();

    allHeroElements.count().then(count => {console.log("Before Add: " + count); initialNumberOfHeroes = count;});
    let waitPromise = browser.wait(() => {return initialNumberOfHeroes > 0;}, 30 * 1000, 'Counting Current Heroes');

    waitPromise.then(() => {
      expect(initialNumberOfHeroes).toBeGreaterThan(0);
      addNameElement.sendKeys('test name');
      addHeroButton.click();

      expect(allHeroElements.count()).toEqual(initialNumberOfHeroes+1);
    });

  });

  it('should not add a hero if name is blank', () => {
    page.navigateTo();

    addNameElement = page.getAddNameElement();
    addHeroButton = page.getAddHeroButtonElement();

    allHeroElements.count().then(count => {console.log("Before Add: " + count); initialNumberOfHeroes = count;});
    let waitPromise = browser.wait(() => {return initialNumberOfHeroes > 0;}, 30 * 1000, 'Counting Current Heroes');

    waitPromise.then(() => {
      expect(initialNumberOfHeroes).toBeGreaterThan(0);
      addHeroButton.click();

      expect(allHeroElements.count()).toEqual(initialNumberOfHeroes);
    });

  });

  it('should delete the last hero in the list', () => {
    page.navigateTo();

    deleteHeroButton = page.getLastHeroDeleteButton();

    allHeroElements.count().then(count => {console.log("Before Delete: " + count); initialNumberOfHeroes = count;});
    let waitPromise = browser.wait(() => {return initialNumberOfHeroes > 0;}, 30 * 1000, 'Counting Current Heroes');

    waitPromise.then(() => {
      expect(initialNumberOfHeroes).toBeGreaterThan(0);
      deleteHeroButton.click();

      expect(allHeroElements.count()).toEqual(initialNumberOfHeroes-1);
    });
  });
});
