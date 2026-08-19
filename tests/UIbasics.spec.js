const {test, expect} = require('@playwright/test');

test('Browser Context Playwright test', async ({browser})=>
{
    
    const context = await browser.newContext();
    const page = await context.newPage ();
    const user = page.locator("#username");
    const sign = page.locator("#signInBtn");
    const pass = page.locator("[type='password']");
    const cardtitles = page.locator(".card-body a"); 
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    // console.log(await page.title());
    await user.fill("rahulshettyacademy");
    await pass.fill("Learning@830$3mK2");
    await sign .click();
    // console.log(await page.locator("[style*='block']").textContent());
    // await expect(page.locator("[style*='block']")).toContainText('password');
    console.log(await cardtitles.first().textContent());
    console.log(await cardtitles.nth(2).textContent());
    console.log(await page.locator(".card-body h5").last().textContent());
    const alltitles = await cardtitles.allTextContents();
    console.log(alltitles);

});


test('Page Playwright test', async ({page}) =>
{
    await page.goto("https://www.google.com");
    console.log(await page.title());
    await expect(page).toHaveTitle("Google");

});


test('Page Playwright test1', async ({page}) =>
{
    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
    console.log(await page.title());
    await page.locator("input[placeholder='Username']").fill("Abhi@gm.tev");
    await page.locator("input[placeholder='Password']").fill("Abh");
    await page.locator("button[type='submit']").click();
    await expect(page.locator('.oxd-text.oxd-text--p.oxd-alert-content-text')).toContainText("Invalid");

});

test('dropdown and buttons', async({page}) =>
{
    const user = page.locator("#username");
    const sign = page.locator("#signInBtn");
    const pass = page.locator("[type='password']");
    const drop = page.locator("select.form-control");
    const DocLink = page.locator("[href*=request]");
    const hireLink = page.locator("[href*=hire]");
    
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    // console.log(await page.title());
    await user.fill("rahulshettyacademy");
    await pass.fill("Learning@830$3mK2");
    await drop.selectOption("teach");
    await page.locator("#usertype").nth(1).click();
    await page.locator("#okayBtn").click();
    console.log(await page.locator("#usertype").nth(1).isChecked());
    await expect(page.locator("#usertype").nth(1)).toBeChecked();
    await page.locator("#terms").click();
    console.log(await page.locator("#terms").isChecked());
    expect(await page.locator("#terms")).toBeChecked();
    await page.locator("#terms").uncheck();
    console.log(await page.locator("#terms").isChecked());
    expect( await page.locator("#terms").isChecked()).toBeFalsy();
    await expect(hireLink).toHaveAttribute("class","blinkingText");
    await expect(DocLink).toHaveAttribute("class","blinkingText");



    // await page.pause();
    await sign .click();


});


test("separate window", async({browser})=>{
    const context = await browser.newContext();
    const page = await context.newPage ();
    
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const DocLink = page.locator("[href*='documents-request']");
    const hireLink = page.locator("[href*='hire']");
    const user = page.locator("#username");
    
    const [newpage] = await Promise.all(
    [
        context.waitForEvent('page'),
        DocLink.click(),

    ])

    const firsttext = await newpage.locator('.im-para.red').textContent();
    console.log(firsttext);
    const twosec = firsttext.split("@");
    const domain = twosec[1].split(" ")[0];
    console.log(domain);
    const email = twosec[0].split("at ")[1];
    console.log(email);
    const newtext = email+ "@" + domain;
    console.log(newtext);
    await user.fill(newtext);
    console.log(await page.locator('#username').inputValue());
    

});


test('calenderch', async({page})=>{
    const monthn = '1';
    const dayn = '25';
    const yearn = '2028';

    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
    await page.locator(".react-date-picker__inputGroup").click();
    await page.locator(".react-calendar__navigation__label__labelText--from").click();
    await page.locator(".react-calendar__navigation__label__labelText--from").click();
    await page.getByText(yearn).click();
    await page.locator('.react-calendar__year-view__months__month').nth(Number(monthn)-1).click();
    await page.locator("//abbr[text()='"+dayn+"']").click();


});