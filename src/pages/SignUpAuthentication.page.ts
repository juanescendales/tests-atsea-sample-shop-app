import { $, ElementFinder } from 'protractor';

export class SignUpAuthentication {

  private title: ElementFinder;
  private userIdInput: ElementFinder;
  private userPasswordInput: ElementFinder;
  private sendButton: ElementFinder;
  private successContainer: ElementFinder;
  private successMessage: ElementFinder;
  private continueShoppingButton: ElementFinder;

  constructor() {
    this.title = $('div.createFormHeader');
    this.userIdInput = $('div.createFormContent > form input[name="username"]');
    this.userPasswordInput = $('div.createFormContent > form input[name="password"]');
    this.sendButton = $('div.createFormButton > button');
    this.successContainer = $('div.successContainer');
    this.successMessage = $('div.successContainer > div.successMessage');
    this.continueShoppingButton = $('div.successContainer > div.successButton > button');

  }

  public getTitle(): ElementFinder {
    return this.title
  }

  public async clickUserIdInput(): Promise<void> {
    await this.userIdInput.click();
  }

  public getUserIdInput(): ElementFinder {
    return this.userIdInput
  }

  public async clickUserIdPassword(): Promise<void> {
    await this.userPasswordInput.click();
  }

  public getUserPasswordInput(): ElementFinder {
    return this.userPasswordInput
  }

  public async signUp(id, password): Promise<void> {
    await this.userIdInput.sendKeys(id);
    await this.userPasswordInput.sendKeys(password);
    await this.sendButton.click();
  }

  public getSuccessContainer(): ElementFinder {
    return this.successContainer
  }

  public getSuccessMessage(): ElementFinder {
    return this.successMessage
  }
  
  public getContinueShoppingButton(): ElementFinder {
    return this.continueShoppingButton
  }

  public async clickContinueShoppingButton(): Promise<void> {
    await this.continueShoppingButton.click();
  }
}