import { test, expect } from '@playwright/test';
import { assert } from 'node:console';
import { get } from 'node:http';

test('Register a new user', async ({ page }) => {
  await page.goto('https://eventhub.rahulshettyacademy.com/login');
  await page.getByRole('link', { name: 'Register' }).click();
  await page.getByTestId('register-email').click();
  await page.getByTestId('register-email').fill('pranithi@yahoo.com');
  await page.getByTestId('register-password').click();
  await page.getByTestId('register-password').fill('Pranithi@2023');
  await page.getByRole('textbox', { name: 'Repeat your password' }).click();
  await page.getByRole('textbox', { name: 'Repeat your password' }).fill('Pranithi@2023');
  await page.getByTestId('register-btn').click();
});

export async function login(page,email,password){
    await page.goto('https://eventhub.rahulshettyacademy.com/login');
    await page.getByPlaceholder('you@email.com').fill(email);
    await page.getByLabel('Password').fill(password);
    await page.locator('#login-btn').click();
}

export async function futureDateValue(page,month,day,year,hr,min){ 
   

    // Convert to 24-hour format if needed
    //const hour24 = hr; // if you want AM/PM logic, I can add it

    // Ensure 2‑digit formatting
    const mm = String(month).padStart(2, "0");
    const dd = String(day).padStart(2, "0");
    const HH = String(hr).padStart(2, "0");
    const MM = String(min).padStart(2, "0");
    const AMPM = hr >= 12 ? "PM" : "AM";    

    const dateValue = `${year}-${mm}-${dd}T${HH}:${MM}`;


    await page.locator('[id*=event-date]').fill(dateValue);
}


test('Book an event', async ({ page }) => {

    //login
    await login(page,'pranithi@gmail.com','Pranithi@2023');
    await expect(page.getByRole('link', { name: 'Browse Events →' })).toBeVisible();
    const eventTitle = `Test Event ${Date.now()}`;
    //book an event
    await page.goto('https://eventhub.rahulshettyacademy.com/admin/events');
    await page.locator("#event-title-input").fill(eventTitle);
    await page.locator("[placeholder='Describe the event…']").fill("This is a test event");
    await page.getByLabel("City").fill("Bangalore");
    await page.getByRole('combobox', { name: 'Category' }).selectOption('Sports');
    await page.getByLabel('Venue').fill("Kanteerava Stadium");
    await futureDateValue(page,'12','25','2026','05','30');
    await page.getByLabel('Price ($)').fill('100');
    await page.getByLabel('Total Seats').fill('50');
    await page.locator("#add-event-btn").click();
    await expect(page.getByText('Event created!')).toHaveText('Event created!');

    //step3
    await page.getByTestId('nav-events').click();
    const eventcards= page.getByTestId('event-card');
    await expect(eventcards.first()).toBeVisible();
    const events=await eventcards.locator('h3').allTextContents();
    console.log(events);
    await expect(eventcards.locator('h3').filter({ hasText: eventTitle })).toBeVisible();
    const eventtobook = eventcards.filter({
    has: page.locator('h3', { hasText: eventTitle })});

    const seattext=await eventtobook.locator('text=/seats/').innerText();
   
    const seatsAvailabletobook=parseInt(seattext.match(/\d+/)[0],10);

    console.log(seatsAvailabletobook);

    //step4
    await eventtobook.getByTestId('book-now-btn').click();

    //step5
    await expect(page.locator('#ticket-count')).toHaveText('1');
    await page.getByLabel('Full Name').fill('Pranithi');
    await page.locator('#customer-email').fill('pranithi@gmail.com');
    await page.getByPlaceholder('+91 98765 43210').fill('9876543210');
    await page.locator('.confirm-booking-btn').click();

    //step6
    await expect(page.getByText('Booking confirmed!')).toBeVisible();
    await expect(page.locator('.booking-ref').first()).toBeVisible();
    const bookingref=await page.locator('.booking-ref').first().innerText();
    console.log(bookingref);

    //step7
    await page.getByRole('link', { name: 'View My Bookings' }).click();
    expect(page.url()).toBe('https://eventhub.rahulshettyacademy.com/bookings');
    const getAllBookings=page.locator('#booking-card');
    await expect(getAllBookings.first()).toBeVisible();
    const bookingCard = getAllBookings.filter({ has: page.locator('.booking-ref', { hasText: bookingref })});
    await expect(bookingCard).toBeVisible();
    await expect(bookingCard.locator('h3')).toContainText(eventTitle);

    //step8
    await page.getByTestId('nav-events').click();
    const eventcards1= page.getByTestId('event-card');
    await expect(eventcards1.first()).toBeVisible();
    const eventtobook1 = eventcards1.filter({
    has: page.locator('h3', { hasText: eventTitle })});

    const seattext1=await eventtobook1.locator('text=/seats/').innerText();
    const seatsafterbooking=await parseInt(seattext1.match(/\d+/)[0],10);
    console.log(seatsafterbooking);
    await assert(seatsafterbooking === seatsAvailabletobook - 1);
    
});