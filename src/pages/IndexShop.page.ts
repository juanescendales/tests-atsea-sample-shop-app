import { $, $$, ElementFinder, ElementArrayFinder } from 'protractor';
import { randomInt } from 'crypto';

export class IndexShop {
  private productListWrapper: ElementFinder;
  private checkOutButton: ElementFinder;
  private cartQuantity: ElementFinder;
  private productList: ElementArrayFinder;

  constructor() {
    this.productListWrapper = $('div.productListWrapper');
    this.checkOutButton = $('div.titleBar div.checkout-button > a');
    this.cartQuantity = $('div.titleBar div.checkoutSection div.cartQuantity > div.cartDigit');
    this.productList = $$('div.productListWrapper  div.titleBottom div.tileAdd > button');
  }

  public getProductListWrapper(): ElementFinder {
    return this.productListWrapper
  }

  public async clickCheckOutButton(): Promise<void> {
    await this.checkOutButton.click();
  }

  public getCartQuantity(): ElementFinder {
    return this.cartQuantity
  }

  public getProductList(): ElementArrayFinder {
    return this.productList
  }

  public async addTwoProductsRandomToCart(): Promise<void> {
    const productList = await this.getProductList()
    for (var i = 0; i < 2; i++) {
      const index = randomInt(0, await this.getProductList().count() - 1)
      const product: ElementFinder = await productList[index]
      await product.click();
    }
  }

}