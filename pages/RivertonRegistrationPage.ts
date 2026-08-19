import { Page, Locator } from '@playwright/test';

export class RivertonRegistrationPage {
  readonly page: Page;

  // Navigation
  readonly requestAccessLink: Locator;

  // Initial Options & Firm Details
  readonly accessOptionDropdown: Locator;
  readonly mortgageTypeDropdown: Locator;
  readonly tradingNameInput: Locator;
  readonly tradingTypeDropdown: Locator;
  readonly companyNameInput: Locator;
  readonly companyRegNumberInput: Locator;
  readonly fcaFirmRefNumberInput: Locator;
  readonly postcodeLookupInput: Locator;

  // Network & Mortgage Club Selection
  readonly networkDropdown: Locator;
  readonly clubTransferBtn: Locator;

  // Personal & Contact Details
  readonly titleDropdown: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly fcaIndividualRefInput: Locator;
  readonly preferredPhoneInput: Locator;
  readonly additionalPhoneInput: Locator;
  readonly workEmailInput: Locator;
  readonly confirmWorkEmailInput: Locator;

  // Bank Details
  readonly accountHolderNameInput: Locator;
  readonly accountNumberInput: Locator;
  readonly sortCodeInput: Locator;

  // Password Details
  readonly createPasswordInput: Locator;
  readonly confirmPasswordInput: Locator;

  constructor(page: Page) {
    this.page = page;

    // Navigation
    this.requestAccessLink = page.getByText('Request access');

    // Firm Details
    this.accessOptionDropdown = page.getByLabel('Which of these options best');
    this.mortgageTypeDropdown = page.getByLabel('What type of mortgage will');
    this.tradingNameInput = page.getByRole('textbox', { name: 'Trading Name *' });
    this.tradingTypeDropdown = page.getByLabel('Trading Type');
    this.companyNameInput = page.getByRole('textbox', { name: 'Full Company Name *' });
    this.companyRegNumberInput = page.getByRole('textbox', { name: 'Company Registration Number *' });
    this.fcaFirmRefNumberInput = page.getByRole('textbox', { name: 'FCA Firm Reference Number (' });
    this.postcodeLookupInput = page.getByRole('group', { name: 'Firm Details' }).getByLabel('Postcode');

    // Network & Mortgage Club
    this.networkDropdown = page.getByLabel('Choose your Network');
    this.clubTransferBtn = page.getByRole('button', { name: '⇨' });

    // Personal & Contact Details
    this.titleDropdown = page.getByLabel('Title', { exact: true });
    this.firstNameInput = page.getByRole('textbox', { name: 'First Name *' });
    this.lastNameInput = page.getByRole('textbox', { name: 'Last Name *' });
    this.fcaIndividualRefInput = page.getByRole('textbox', { name: 'FCA Individual Reference' });
    this.preferredPhoneInput = page.locator('input[id*="PreferredPhone"], input[name*="PreferredPhone"]').or(
      page.getByRole('textbox', { name: /Preferred Phone Number/i })
    );
    this.additionalPhoneInput = page.getByRole('textbox', { name: 'Additional Phone Number' });
    this.workEmailInput = page.getByRole('textbox', { name: 'Work Email Address *', exact: true });
    this.confirmWorkEmailInput = page.getByRole('textbox', { name: 'Confirm Work Email Address *' });

    // Bank Details
    this.accountHolderNameInput = page.getByRole('textbox', { name: 'Name(s) of Account Holder(s) *' });
    this.accountNumberInput = page.getByRole('textbox', { name: 'Account Number *' });
    this.sortCodeInput = page.getByRole('textbox', { name: 'Sort Code *' });

    // Passwords
    this.createPasswordInput = page.locator('input[type="password"]').first();
    this.confirmPasswordInput = page.locator('#confirmpassword').or(page.locator('input[type="password"]').nth(1));
  }

  // --- Actions ---

  async navigate(): Promise<void> {
    await this.page.goto('https://www.rivertonhf.co.uk/Portal/PreLogon/Logon');
    await this.requestAccessLink.click();
  }

  async fillFirmDetails(details: {
    accessOption: string;
    mortgageType: string;
    tradingName: string;
    tradingType: string;
    companyName: string;
    fcaFirmRef: string;
    companyRegNumber: string;
    postcode: string;
    addressMatchText: string;
  }): Promise<void> {
    await this.accessOptionDropdown.selectOption(details.accessOption);
    await this.mortgageTypeDropdown.selectOption(details.mortgageType);
    await this.tradingNameInput.fill(details.tradingName);
    await this.tradingTypeDropdown.selectOption(details.tradingType);
    await this.companyNameInput.fill(details.companyName);
    await this.fcaFirmRefNumberInput.fill(details.fcaFirmRef);
    await this.companyRegNumberInput.fill(details.companyRegNumber);

    // Address lookup
    await this.postcodeLookupInput.fill(details.postcode);
    await this.postcodeLookupInput.press('Enter');
    await this.page.getByRole('link', { name: details.addressMatchText }).click();
  }

  async selectNetworkAndClubs(networkValue: string, clubs: string[]): Promise<void> {
    await this.networkDropdown.selectOption(networkValue);
    await this.page.getByText('Yes').first().click();

    for (const club of clubs) {
      await this.page.getByText(club, { exact: true }).click();
      await this.clubTransferBtn.click();
    }
  }

  async fillPersonalDetails(details: {
    title: string;
    firstName: string;
    lastName: string;
    fcaIndRef: string;
    preferredPhone: string;
    additionalPhone?: string;
    email: string;
  }): Promise<void> {
    await this.titleDropdown.selectOption(details.title);
    await this.firstNameInput.fill(details.firstName);
    await this.lastNameInput.fill(details.lastName);
    await this.fcaIndividualRefInput.fill(details.fcaIndRef);
    await this.preferredPhoneInput.fill(details.preferredPhone);

    if (details.additionalPhone) {
      await this.additionalPhoneInput.fill(details.additionalPhone);
    }

    await this.workEmailInput.fill(details.email);
    await this.confirmWorkEmailInput.fill(details.email);
  }

  async fillBankDetails(details: {
    accountHolder: string;
    accountNumber: string;
    sortCode: string;
  }): Promise<void> {
    await this.accountHolderNameInput.fill(details.accountHolder);
    await this.accountNumberInput.fill(details.accountNumber);
    await this.sortCodeInput.fill(details.sortCode);
    await this.sortCodeInput.press('Enter');
  }

  async confirmDeclarations(): Promise<void> {
    await this.page.getByText('Yes').nth(1).click();
    await this.page.getByText('Yes').nth(2).click();
  }

  async setPassword(password: string): Promise<void> {
    await this.createPasswordInput.fill(password);
    await this.confirmPasswordInput.fill(password);
  }
}