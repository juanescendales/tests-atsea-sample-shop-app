import { $, ElementFinder } from 'protractor';

export class IndexAuthentication {
  private signUpButton: ElementFinder;
  private SignInButton: ElementFinder;
  private SignOutButton: ElementFinder;
  private welcomeMessage: ElementFinder;

  constructor() {
    this.signUpButton = $('div.buttonSection > div > button:nth-child(1)');
    this.SignInButton = $('div.buttonSection > div > button:nth-child(2)');
    this.SignOutButton = $('div.buttonSection .welcomeMessage + button');
    this.welcomeMessage = $('span.welcomeMessage');
  }

  public async clickSignUpButton(): Promise<void> {
    await this.signUpButton.click();
  }

  public getSignUpButton(): ElementFinder {
    return this.signUpButton
  }

  public async clickSignInButton(): Promise<void> {
    await this.SignInButton.click();
  }

  public getSignInButton(): ElementFinder {
    return this.SignInButton
  }

  public async clickSignOutButton(): Promise<void> {
    await this.SignOutButton.click();
  }

  public getSignOutButton(): ElementFinder {
    return this.SignOutButton
  }

  public getWelcomeMessage(): ElementFinder {
    return this.welcomeMessage;
  }

}