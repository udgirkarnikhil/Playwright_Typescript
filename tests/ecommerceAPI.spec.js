const {test, request} = require ('@playwright/test');
const APIUtils = require('../Utils/APIUtils')

const loginPayload = {userEmail:"pranithi@gmail.com",userPassword:"Pranithi@2023"};
const orderPayload = {"orders":[{"country":"India","productOrderedId":"6960eae1c941646b7a8b3ed3"}]};
let token;
const api = new APIUtils();

test.beforeAll ('ecomm login', async () =>
    {
        
        token = await api.getToken(loginPayload);

    });
       
test('@Api ecommerceprod', async ({page})=>
    {
        page.addInitScript(value=>{
            window.localStorage.setItem('token', value);
        },token);
        await page.goto('https://rahulshettyacademy.com/client/');
        //await page.waitForLoadState('networkidle');
        await page.locator('.card-body b').first().waitFor();
        const allTexts = await page.locator('.card-body b').allTextContents();
        console.log(allTexts);
    });

test ('@Api eccom add product API', async ({page}) =>

    {
        const orderId = await api.createOrder(orderPayload, token);
        page.addInitScript(value=>{
            window.localStorage.setItem('token', value);
        },token);
        page.goto('https://rahulshettyacademy.com/client/');
        await page.locator('button[routerlink="/dashboard/myorders"]').click();
        const table = page.locator('.table');
        const column = table.locator('th');
        await column.first().waitFor();
        const columnCount = await column.count();
        console.log(columnCount);
        let namecolindex, pricecolindex;
        for (let i=0; i<columnCount; i++){
            if(await column.nth(i).textContent()==='Name'){
                namecolindex = i;
                console.log(namecolindex);
            }

        }
        for (let j=0; j<columnCount; j++){
            if(await column.nth(j).textContent()==='Price'){
                pricecolindex = j;
                console.log(pricecolindex);
            }
        }
        const rows = table.locator('tr');
        const rowCount = await rows.count();
        console.log(rowCount);
        for (let k=0; k<rowCount; k++){
            if(await column.nth(k).textContent()===orderId){
                const name = await rows.nth(k).locator('td').nth(namecolindex-1).textContent();
                const price = await rows.nth(k).locator('td').nth(pricecolindex-1).textContent();
                console.log(name, price);
            }
        }  
    });