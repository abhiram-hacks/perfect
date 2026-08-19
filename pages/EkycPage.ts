import { Page, Locator } from '@playwright/test';

export class EkycPage {
  readonly page: Page;

  // Locators
  readonly mobileInput: Locator;
  readonly getStartedBtn: Locator;
  readonly stateDropdownTrigger: Locator;
  readonly stateCombobox: Locator;
  readonly verifyBtn: Locator;
  readonly emailInput: Locator;
  readonly sendEmailOtpBtn: Locator;
  readonly verifyEmailBtn: Locator;
  readonly createPasswordInput: Locator;
  readonly confirmPasswordInput: Locator;
  readonly continueBtn: Locator;
  readonly watchDemoBtn: Locator;
  readonly closeDemoBtn: Locator;
  readonly downloadPdfBtn: Locator;
  readonly startOrResumeKycBtn: Locator;
  readonly confirmBtn: Locator;
  readonly consentCheckbox: Locator;

  constructor(page: Page) {
    this.page = page;

    this.mobileInput = page.getByRole('textbox', { name: 'Mobile Number' });
    this.getStartedBtn = page.getByRole('button', { name: 'Get Started' });
    this.stateDropdownTrigger = page.locator('.v-field__input');
    this.stateCombobox = page.getByRole('combobox', { name: 'Enter State' });
    this.verifyBtn = page.getByRole('button', { name: 'Verify' });
    this.emailInput = page.getByRole('textbox', { name: 'Email address' });
    this.sendEmailOtpBtn = page.getByRole('button', { name: 'Send OTP to email' });
    this.verifyEmailBtn = page.getByRole('button', { name: 'Verify Email' });
    this.createPasswordInput = page.getByRole('textbox', { name: 'Create Password' });
    this.confirmPasswordInput = page.getByRole('textbox', { name: 'Confirm Password' });
    this.continueBtn = page.getByRole('button', { name: 'Continue' });
    this.watchDemoBtn = page.getByRole('button', { name: 'Watch Demo Video' });
    this.closeDemoBtn = page.getByRole('button', { name: 'Close Demo Video' });
    this.downloadPdfBtn = page.getByRole('button', { name: 'Download PDF' });
    this.startOrResumeKycBtn = page.getByRole('button', { name: 'Start or Resume KYC' });
    this.confirmBtn = page.getByRole('button', { name: 'Yes, Confirm' });
    this.consentCheckbox = page.getByRole('checkbox', { name: 'Consent for online KYC and' });
  }

  async navigate(): Promise<void> {
    await this.page.goto('https://ekyc.aliceblueonline.com/');
  }

  async enterOtp(otp: string): Promise<void> {
    const digits = otp.split('');
    for (let i = 0; i < digits.length; i++) {
      await this.page
        .getByRole('textbox', { name: `Please enter OTP character ${i + 1}` })
        .fill(digits[i]);
    }
  }

  async submitMobileNumber(mobile: string): Promise<void> {
    await this.mobileInput.fill(mobile);
    await this.getStartedBtn.click();
  }

  async selectState(stateQuery: string, stateFullName: string): Promise<void> {
    await this.stateDropdownTrigger.click();
    await this.stateCombobox.fill(stateQuery);
    await this.page.getByText(stateFullName, { exact: true }).click();
    await this.verifyBtn.click();
  }

  async submitEmail(email: string): Promise<void> {
    await this.emailInput.fill(email);
    await this.sendEmailOtpBtn.click();
  }

  async verifyEmailOtp(otp: string): Promise<void> {
    await this.enterOtp(otp);
    await this.verifyEmailBtn.click();
  }

  async setPassword(password: string): Promise<void> {
    await this.createPasswordInput.fill(password);
    await this.confirmPasswordInput.fill(password);
    await this.continueBtn.click();
  }

  async handleDemoVideo(): Promise<void> {
    await this.watchDemoBtn.click();
    await this.closeDemoBtn.click();
  }

  async downloadPdfAndGetPopup(): Promise<Page> {
    const popupPromise = this.page.waitForEvent('popup');
    await this.downloadPdfBtn.click();
    return await popupPromise;
  }

  async proceedWithKycConsent(): Promise<void> {
    await this.startOrResumeKycBtn.click();
    await this.confirmBtn.click();
    await this.consentCheckbox.check();
    await this.continueBtn.click();
  }
}