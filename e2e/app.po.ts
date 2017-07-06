import { browser, element, by } from 'protractor';

export class HeroListPage {
  navigateTo() {
    return browser.get('/heroes');
  }

  getTitle() {
    return browser.getTitle();
  }

  getAddNameElement() {
    return element(by.id('heroName'));
  }

  getAddHeroButtonElement() {
    return element(by.id('addHero'));
  }

  getAllHeroElements() {
    return element.all(by.id('heroListElements'));
  }

  getLastHeroDeleteButton() {
    return element.all(by.id('heroListElements')).last().element(by.id('heroDelete'));
  }

  pause() {
    browser.pause();
  }

  getConsoleLogs() {
    browser.manage().logs().get('browser').then(function(browserLog) {
      console.log('log: ' + require('util').inspect(browserLog));
    });
  }
}
