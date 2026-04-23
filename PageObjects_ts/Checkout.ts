
import { expect, Locator, Page } from "@playwright/test";
export class Checkout
{
    page:Page;
    shippingEmail:Locator;
    username:Locator;

    constructor(page:Page)
    {
        this.page = page;
        this.shippingEmail = page.locator('input.input.txt.text-validated.ng-untouched.ng-pristine.ng-valid');
        this.username = page.locator('#userEmail');
    }

async singlepurchaseOrder(username:string)
{
    await this.page.getByText('Buy Now', {exact: true}).waitFor();
    await this.page.getByText('Buy Now').click();
    await expect(this.shippingEmail).toHaveValue(username);
    await this.page.getByPlaceholder('Select Country').pressSequentially('ind', {delay:100});
    await this.page.getByText('India', {exact: true}).click();
    await this.page.locator('.action__submit').click();   
}

async orderConfirmation(){
    await expect(this.page.locator('.hero-primary')).toBeVisible();
    await expect(this.page.locator('label.ng-star-inserted')).toBeVisible();
    const order:any = await this.page.locator('label.ng-star-inserted').textContent();
    const orderId:any = order.split(' ')[2];
    console.log(orderId)
    return orderId;
}
}
module.exports={Checkout}