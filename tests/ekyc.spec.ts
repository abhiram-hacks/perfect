import { test, expect } from '@playwright/test';
import { EkycPage } from '../pages/EkycPage';

test.describe('Alice Blue eKYC Registration', () => {
  test('should complete the initial onboarding registration steps', async ({ page }) => {
    const ekycPage = new EkycPage(page);

    await ekycPage.navigate();
    await ekycPage.submitMobileNumber('8018751740');
    await ekycPage.enterOtp('264021');
    await ekycPage.selectState('odi', 'Odisha');
    await ekycPage.submitEmail('abhiramroutraja@gmail.com');
    await ekycPage.verifyEmailOtp('617744');
    await ekycPage.setPassword('Abhi@3994');
    await ekycPage.handleDemoVideo();

    const pdfPage = await ekycPage.downloadPdfAndGetPopup();
    expect(pdfPage).toBeTruthy();

    await ekycPage.proceedWithKycConsent();
  });
});