import { expect } from 'chai';
import { browser, ExpectedConditions } from 'protractor';
import { IndexAuthentication, SignInAuthentication } from '../../src/pages';

import dotenv = require('dotenv')
dotenv.config()

const EC = ExpectedConditions

const indexAuthentication: IndexAuthentication = new IndexAuthentication()
const signInAuthentication: SignInAuthentication = new SignInAuthentication()

describe('Sing In Atsea shop', () => {
    before(async () => {
      await browser.get(process.env.UI_URL);
      browser.sleep(5000);
    })

    describe('Click in Sign In button', () => {
        it('then should appear sign In form with title "Sign in to your account"', async () => {

          await browser.wait(EC.elementToBeClickable(indexAuthentication.getSignInButton()), 40000)
          await indexAuthentication.clickSignInButton()
          await browser.wait(EC.textToBePresentInElement(signInAuthentication.getTitle(),"Sign in to your account"),40000)

        });
    });

    describe('Put data in the inputs and click in sign in button', () => {
        it('then should loged in the user and show button Sign Out and "Welcome!" message', async () => {

          await signInAuthentication.signIn('x','x')

          await browser.wait(EC.visibilityOf(indexAuthentication.getWelcomeMessage()),40000)
          expect(await indexAuthentication.getWelcomeMessage().getText())
            .to.equal('Welcome!')
          await browser.wait(EC.elementToBeClickable(indexAuthentication.getSignOutButton()), 40000)
        });
    });

    describe('Sing Out after sign in', () => {
        it('Should to appear Sign Out button and after click should sign out the user', async () => {
          await browser.wait(EC.visibilityOf(indexAuthentication.getWelcomeMessage()),40000)
          expect(await indexAuthentication.getWelcomeMessage().getText())
            .to.equal('Welcome!')
          await browser.wait(EC.elementToBeClickable(indexAuthentication.getSignOutButton()), 40000)
          await indexAuthentication.clickSignOutButton()
        });
    });
});
