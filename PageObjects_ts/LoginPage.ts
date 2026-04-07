import { Page,Locator } from "@playwright/test";


export class LoginPage
{
    page:Page;
    username:Locator;
    password:Locator;
    constructor(page:Page)
    {
        this.page = page;
        this.username = page.locator('#userEmail');
        this.password = page.locator('input#userPassword');
    }

async goTo()
{
    await this.page.goto('https://rahulshettyacademy.com/client/');
}

async validlogin(username:string, password:string)
{
    
    await this.username.fill(username);
    await this.password.fill(password);
    await this.page.locator("[type='submit']").click();
}
}
module.exports = {LoginPage};