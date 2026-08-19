import { test } from '@playwright/test';
import { RivertonRegistrationPage } from '../pages/RivertonRegistrationPage';

test.describe('Riverton Access Registration', () => {
  test('should submit access request with valid details', async ({ page }) => {
    const registrationPage = new RivertonRegistrationPage(page);

    await registrationPage.navigate();

    await registrationPage.fillFirmDetails({
      accessOption: '1',
      mortgageType: '2',
      tradingName: 'Test A',
      tradingType: '3',
      fcaFirmRef: '4545656',
      postcode: '56',
      addressMatchText: 'Flat 56 130 Webber Street',
    });

    await registrationPage.selectNetworkAndClubs('589', [
      'Advise Wise Mortgage Club',
      'Air Platinum Advance',
      'Air Elite',
    ]);

    await registrationPage.fillPersonalDetails({
      title: 'Mr',
      firstName: 'Test',
      lastName: 'New Member',
      fcaIndividualRef: '86576578',
      preferredPhone: '07989877666',
      email: 'testnew@fin.tech',
    });

    await registrationPage.fillBankDetails({
      accountHolderName: 'Test',
      accountNumber: '70872490',
      sortCode: '404784',
    });

    await registrationPage.acceptDeclarations();
    await registrationPage.setPassword('Password1!!!!');
  });
});