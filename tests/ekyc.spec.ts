import { test, expect } from '@playwright/test';
import { EkycPage } from '../pages/EkycPage';

test.describe('Alice Blue eKYC Flow', () => {
  test('should complete the initial onboarding registration steps', async ({ page }) => {
    const ekycPage = new EkycPage(page);

    // 1. Navigate to application
    await ekycPage.navigate();

    // 2. Enter Mobile & Verify Mobile OTP
    await ekycPage.submitMobileNumber('8018751740');
    await ekycPage.enterOtp('264021');

    // 3. Select State
    await ekycPage.selectState('odi', 'Odisha');

    // 4. Enter Email & Verify Email OTP
    await ekycPage.submitEmail('abhiramroutraja@gmail.com');
    await ekycPage.verifyEmailOtp('617744');

    // 5. Set Password
    await ekycPage.setPassword('Abhi@3994');

    // 6. Handle Demo & Document
    await ekycPage.handleDemoVideo();
    const pdfPage = await ekycPage.downloadPdfAndGetPopup();
    expect(pdfPage).toBeTruthy();

    // 7. KYC Consent & Resume
    await ekycPage.proceedWithKycConsent();
  });
});