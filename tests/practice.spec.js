const {test, expect} = require('@playwright/test');

test('firstprogram', async ({browser}) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://www.google.com/');

});

test('secondprogram',async ({page}) => {
 
    await page.goto('https://www.google.com/');
});

test('login page',async ({page}) => {
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    const radioOption = page.locator('span.radiotextsty');
    const dropdown = page.locator('select.form-control');
    await page.locator('#username').fill('rahulshettyacademy');
    await page.locator('#password').fill('Learning@830$3mK2');
    await radioOption.last().click();
    await page.locator('button#okayBtn').click();
    await expect(radioOption.last()).toBeChecked();
    await dropdown.selectOption('consult');
    await expect(dropdown.selectOption('consult')).toBeTruthy();
    await page.locator('#signInBtn').click();

});


test('child page', async ({browser})=>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    
    const [newpage] = await Promise.all(
    [context.waitForEvent('page'),
    page.locator('a[href*="documents-request"]').click()])
    
    const text =await newpage.locator('.red').textContent()
    console.log(text);
    const t1 = text.split('@');
    console.log(t1);
    const t2 = t1[1].split(' ');
    console.log(t2);
    const t3 = t2[0].trim();
    console.log(t3);
    
    await page.locator('#username').fill(t3);
    await page.pause();
});

test('prac', async () =>
{
    let quote = 'tuesday is great day to learn';
    let marks = [90, 80, 70];
    let double = marks.map(a => a*2);
    console.log(double);

    let fil = marks.filter(b=> b%3 ==0);
    console.log(fil);

    let s = marks.reduce((su,c)=>su+c,0)
    console.log(s);

    let count = 0;
    for(let i=0; i<quote.length;i++)
    { 
        if(quote.startsWith('day',i))
    {
        count++;
    }

    }
    console.log(count);

    

});
