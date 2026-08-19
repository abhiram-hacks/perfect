const {test, expect} = require('@playwright/test');

// test('e2e flow on shop register', async ({page}) =>
// {
//     await page.goto("https://rahulshettyacademy.com/client/#/auth/login");

//     await page.locator('.text-reset').click();
//     await page.locator('#firstName').fill("Raja");
//     await page.locator('#lastName').fill("Hero");
//     await page.locator('#userEmail').fill("newhero@rahul.com");
//     await page.locator('#userMobile').fill("9809011001");
//     await page.getByRole('combobox').selectOption("3: Engineer");
//     await page.getByRole('radio').nth(0).click();
//     await page.locator('#userPassword').fill("NewPass@1234");
//     await page.locator('#confirmPassword').fill("NewPass@1234");
//     await page.getByRole('checkbox').click();
//     await page.getByRole('button', { name: 'Register' }).click();
//     console.log(await page.locator('#userEmail').inputValue());
//     console.log(await page.locator('#userPassword').inputValue());
//     await expect(page.getByText("Account Created Successfully")).toBeVisible();

// });


test('e2e flow on shop', async ({page}) =>
{
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");

    const products = page.locator(".card-body");
    
    await page.locator("#userEmail").fill("newhero@rahul.com");
    await page.locator("#userPassword").fill("NewPass@1234");
    await page.locator("[value='Login']").click();

    await page.waitForLoadState('networkidle');
    await page.locator('.card-body b').first().waitFor();

    const tile = await page.locator('.card-body b').allTextContents();
    console.log(tile);

    const productName = 'ZARA COAT 3';
    const count = await products.count();

    for (let i = 0; i < count; ++i) 
    {
      if (await products.nth(i).locator("b").textContent() === productName) 
      {
         await products.nth(i).locator("text= Add To Cart").click();
         break;
      }
   }
    await page.locator("[routerlink*='cart']").click();

    await page.locator("div li").first().waitFor();
    await expect(page.locator("h3:has-text('ZARA COAT 3')")).toBeVisible();

    await page.locator("button[type='button']").nth(1).click();
    await page.locator("[type=text]").nth(1).fill("234");
    await page.locator("[type=text]").nth(2).fill("Rahul Bhai");
    await page.locator("[type=text]").nth(3).fill("rahulshettyacademy");
    await page.locator("[type=submit]").click();

    await page.locator("[placeholder*=Country]").pressSequentially("Ind", { delay: 150 });
    const dropdown = await page.locator(".ta-results");
    await dropdown.waitFor();
    const newc = await dropdown.locator("button").count();
    for (let i=0; i<newc; ++i)
    {
            const newt = await dropdown.locator("button").nth(i).textContent();
            if(newt === " India"){
                dropdown.locator("button").nth(i).click();
                break;
            }
    }
    await expect(page.locator(".user__name [type='text']").first()).toContainText("newhero@rahul.com");
    await page.locator(".btnn").click();
    await expect(page.locator(".hero-primary")).toContainText(" Thankyou for the order. ");
    const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    console.log(orderId);

   await page.locator("button[routerlink*='myorders']").click();
   await page.locator("tbody").waitFor();
   const rows = await page.locator("tbody tr");
 
 
   for (let i = 0; i < await rows.count(); ++i) 
    {
    const rowOrderId = await rows.nth(i).locator("th").textContent();
    if (orderId.includes(rowOrderId)) 
        {
         await rows.nth(i).locator("button").first().click();
         break;
        }
   }
   const orderIdDetails = await page.locator(".col-text").textContent();
   expect(orderId.includes(orderIdDetails)).toBeTruthy();


 
});