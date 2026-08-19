import { test } from '@playwright/test';
import { RivertonRegistrationPage } from '../pages/RivertonRegistrationPage';

test.describe('Riverton Registration Flow', () => {
  test('should complete the registration access request form', async ({ page }) => {
    const registrationPage = new RivertonRegistrationPage(page);

    // 1. Navigate & Start
    await registrationPage.navigate();

    // 2. Firm Information & Postcode Lookup
    await registrationPage.fillFirmDetails({
      accessOption: '1',
      mortgageType: '2',
      tradingName: 'Test',
      tradingType: '1',
      companyName: 'New Comp Registar',
      fcaFirmRef: '4356765',
      companyRegNumber: '6767765',
      postcode: '45',
      addressMatchText: 'Flat 45 140 Southwark Bridge',
    });

    // 3. Network & Mortgage Clubs Selection
    await registrationPage.selectNetworkAndClubs('589', [
      'Advise Wise Mortgage Club',
      'Air Platinum',
    ]);

    // 4. Personal & Contact Information
    await registrationPage.fillPersonalDetails({
      title: 'Mr',
      firstName: 'Test',
      lastName: 'Abhir',
      fcaIndRef: '06756546',
      preferredPhone: '07897686576',
      additionalPhone: '07897865756',
      email: 'testerabhi@fin.tech',
    });

    // 5. Bank Account Information
    await registrationPage.fillBankDetails({
      accountHolder: 'test',
      accountNumber: '70872490',
      sortCode: '404784',
    });

    // 6. Declarations & Password Setup
    await registrationPage.confirmDeclarations();
    await registrationPage.setPassword('Abhi@12345678');
  });
});