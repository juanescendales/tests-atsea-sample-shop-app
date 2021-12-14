import { expect } from 'chai';
import { browser, ExpectedConditions } from 'protractor';
import { IndexAuthentication, SignUpAuthentication } from '../../src/pages';
import { StatusCodes } from 'http-status-codes'

import dotenv = require('dotenv')
dotenv.config()

const EC = ExpectedConditions

import { del } from 'superagent'

const indexAuthentication: IndexAuthentication = new IndexAuthentication()
const signUpAuthentication: SignUpAuthentication = new SignUpAuthentication()

const user = {
  username: 'u',
  password: 'p'
}

describe('Sing Up Atsea shop', () => {

    before(async () => {
        await browser.get(process.env.UI_URL);
        try {
          const response = await del(`${process.env.API_URL}/api/customer/`)
          expect(response.status).to.equal(StatusCodes.NO_CONTENT)
        } catch (error) {
            console.log(error)
            Promise.reject(error)
        }
      });

    describe('Click in Create User button', () => {
        it('then should appear sign up form with title "Create your user ID"', async () => {

          await browser.wait(EC.elementToBeClickable(indexAuthentication.getSignUpButton()), 20000)
          await indexAuthentication.clickSignUpButton()
          await browser.wait(EC.textToBePresentInElement(signUpAuthentication.getTitle(),"Create your user ID"), 20000)

        });
    });

    describe('Put data in the inputs and click in send button', () => {
        it('then should create user and show button Continue Shopping', async () => {

          await signUpAuthentication.signUp(user.username,user.password)

          await browser.wait(EC.visibilityOf(signUpAuthentication.getSuccessContainer()),20000)
          expect(await signUpAuthentication.getSuccessMessage().getText())
            .to.equal('Congratulations! Your account has been created!')
          await browser.wait(EC.elementToBeClickable(signUpAuthentication.getContinueShoppingButton()), 20000)
          await signUpAuthentication.clickContinueShoppingButton()

        });
    });

    describe('Sing Out after sign up', () => {
        it('Should to appear Sign Out button and after click should sign out the user', async () => {
          await browser.wait(EC.visibilityOf(indexAuthentication.getWelcomeMessage()),20000)
          expect(await indexAuthentication.getWelcomeMessage().getText())
            .to.equal('Welcome!')
          await browser.wait(EC.elementToBeClickable(indexAuthentication.getSignOutButton()), 20000)
          await indexAuthentication.clickSignOutButton()
        });
    });

    after(async () => {
      try {
        const response = await del(`${process.env.API_URL}/api/customer/`)
        expect(response.status).to.equal(StatusCodes.NO_CONTENT)
        await browser.sleep(10000)
      } catch (error) {
          Promise.reject(error)
      }
    });
});
