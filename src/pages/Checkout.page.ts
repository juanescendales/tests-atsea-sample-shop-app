import { $, ElementFinder } from 'protractor';

export class Checkout {

  private title: ElementFinder;
  private formSection: ElementFinder;
  private firstNameInput: ElementFinder;
  private lastNameInput: ElementFinder;
  private cardNumberInput: ElementFinder;
  private cvvInput: ElementFinder;
  private expirationDateInput: ElementFinder;
  private companyInput: ElementFinder;
  private titleInput: ElementFinder;
  private addressInput: ElementFinder;
  private cityInput: ElementFinder;

  private completeOrderButton: ElementFinder;

  private successfullyOrderMessage: ElementFinder;
  private continueShoppingButton: ElementFinder;

  constructor() {

    this.title = $('.checkoutTitle');
    this.formSection = $('.formSection');

    this.firstNameInput = $('input[name="firstName"]');
    this.lastNameInput = $('input[name="lastName"]');
    this.cardNumberInput = $('input[name="cardNumber"]');
    this.cvvInput = $('input[name="cvv"]');
    this.expirationDateInput = $('input[name="expirationDate"]');
    this.companyInput = $('input[name="company"]');
    this.titleInput = $('input[name="title"]');
    this.addressInput = $('input[name="address"]');
    this.cityInput = $('input[name="city"]');

    this.completeOrderButton = $('div.infoButton > button[type="submit"]');

    this.successfullyOrderMessage = $('div.successMessage');
    this.continueShoppingButton = $('div.successButton > a');
  }

  public getTitle(): ElementFinder {
    return this.title;
  }

  public getFormSection(): ElementFinder{
    return this.formSection;
  }

  public async fillCreditCardInformation(firstName: string, lastName: string, cardNumber: string, cvv: string, expirationDate: string): Promise<void> {
    await this.firstNameInput.click();
    await this.firstNameInput.sendKeys(firstName);
    await this.lastNameInput.click();
    await this.lastNameInput.sendKeys(lastName);
    await this.cardNumberInput.click();
    await this.cardNumberInput.sendKeys(cardNumber);
    await this.cvvInput.click();
    await this.cvvInput.sendKeys(cvv);
    await this.expirationDateInput.click();
    await this.expirationDateInput.sendKeys(expirationDate);
  }

  public async fillBillingInformation(company: string, title: string, address: string, city: string): Promise<void> {
    await this.companyInput.click();
    await this.companyInput.sendKeys(company);
    await this.titleInput.click();
    await this.titleInput.sendKeys(title);
    await this.addressInput.click();
    await this.addressInput.sendKeys(address);
    await this.cityInput.click();
    await this.cityInput.sendKeys(city);
  }

  public async clickCompleteOrder(): Promise<void> {
    await this.completeOrderButton.click();
  }

  public getSuccessfullyMessage(): ElementFinder {
    return this.successfullyOrderMessage;
  }

  public async clickContinueShopping(): Promise<void> {
    await this.continueShoppingButton.click();
  }


}