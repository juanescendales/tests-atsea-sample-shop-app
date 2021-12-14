import { expect } from 'chai';
import { browser, ExpectedConditions } from 'protractor';
import { IndexAuthentication, IndexShop, SignInAuthentication, Checkout } from '../../src/pages';
import { Customer } from '../../src/models/Customer';

import dotenv = require('dotenv')
dotenv.config()

const EC = ExpectedConditions

import { del, post } from 'superagent'

const indexAuthentication: IndexAuthentication = new IndexAuthentication()
const indexShop: IndexShop = new IndexShop()
const checkout: Checkout = new Checkout()
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


describe('Shop Process Atsea shop', () => {
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

  describe('Sign In User', () => {
        it('then should loged in the user and show button Sign Out and "Welcome!" message', async () => {

          await browser.wait(EC.elementToBeClickable(indexAuthentication.getSignInButton()), 40000)
          await indexAuthentication.clickSignInButton()
          await browser.wait(EC.textToBePresentInElement(signInAuthentication.getTitle(),"Sign in to your account"))
          await signInAuthentication.signIn(customer.username,customer.password)
          await browser.wait(EC.visibilityOf(indexAuthentication.getWelcomeMessage()),40000)
          expect(await indexAuthentication.getWelcomeMessage().getText())
            .to.equal('Welcome!')
          await browser.wait(EC.elementToBeClickable(indexAuthentication.getSignOutButton()), 40000)

        });
    });

  describe('Add two products to cart and proceed to checkout', () => {
      it('then should view checkout view', async () => {

        await browser.wait(EC.visibilityOf(indexShop.getProductListWrapper()),40000)
        expect(await indexShop.getProductList().count()).to.be.greaterThan(0)
        await indexShop.addTwoProductsRandomToCart()
        browser.sleep(5000);
        expect(await indexShop.getCartQuantity().getText()).to.equal("2");
        await indexShop.clickCheckOutButton();
        browser.sleep(10000);

      });
  });

  describe('Fill card and billing information and completer order', () => {
    it('then should view successfully message and continue shoping button', async () => {

      await browser.wait(EC.visibilityOf(checkout.getFormSection()),40000)
      expect(await checkout.getTitle().getText()).to.equal('Checkout')
      await checkout.fillCreditCardInformation('a', 'a','1','1','1')
      browser.sleep(5000);
      await checkout.fillBillingInformation('a', 'a','a','a')
      browser.sleep(5000);
      await checkout.clickCompleteOrder();
      await browser.wait(EC.visibilityOf(checkout.getSuccessfullyMessage()),40000)
      await checkout.clickContinueShopping();
      browser.sleep(5000);

    });
});



    describe('Sing Out after complete order', () => {
        it('Should to appear Sign Out button and after click in continue shopping', async () => {
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
        } catch (error) {
            Promise.reject(error)
        }
      })
});
