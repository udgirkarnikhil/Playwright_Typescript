import { Given, When, Then } from '@cucumber/cucumber';
import { chromium } from 'playwright';
import { POManager } from '../../PageObjects_ts/POManager';

Given('the user launches the ecoomerce website', { timeout: 20000 }, async function () {
    // Write code here that turns the phrase above into concrete actions
    const browser = await chromium.launch();
    const context = await browser.newContext();
    this.page = await context.newPage();
    this.po = new POManager(this.page);
    this.lg = this.po.getLoginpage();
    await this.lg.goTo();

});

When('the valid user credentials {string} and {string} are entered', async function (username, password) {
    // Write code here that turns the phrase above into concrete actions
    await this.lg.validlogin(username, password);
});

Then('ecommerce website should be launched', async function () {
    // Write code here that turns the phrase above into concrete actions
    this.db = this.po.getDashboard();
});

Then('website dashboard and list of products should be visible', { timeout: 20000 }, async function () {
    // Write code here that turns the phrase above into concrete actions
    await this.db.productTitles();
});


//scenario 2

When('the user selects single {string} and add clicks add to cart button', async function(productcode) {
    // Write code here that turns the phrase above into concrete actions
        this.text = await this.db.productTitles();
        await this.db.addToCart(this.text, productcode);

});
Then('user navigates to cart page', {timeout: 60000},async function () {
    // Write code here that turns the phrase above into concrete actions
        await this.db.gotoCart();
});

When('user places the order with {string} and navigates to order history page',{timeout: 60000}, async function (username) {
    // Write code here that turns the phrase above into concrete actions
        this.ch = this.po.getcheckout();
        await this.ch.singlepurchaseOrder(username);
        this.orderId = await this.ch.orderConfirmation();
});

Then('the order history should be visible with the product and order details', async function () {
    // Write code here that turns the phrase above into concrete actions
        this.od= this.po.getOrderHistory();
        await this.od.gotoOrdersHistory();
        await this.od.getorderdetails(this.orderId);
    
});

