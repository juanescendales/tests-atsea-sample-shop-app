import { expect } from 'chai';
import { browser } from 'protractor';

import dotenv = require('dotenv')
dotenv.config()

describe('Title', () => {
  describe('when the page is open', () => {

    before(async () => {
      await browser.get(process.env.UI_URL);
    });

    it('Should have a title equal to "Atsea Shop"', async () => {
      expect(await browser.getTitle()).to.equal('Atsea Shop');
    });

  });
});
