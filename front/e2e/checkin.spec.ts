import { expect, test } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Checkin/);
});

test('Invalid Family Name', async ({ page }) => {
  await page.goto('http://localhost:4200/web-checkin');
  await page.getByRole('textbox', { name: 'Family Name' }).fill('Gupta');
  await page.getByRole('textbox', { name: 'Booking Code' }).fill('K34567');
  await page.getByRole('button', { name: 'Check in' }).click();
  await page.waitForURL('**/checkin-status');
  let title = await page.locator('mat-card-content').textContent();
  await expect(title).toEqual('invalid family name')
  await page.getByRole('button', { name: 'Back' }).click();
  title = await page.locator('mat-card-header').textContent();
  await expect(title).toEqual('Web Check in')

});


test('Checkin Closed', async ({ page }) => {
  await page.goto('http://localhost:4200/web-checkin');
  await page.getByRole('textbox', { name: 'Family Name' }).fill('Gupta');
  await page.getByRole('textbox', { name: 'Booking Code' }).fill('K12345');
  await page.getByRole('button', { name: 'Check in' }).click();
  await page.waitForURL('**/checkin-status');
  let title = await page.locator('mat-card-content').textContent();
  await expect(title).toEqual('Sorry online checkin closed for this flight')
  await page.getByRole('button', { name: 'Back' }).click();
  title = await page.locator('mat-card-header').textContent();
  await expect(title).toEqual('Web Check in')

});





test('Checkin Pre', async ({ page }) => {
  await page.goto('http://localhost:4200/web-checkin');
  await page.getByRole('textbox', { name: 'Family Name' }).fill('Singh');
  await page.getByRole('textbox', { name: 'Booking Code' }).fill('K23456');
  await page.getByRole('button', { name: 'Check in' }).click();
  await page.waitForURL('**/checkin-status');
  let title = await page.locator('mat-card-content').textContent();
  await expect(title).toEqual('Checkin not available yet for this fligt')
  await page.getByRole('button', { name: 'Back' }).click();
  title = await page.locator('mat-card-header').textContent();
  await expect(title).toEqual('Web Check in')

});

test('Checkin Success', async ({ page }) => {
  await page.goto('http://localhost:4200/web-checkin');
  await page.getByRole('textbox', { name: 'Family Name' }).fill('Bankar');
  await page.getByRole('textbox', { name: 'Booking Code' }).fill('K34567');
  await page.getByRole('button', { name: 'Check in' }).click();
  await page.waitForURL('**/checkin-status');
  let title = await page.locator('mat-card-content').textContent();
  await expect(title).toEqual('Check In is successful')
  await page.getByRole('button', { name: 'Back' }).click();
  title = await page.locator('mat-card-header').textContent();
  await expect(title).toEqual('Web Check in')

});