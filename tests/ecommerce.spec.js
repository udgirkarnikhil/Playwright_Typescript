const {test, expect} = require ('@playwright/test');

test('ecommerceLogin', async ({browser})=>
{
    const context =  await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://rahulshettyacademy.com/client/');
    await page.getByPlaceholder('email@example.com').fill('pranithi@gmail.com');
    await page.locator('input#userPassword').fill('Pranithi@2023');
    await page.locator("[type='submit']").click();
    //await page.waitForLoadState('networkidle');
    await page.locator('.card-body b').first().waitFor();
    const allTexts = await page.locator('.card-body b').allTextContents();
    console.log(allTexts);
}
);

test('ecommerce_addproduct to cart', async ({browser})=>
{
    const context =  await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://rahulshettyacademy.com/client/');
    await page.getByPlaceholder('email@example.com').fill('pranithi@gmail.com');
    await page.locator('input#userPassword').fill('Pranithi@2023');
    await page.locator("[type='submit']").click();
    //await page.waitForLoadState('networkidle');
    const cardbody = page.locator('.card-body');
    await page.locator('.card-body b').first().waitFor();
    const allTexts = await page.locator('.card-body b').allTextContents();
    console.log(allTexts);

    for(let i=0; i<allTexts.length; i++){
        if(allTexts[i].includes('ZARA COAT 3')){
            await cardbody.nth(i).getByRole('button', {name: 'Add To Cart'}).click();
            break;}
    }
    
    await page.locator("[routerlink='/dashboard/cart']").click();
    await page.getByText('Buy Now').click();
    await expect(page.locator('input.txt.text-validated.ng-untouched')).toHaveValue('pranithi@gmail.com');
    await page.getByPlaceholder('Select Country').pressSequentially('ind', {delay:100});
    //await page.locator('button.ng-star-inserted').filter({hasText: 'India'}).click();
    await page.getByText('India', {exact: true}).click();
    await page.locator('.action__submit').click();
    await expect(page.locator('.hero-primary')).toBeVisible();
    await expect(page.locator('label.ng-star-inserted')).toBeVisible();
    const order = await page.locator('label.ng-star-inserted').textContent();
    const orderId = order.split(' ')[2];
    console.log(orderId);

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
}
);