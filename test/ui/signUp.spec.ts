import { expect } from 'chai';
import { StatusCodes } from 'http-status-codes'
import { browser, ExpectedConditions } from 'protractor';
import { IndexAuthentication, SignUpAuthentication } from '../../src/pages';

import dotenv = require('dotenv')
dotenv.config()

const EC = ExpectedConditions

import { del, get } from 'superagent'

const indexAuthentication: IndexAuthentication = new IndexAuthentication()
const signUpAuthentication: SignUpAuthentication = new SignUpAuthentication()

const user = {
  username: 'u',
  password: 'p'
}

describe('Sing Up Atsea shop', () => {

    before(async () => {
        await browser.get(process.env.UI_URL);
      });

    describe('Click in Create User button', () => {
        it('then should appear sign up form with title "Create your user ID"', async () => {

          await browser.wait(EC.elementToBeClickable(indexAuthentication.getSignUpButton()), 10000)
          await indexAuthentication.clickSignUpButton()
          await browser.wait(EC.textToBePresentInElement(signUpAuthentication.getTitle(),"Create your user ID"), 10000)

        });
    });

    describe('Put data in the inputs and click in send button', () => {
        it('then should create user and show button Continue Shopping', async () => {

          await signUpAuthentication.signUp(user.username,user.password)

          await browser.wait(EC.visibilityOf(signUpAuthentication.getSuccessContainer()),10000)
          expect(await signUpAuthentication.getSuccessMessage().getText())
            .to.equal('Congratulations! Your account has been created!')
          await browser.wait(EC.elementToBeClickable(signUpAuthentication.getContinueShoppingButton()), 10000)
          await signUpAuthentication.clickContinueShoppingButton()

        });
    });

    describe('Sing Out after sign up', () => {
        it('Should to appear Sign Out button and after click should sign out the user', async () => {
          await browser.wait(EC.visibilityOf(indexAuthentication.getWelcomeMessage()),10000)
          expect(await indexAuthentication.getWelcomeMessage().getText())
            .to.equal('Welcome!')
          await browser.wait(EC.elementToBeClickable(indexAuthentication.getSignOutButton()), 10000)
          await indexAuthentication.clickSignOutButton()
        });
    });

    after(async () => {
      try {
        const response = await get(`${process.env.API_URL}/api/customer/username=${user.username}`)
        expect(response.status).to.equal(StatusCodes.OK)
        expect(response.body).to.have.property('customerId');
        await del(`${process.env.API_URL}/api/customer/${response.body.customerId}`)
      } catch (error) {
          Promise.reject(error)
      }
    });
});
