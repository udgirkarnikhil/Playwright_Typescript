import { Page } from '@playwright/test';
import {LoginPage} from '../PageObjects_ts/LoginPage';
import {Dashboard} from '../PageObjects_ts/Dashboard';
import {Checkout} from '../PageObjects_ts/Checkout';
import {OrderHistory} from '../PageObjects_ts/OrderHistory';

export class POManager
{
    page:Page;
    lg:LoginPage;
    db:Dashboard;
    ch:Checkout;
    od:OrderHistory;

    constructor(page:Page)
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