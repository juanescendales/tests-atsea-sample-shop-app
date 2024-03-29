import { expect } from 'chai';
import { browser, ExpectedConditions } from 'protractor';
import { IndexAuthentication, SignInAuthentication } from '../../src/pages';
import { Customer } from '../../src/models/Customer';

import dotenv = require('dotenv')
dotenv.config()

const EC = ExpectedConditions

import { del, post } from 'superagent'

const indexAuthentication: IndexAuthentication = new IndexAuthentication()
const signInAuthentication: SignInAuthentication = new SignInAuthentication()

const customer: Customer = {
    customerId : 0,
    name       : "Gordon",
    address    : "144 Townsend, San Francisco 99999",
    email      : "sally@example.com",
    phone      : "513 222 5555",
    username   : "u",
    password   : "p",
    enabled    : true,
    role       : "USER"
}

describe('Sing In Atsea shop', () => {
    before(async () => {
      await del(`${process.env.API_URL}/api/customer/`)
      try {
        await post(`${process.env.API_URL}/api/customer/`).send(customer)
      } catch (error) {
        console.log(error)
        Promise.reject(error)
      }
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

          await signInAuthentication.signIn(customer.username,customer.password)

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

    after(async () => {
        try {
          await del(`${process.env.API_URL}/api/customer/`)
          await browser.sleep(10000)
        } catch (error) {
            Promise.reject(error)
        }
      })
});
