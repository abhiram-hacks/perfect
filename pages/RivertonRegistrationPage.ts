import { Page, Locator } from '@playwright/test';

export interface FirmDetails {
  accessOption: string;
  mortgageType: string;
  tradingName: string;
  tradingType: string;
  fcaFirmRef: string;
  postcode: string;
  addressMatchText: string;
}

export interface PersonalDetails {
  title: string;
  firstName: string;
  lastName: string;
  fcaIndividualRef: string;
  preferredPhone: string;
  email: string;
}

export interface BankDetails {
  accountHolderName: string;
  accountNumber: string;
  sortCode: string;
}

export class RivertonRegistrationPage {
  readonly page: Page;

  readonly requestAccessBtn: Locator;
  readonly accessOptionSelect: Locator;
  readonly mortgageTypeSelect: Locator;
  readonly tradingNameInput: Locator;
  readonly tradingTypeSelect: Locator;
  readonly fcaFirmRefInput: Locator;
  readonly postcodeInput: Locator;
  readonly postcodeSearchBtn: Locator;

  readonly networkSelect: Locator;
  readonly networkConfirmYesBtn: Locator;
  readonly transferClubBtn: Locator;

  readonly titleSelect: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly fcaIndividualRefInput: Locator;
  readonly preferredPhoneInput: Locator;
  readonly workEmailInput: Locator;
  readonly confirmWorkEmailInput: Locator;

  readonly accountHolderInput: Locator;
  readonly accountNumberInput: Locator;
  readonly sortCodeInput: Locator;

  readonly declarationConsent1: Locator;
  readonly declarationConsent2: Locator;
  readonly createPasswordInput: Locator;
  readonly confirmPasswordInput: Locator;

  constructor(page: Page) {
    this.page = page;

    this.requestAccessBtn = page.getByText('Request access');
    this.accessOptionSelect = page.getByLabel('Which of these options best');
    this.mortgageTypeSelect = page.getByLabel('What type of mortgage will');
    this.tradingNameInput = page.getByRole('textbox', { name: 'Trading Name *' });
    this.tradingTypeSelect = page.getByLabel('Trading Type');
    this.fcaFirmRefInput = page.getByRole('textbox', { name: 'FCA Firm Reference Number (' });
    this.postcodeInput = page.getByRole('group', { name: 'Firm Details' }).getByLabel('Postcode');
    this.postcodeSearchBtn = page.getByRole('group', { name: 'Firm Details' }).getByRole('button');

    this.networkSelect = page.getByLabel('Choose your Network');
    this.networkConfirmYesBtn = page.getByText('Yes').first();
    this.transferClubBtn = page.getByRole('button', { name: '⇨' });

    this.titleSelect = page.getByLabel('Title', { exact: true });
    this.firstNameInput = page.getByRole('textbox', { name: 'First Name *' });
    this.lastNameInput = page.getByRole('textbox', { name: 'Last Name *' });
    this.fcaIndividualRefInput = page.getByRole('textbox', { name: 'FCA Individual Reference' });
    this.preferredPhoneInput = page.getByRole('textbox', { name: /Preferred Phone Number/i }).first();
    this.workEmailInput = page.getByRole('textbox', { name: 'Work Email Address *', exact: true });
    this.confirmWorkEmailInput = page.getByRole('textbox', { name: 'Confirm Work Email Address *' });

    this.accountHolderInput = page.getByRole('textbox', { name: 'Name(s) of Account Holder(s) *' });
    this.accountNumberInput = page.getByRole('textbox', { name: 'Account Number *' });
    this.sortCodeInput = page.getByRole('textbox', { name: 'Sort Code *' });

    this.declarationConsent1 = page.getByText('Yes').nth(1);
    this.declarationConsent2 = page.getByText('Yes').nth(2);
    this.createPasswordInput = page.getByRole('textbox', { name: 'Create Password *' }).first();
    this.confirmPasswordInput = page.locator('#confirmpassword');
  }

  async navigate(): Promise<void> {
    await this.page.goto('https://www.rivertonhf.co.uk/Portal/PreLogon/Logon');
    await this.requestAccessBtn.click();
  }

  async fillFirmDetails(firm: FirmDetails): Promise<void> {
    await this.accessOptionSelect.selectOption(firm.accessOption);
    await this.mortgageTypeSelect.selectOption(firm.mortgageType);
    await this.tradingNameInput.fill(firm.tradingName);
    await this.tradingTypeSelect.selectOption(firm.tradingType);
    await this.fcaFirmRefInput.fill(firm.fcaFirmRef);

    await this.postcodeInput.fill(firm.postcode);
    await this.postcodeSearchBtn.click();
    await this.page.getByRole('link', { name: firm.addressMatchText }).click();
  }

  async selectNetworkAndClubs(networkValue: string, clubs: string[]): Promise<void> {
    await this.networkSelect.selectOption(networkValue);
    await this.networkConfirmYesBtn.click();

    for (const club of clubs) {
      await this.page.getByText(club, { exact: true }).click();
      await this.transferClubBtn.click();
    }
  }

  async fillPersonalDetails(personal: PersonalDetails): Promise<void> {
    await this.titleSelect.selectOption(personal.title);
    await this.firstNameInput.fill(personal.firstName);
    await this.lastNameInput.fill(personal.lastName);
    await this.fcaIndividualRefInput.fill(personal.fcaIndividualRef);
    await this.preferredPhoneInput.fill(personal.preferredPhone);
    await this.workEmailInput.fill(personal.email);
    await this.confirmWorkEmailInput.fill(personal.email);
  }

  async fillBankDetails(bank: BankDetails): Promise<void> {
    await this.accountHolderInput.fill(bank.accountHolderName);
    await this.accountNumberInput.fill(bank.accountNumber);
    await this.sortCodeInput.fill(bank.sortCode);
    await this.sortCodeInput.press('Enter');
  }

  async acceptDeclarations(): Promise<void> {
    await this.declarationConsent1.click();
    await this.declarationConsent2.click();
  }

  async setPassword(password: string): Promise<void> {
    await this.createPasswordInput.fill(password);
    await this.confirmPasswordInput.fill(password);
  }
}