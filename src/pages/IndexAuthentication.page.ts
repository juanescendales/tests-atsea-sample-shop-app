import { $, ElementFinder } from 'protractor';

export class IndexAuthentication {
  private signUpButton: ElementFinder;
  private SignInButton: ElementFinder;
  private SignOutButton: ElementFinder;
  private welcomeMessage: ElementFinder;

  constructor() {
    this.signUpButton = $('div.buttonSection > div:nth-child(1) > button');
    this.SignInButton = $('div.buttonSection > div:nth-child(2) > button');
    this.SignOutButton = $('div.buttonSection > div:nth-child(1) > button');
    this.welcomeMessage = $('span.welcomeMessage');
  }

  public async clickSignUpButton(): Promise<void> {
    await this.signUpButton.click();
  }

  public async clickSignInButton(): Promise<void> {
    await this.SignInButton.click();
  }

  public async clickSignOutButton(): Promise<void> {
    await this.SignOutButton.click();
  }

  public getWelcomeMessage(): ElementFinder {
    return this.welcomeMessage;
  }

}