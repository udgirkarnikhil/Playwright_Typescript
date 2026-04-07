import { assert } from 'node:console';

const {test, expect} = require('@playwright/test')


export async function loginAndGotoBooking(page, email, password)
{
    page.goto('https://eventhub.rahulshettyacademy.com');
    await page.getByPlaceholder('you@email.com').fill(email);
    await page.getByLabel('Password').fill(password);
    await page.locator('#login-btn').click();
    await page.locator('#nav-bookings').click();
    await expect(page.locator('.inline-flex').first()).toBeVisible();
    
} 

test ('single ticket event', async ({page}) =>
{
    //step 1
    await loginAndGotoBooking(page, 'pranithi@gmail.com', 'Pranithi@2023');

    //step 2
    await page.locator('#nav-events').click();
    const event1 = await page.locator('#event-card').first();
    await event1.locator('#book-now-btn').click();
    await page.getByPlaceholder('Your full name').fill('Nikhil Udgirkar');
    await page.getByPlaceholder('you@email.com').fill('pranithi@gmail.com');
    await page.getByPlaceholder('+91 98765 43210').fill('+19043860291');
    await page.locator('#confirm-booking').click();

    //step 3
    await page.locator('#nav-bookings').click();
    await expect(page.url('https://eventhub.rahulshettyacademy.com/bookings')).toBeTruthy();
    const firstbooking = page.locator('#booking-card').first();
    await firstbooking.getByText('View Details').click();
    await expect(page.getByText('Booking Information')).toBeVisible();

    //step 4
    const bookingref = await page.locator('.font-mono').last().textContent();
    const bookingtitle = await page.locator('h1.text-2xl').textContent();
    console.log(bookingref,bookingtitle);
    assert(bookingref[0]===bookingtitle[0]);

    //step 5
    await page.locator('#check-refund-btn').click();
    console.log(await page.locator('#refund-spinner').textContent());
    await expect(page.locator('#refund-spinner')).not.toBeVisible({timeout: 6000});

    //step 6
    await expect(page.locator('#refund-result')).toBeVisible();
    await expect(page.locator('#refund-result')).toContainText('Eligible for refund');
    await expect(page.locator('#refund-result')).toContainText('Single-ticket bookings qualify for a full refund');

})

test ('Group ticket event', async ({page}) =>
{
    //step 1
    await loginAndGotoBooking(page, 'pranithi@gmail.com', 'Pranithi@2023');

    //step 2
    await page.locator('#nav-events').click();
    const event1 = await page.locator('#event-card').first();
    await event1.locator('#book-now-btn').click();
    await page.locator('.w-9').last().dblclick();
    await page.getByPlaceholder('Your full name').fill('Nikhil Udgirkar');
    await page.getByPlaceholder('you@email.com').fill('pranithi@gmail.com');
    await page.getByPlaceholder('+91 98765 43210').fill('+19043860291');
    await page.locator('#confirm-booking').click();

    //step 3
    await page.locator('#nav-bookings').click();
    await expect(page.url('https://eventhub.rahulshettyacademy.com/bookings')).toBeTruthy();
    const firstbooking = page.locator('#booking-card').first();
    await firstbooking.getByText('View Details').click();
    await expect(page.getByText('Booking Information')).toBeVisible();

    //step 4
    const bookingref = await page.locator('.font-mono').last().textContent();
    const bookingtitle = await page.locator('h1.text-2xl').textContent();
    console.log(bookingref,bookingtitle);
    assert(bookingref[0]===bookingtitle[0]);

    //step 5
    await page.locator('#check-refund-btn').click();
    console.log(await page.locator('#refund-spinner').textContent());
    await expect(page.locator('#refund-spinner')).not.toBeVisible({timeout: 6000});

    //step 6
    await expect(page.locator('#refund-result')).toBeVisible();
    await expect(page.locator('#refund-result')).toContainText('Not eligible for refund');
    await expect(page.locator('#refund-result')).toContainText('Group bookings (3 tickets) are non-refundable');
    
})
