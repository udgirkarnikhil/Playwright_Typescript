class OrderHistory
{
    constructor(page){
        this.page=page;
        this.table = page.locator('.table');
        this.column = this.table.locator('th');
        this.rows = this.table.locator('tr')
    }

    async gotoOrdersHistory()
    {
         await this.page.locator('button[routerlink="/dashboard/myorders"]').click();
    }

    async getcoloumindex(colname)
    {   
        await this.column.first().waitFor();
        const columnCount = await this.column.count();
        console.log(columnCount);
        let index;
        for (let i=0; i<columnCount; i++)
        {
            const coltext =await this.column.nth(i).textContent();
            if(await coltext.trim()===colname)
            {
                    index = i;
                    console.log(index);
                    return index;
            }   
        }return -1;
    }   
    async getrows()
    {
        const rowCount = await this.rows.count();
        console.log(rowCount);
        return rowCount;
    }
    async getorderdetails(orderId)
    {
        const namecolindex=await this.getcoloumindex('Name');
        const pricecolindex=await this.getcoloumindex('Price');
        const rowCount=await this.getrows();

        for (let k=0; k<rowCount; k++)
            {
                if(await this.column.nth(k).textContent()===orderId)
                    {
                        const name = await this.rows.nth(k).locator('td').nth(namecolindex-1).textContent();
                        const price = await this.rows.nth(k).locator('td').nth(pricecolindex-1).textContent();
                        console.log(name, price);
                    }
            }
    }
}
module.exports={OrderHistory};