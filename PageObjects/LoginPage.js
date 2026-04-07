class LoginPage
{
    constructor(page)
    {
        this.page = page;
        this.username = page.locator('#userEmail');
        this.password = page.locator('input#userPassword');
    }

async goTo()
{
    await this.page.goto('https://rahulshettyacademy.com/client/');
}

async validlogin(username, password)
{
    
    await this.username.fill(username);
    await this.password.fill(password);
    await this.page.locator("[type='submit']").click();
}
}
module.exports = {LoginPage};