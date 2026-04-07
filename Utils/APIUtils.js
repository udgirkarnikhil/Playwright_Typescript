const {request} = require ('@playwright/test');
class APIUtils {
    async getToken(loginPayload)
    {
        const APIContext = await request.newContext();
        const loginResponse = await APIContext.post('https://rahulshettyacademy.com/api/ecom/auth/login', {data: loginPayload});
        const loginResponseJson = await loginResponse.json();
        const token = loginResponseJson.token;
        console.log(token);
        return token;
        
    }

    async createOrder(orderPayload, token)
    {
        const APIContext = await request.newContext();
        const orderResponse = await APIContext.post('https://rahulshettyacademy.com/api/ecom/order/create-order',
        {data:orderPayload,
            headers:{
            'Authorization': token,
            'Content-Type': 'application/json'},
        });
        const orderResponseJson = await orderResponse.json();
        console.log(orderResponseJson);
        const orderId =orderResponseJson.orders[0];
        console.log(orderId);
        return orderId;

    }
}

module.exports = APIUtils;