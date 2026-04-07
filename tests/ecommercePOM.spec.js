const {test, expect} = require ('@playwright/test');
const {POManager} = require('../PageObjects/POManager')

const Dataset=JSON.parse(JSON.stringify(require('../Utils/ecommerceLogin_Testdata.json')))

for(const data of Dataset)
{
test(`ecommerceLogin ${data.username}`, async ({browser})=>
{

    const context =  await browser.newContext();
    const page = await context.newPage();
    const po = new POManager(page);
    const lg = po.getLoginpage();
    await lg.goTo();
    await lg.validlogin(data.username, data.password);
        //await page.waitForLoadState('networkidle');
    const db = po.getDashboard();
    await db.productTitles();
}
);

test(`ecommerce_addproduct to cart1 ${data.username}`, async ({browser})=>
{
    const context =  await browser.newContext();
    const page = await context.newPage();
    const po = new POManager(page);
    const lg = po.getLoginpage();
    await lg.goTo();
    await lg.validlogin(data.username, data.password);
    //await page.waitForLoadState('networkidle');
    const cardbody = page.locator('.card-body');
    const db = po.getDashboard();
    const allTexts = await db.productTitles(); 

    await db.addToCart(allTexts,data.productcode);
    
    await db.gotoCart();
    const ch = po.getcheckout();
    await ch.singlepurchaseOrder(data.username);
    const orderId = await ch.orderConfirmation();

    const od= po.getOrderHistory();
    await od.gotoOrdersHistory();
    await od.getorderdetails(orderId);
});
}