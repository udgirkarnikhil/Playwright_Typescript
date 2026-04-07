class Dashboard
{
    constructor(page)
    {
        this.page = page;
        this.products = page.locator('.card-body b');
        this.productcard=page.locator('.card-body');
        this.cart=page.locator("[routerlink='/dashboard/cart']")
    }

async productTitles()
{
    await this.products.first().waitFor();
    const allTexts = await this.products.allTextContents();
    console.log(allTexts);
    return allTexts;
}

async addToCart(allTexts,productcode)
{
    
        for(let i=0; i<allTexts.length; i++){
        if(allTexts[i].includes(productcode)){
            await this.productcard.nth(i).getByRole('button', {name: 'Add To Cart'}).click();
            break;}
    }
}

async gotoCart()
{
    await this.cart.click();
}

}
module.exports = {Dashboard}