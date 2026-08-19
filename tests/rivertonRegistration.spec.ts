import { test } from '@playwright/test';
import { RivertonRegistrationPage } from '../pages/RivertonRegistrationPage';

test.describe('Riverton Access Registration', () => {
  test('should submit access request with valid details', async ({ page }) => {
    // Make sure the class name here matches the import above
    const accessPage = new RivertonRegistrationPage(page);

    // 1. Open Portal & Request Access
    await accessPage.navigate();

    // 2. Fill Firm Information & Lookup Address
    await accessPage.fillFirmDetails({
      accessOption: '1',
      mortgageType: '2',
      tradingName: 'Test A',
      tradingType: '3',
      fcaFirmRef: '4545656',
      postcode: '56',
      addressMatchText: 'Flat 56 130 Webber Street',
    });

    // 3. Select Network & Multiple Mortgage Clubs
    await accessPage.selectNetworkAndClubs('589', [
      'Advise Wise Mortgage Club',
      'Air Platinum Advance',
      'Air Elite',
    ]);

    // 4. Fill Personal & Contact Information
    await accessPage.fillPersonalDetails({
      title: 'Mr',
      firstName: 'Test',
      lastName: 'New Member',
      fcaIndividualRef: '86576578',
      preferredPhone: '07989877666',
      email: 'testnew@fin.tech',
    });

    // 5. Fill Bank Details
    await accessPage.fillBankDetails({
      accountHolderName: 'Test',
      accountNumber: '70872490',
      sortCode: '404784',
    });

    // 6. Accept Terms & Set Password
    await accessPage.acceptDeclarations();
    await accessPage.setPassword('Password1!!!!');
  });
});