const {LoginPage} = require('../PageObjects/LoginPage');
const {Dashboard} = require('../PageObjects/Dashboard');
const {Checkout} = require('../PageObjects/Checkout');
const {OrderHistory}=require('../PageObjects/OrderHistory')

class POManager
{
    constructor(page)
    {
        this.page = page;
        this.lg = new LoginPage(this.page);
        this.db = new Dashboard(this.page);
        this.ch = new Checkout(this.page);
        this.od = new OrderHistory(this.page);

    }

getLoginpage()
{
    return this.lg;
}

getDashboard()
{
    return this.db;
}
getcheckout()
{
    return this.ch;
}
getOrderHistory()
{
    return this.od;
}
}


module.exports={POManager}