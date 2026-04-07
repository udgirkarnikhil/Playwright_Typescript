const {test, request, expect} = require('@playwright/test');
const APIUtils = require('../Utils/APIUtils');
const { text } = require('node:stream/consumers');

let webcontext;
let api = new APIUtils();
const loginPayload = {userEmail:"pranithi@gmail.com",userPassword:"Pranithi@2023"};
const orderPayload = {"orders":[{"country":"India","productOrderedId":"6960eae1c941646b7a8b3ed3"}]};
const body = {data:[],message:"No Orders"};

test.beforeAll('network test', async ({browser}) =>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://rahulshettyacademy.com/client');
    await page.getByPlaceholder('email@example.com').fill('pranithi@gmail.com');
    await page.locator('input#userPassword').fill('Pranithi@2023');
    await page.locator("[type='submit']").click();
    await page.waitForLoadState('networkidle');
    await context.storageState({path:'state.json'});
    webcontext = await browser.newContext({storageState:'state.json'});

})

test('network test1', async () =>
{
    const page = await webcontext.newPage();
    await page.goto('https://rahulshettyacademy.com/client');
    await page.locator('.card-body b').first().waitFor();
    const allTexts = await page.locator('.card-body b').allTextContents();
    console.log(allTexts);
})

test('network test2', async ({}) =>
{
    
    const token = await api.getToken(loginPayload);
    const orderId = await api.createOrder(orderPayload, token);
    const page = await webcontext.newPage();
    await page.goto('https://rahulshettyacademy.com/client');

    await page.route('https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*',async route=>
    {
        const response = await page.request.fetch(route.request());
        const jsonbody = JSON.stringify(body);

        route.fulfill(
            {
                response:response,
                body: jsonbody,
            }
        )
        
    });
    
    await page.locator('button[routerlink="/dashboard/myorders"]').click();

    await page.waitForResponse('https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*')
    await page.pause();
    await expect(page.locator('text=No Orders')).toBeVisible();
    
});

test('Network test3', async()=>
{
    const token = await api.getToken(loginPayload)
    const orderID = await api.createOrder(orderPayload,token)
    const page = await webcontext.newPage();
    await page.goto('https://rahulshettyacademy.com/client');
    await page.route('https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*', async route=>
    {
        await route.continue({url: 'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=69c95d1cf86ba51a65345d34'})
    })
    await page.locator('button[routerlink="/dashboard/myorders"]').click();
    await page.locator('.btn-primary').first().click();
    const title = await page.locator('.blink_me').textContent();
    console.log(title);
    
});