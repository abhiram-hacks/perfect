import{test, expect} from '@playwright/test';

test('Login-1', async({page})=>{
    const baseURL = 'https://eventhub.rahulshettyacademy.com/login';
    const userid = 'abhi@tech.com';
    const userpass = 'Password1!'
    await page.goto(baseURL);
    await page.getByPlaceholder('you@email.com').fill(userid);
    await page.getByLabel('Password').fill(userpass);
    await page.locator('#login-btn').click();
    await page.waitForLoadState('networkidle');
    expect(await page.getByText('Browse Events →').isVisible());
    await page.getByText('Browse Events →').click();

    await page.getByRole('button', {name: 'Admin'}).click();
    await page.getByRole('navigation').getByRole('link', { name: 'Manage Events' }).click();
    await page.locator('#event-title-input').fill('Test First');
    await page.locator('#admin-event-form textarea').fill('Abhiram Test New');
    await page.getByLabel('City').fill('Cuttack');
    await page.getByLabel('Venue').fill('New Test Abhiram');
    // await page.locator('#event-date-&-time').fill('22072026');
    await page.getByLabel('price-($)').fill('1000');
    await page.getByLabel('Total Seats').fill('50');
    await page.locator('##add-event-btn').click();


    await page.pause();

});