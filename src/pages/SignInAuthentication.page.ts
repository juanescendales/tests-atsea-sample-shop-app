import { $, ElementFinder } from 'protractor';

export class SignInAuthentication {

  private title: ElementFinder;
  private usernameInput: ElementFinder;
  private userPasswordInput: ElementFinder;
  private sendButton: ElementFinder;

  constructor() {
    this.title = $('div.loginFormHeader');
    this.usernameInput = $('div.loginFormContent > form input[name="username"]');
    this.userPasswordInput = $('div.loginFormContent > form input[name="password"]');
    this.sendButton = $('div.loginFormButton > button');
  }

  public getTitle(): ElementFinder {
    return this.title
  }

  public async signIn(id, password): Promise<void> {
    await this.usernameInput.sendKeys(id);
    await this.userPasswordInput.sendKeys(password);
    await this.sendButton.click();
  }
  
}