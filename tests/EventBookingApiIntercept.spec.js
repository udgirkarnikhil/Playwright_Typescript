import { assert } from 'node:console';

const {test,request,expect}=require('@playwright/test')

const BASE_URL = 'https://eventhub.rahulshettyacademy.com';
const email='pranithi@gmail.com';
const password='Pranithi@2023';

const SIX_EVENTS_RESPONSE = {
  data: [
    { id: 1, title: 'Tech Summit 2025', category: 'Conference', eventDate: '2025-06-01T10:00:00.000Z', venue: 'HICC', city: 'Hyderabad', price: '999', totalSeats: 200, availableSeats: 150, imageUrl: null, isStatic: false },
    { id: 2, title: 'Rock Night Live',  category: 'Concert',    eventDate: '2025-06-05T18:00:00.000Z', venue: 'Palace Grounds', city: 'Bangalore', price: '1500', totalSeats: 500, availableSeats: 300, imageUrl: null, isStatic: false },
    { id: 3, title: 'IPL Finals',       category: 'Sports',     eventDate: '2025-06-10T19:30:00.000Z', venue: 'Chinnaswamy', city: 'Bangalore', price: '2000', totalSeats: 800, availableSeats: 50, imageUrl: null, isStatic: false },
    { id: 4, title: 'UX Design Workshop', category: 'Workshop', eventDate: '2025-06-15T09:00:00.000Z', venue: 'WeWork', city: 'Mumbai', price: '500', totalSeats: 50, availableSeats: 20, imageUrl: null, isStatic: false },
    { id: 5, title: 'Lollapalooza India', category: 'Festival', eventDate: '2025-06-20T12:00:00.000Z', venue: 'Mahalaxmi Racecourse', city: 'Mumbai', price: '3000', totalSeats: 5000, availableSeats: 2000, imageUrl: null, isStatic: false },
    { id: 6, title: 'AI & ML Expo',    category: 'Conference',  eventDate: '2025-06-25T10:00:00.000Z', venue: 'Bangalore International Exhibition Centre', city: 'Bangalore', price: '750', totalSeats: 300, availableSeats: 180, imageUrl: null, isStatic: false },
  ],
  pagination: { page: 1, totalPages: 1, total: 6, limit: 12 },
};

const FOUR_EVENTS_RESPONSE = {
  data: [
    { id: 1, title: 'Tech Summit 2025', category: 'Conference', eventDate: '2025-06-01T10:00:00.000Z', venue: 'HICC', city: 'Hyderabad', price: '999', totalSeats: 200, availableSeats: 150, imageUrl: null, isStatic: false },
    { id: 2, title: 'Rock Night Live',  category: 'Concert',    eventDate: '2025-06-05T18:00:00.000Z', venue: 'Palace Grounds', city: 'Bangalore', price: '1500', totalSeats: 500, availableSeats: 300, imageUrl: null, isStatic: false },
    { id: 3, title: 'IPL Finals',       category: 'Sports',     eventDate: '2025-06-10T19:30:00.000Z', venue: 'Chinnaswamy', city: 'Bangalore', price: '2000', totalSeats: 800, availableSeats: 50, imageUrl: null, isStatic: false },
    { id: 4, title: 'UX Design Workshop', category: 'Workshop', eventDate: '2025-06-15T09:00:00.000Z', venue: 'WeWork', city: 'Mumbai', price: '500', totalSeats: 50, availableSeats: 20, imageUrl: null, isStatic: false },
  ],
  pagination: { page: 1, totalPages: 1, total: 4, limit: 12 },
};

export  async function loginAndGoToEvents(page){

    await page.goto('https://eventhub.rahulshettyacademy.com/login');
    await page.getByPlaceholder('you@email.com').fill(email);
    await page.getByLabel('Password').fill(password);
    await page.locator('#login-btn').click();
    await page.locator('#nav-events').click();
};

export async function logingmailuser(page,gmailuser,gmailpwd){

    await page.goto('https://eventhub.rahulshettyacademy.com/login');
    await page.getByPlaceholder('you@email.com').fill(gmailuser);
    await page.getByLabel('Password').fill(gmailpwd);
    await page.locator('#login-btn').click();
    
};

test('Test1',async({browser})=> {
    const context=await browser.newContext();
    const page=await context.newPage();
    page.route('**/api/events**',async route=>
    {
        route.fulfill({
            status: 200,
            contentType :'application/json',
            body :JSON.stringify(SIX_EVENTS_RESPONSE),
        });
    });
    await loginAndGoToEvents(page);
    const eventcards= page.getByTestId('event-card');
    eventcards.first().waitFor();
    await page.pause();
    await expect(eventcards.first()).toBeVisible();
    const countcards=await eventcards.count();
    console.log(countcards);
    assert(countcards===6);
    await expect(page.locator('text=/sandbox holds up to/i')).toBeVisible();
    await expect(page.locator('text=/sandbox holds up to/i')).toContainText('9');

});
test('test2',async({page})=>{

     page.route('**/api/events**',async route=>
    {
        route.fulfill({
            status: 200,
            contentType :'application/json',
            body :JSON.stringify(FOUR_EVENTS_RESPONSE),
        });
    });
    await loginAndGoToEvents(page);
    const eventcards= page.getByTestId('event-card');
    eventcards.first().waitFor();
    await expect(eventcards.first()).toBeVisible();
    const countcards=await eventcards.count();
    console.log(countcards);
    assert(countcards===4);
    await expect(page.locator('text=/sandbox holds up to/i')).not.toBeVisible();
   
});

test ('assignment2', async ({page})=>
{
    const APIrequest = await request.newContext();
    const response = await APIrequest.post('https://api.eventhub.rahulshettyacademy.com/api/auth/login', 
    {data:{
            email: "pranithi@yahoo.com",
            password: "Pranithi@2023",
        },
    headers:{contentType: 'application/json'},
    },  
)
    const jsonresponse = await response.json();
    console.log(jsonresponse);
    const token = jsonresponse.token;
    console.log(token);
    expect( response.ok()).toBeTruthy();

    const eventresponse = await APIrequest.get('https://api.eventhub.rahulshettyacademy.com/api/events',
        {
        headers: {contentType: 'application/json', Authorization: `Bearer ${token}`},
        params: {
            category : 'Conference',
            city : 'Bangalore',
            search : 'testing',
            page : 1,
            limit : 20,
        },
        
})
    expect(eventresponse.ok()).toBeTruthy();
    const jsoneventresponse = await eventresponse.json();
    console.log(jsoneventresponse);
    const eventid = jsoneventresponse.data[0].id;
    console.log(eventid);

    const createeventresponse = await APIrequest.post('https://api.eventhub.rahulshettyacademy.com/api/bookings', 
        {data: {
                    eventId: eventid,
                    customerName: "Priya Sharma",
                    customerEmail: "priyasharma@yahoo.com",
                    customerPhone: "+91-9876543210",
                    quantity: 1
                },
        headers: {contentType: 'application/json', Authorization: `Bearer ${token}`},
        },
    )
    expect(await createeventresponse.ok()).toBeTruthy();
    const jsoncreateeventresponse = await createeventresponse.json();
    console.log(jsoncreateeventresponse);
    const yahooBookinId = jsoncreateeventresponse.data.id;
    console.log(yahooBookinId);

    await logingmailuser(page,'pranithi@gmail.com','Pranithi@2023');
    await page.goto(`https://eventhub.rahulshettyacademy.com/bookings/${yahooBookinId}`,{waitUntil:'networkidle'});
    await expect(page.locator('text=Access Denied')).toBeVisible();
    await expect(page.locator('text=You are not authorized to')).toBeVisible();

});