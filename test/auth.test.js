/* eslint no-undef: "off" */
const Browser = require('zombie')
Browser.localhost('localhost', 8080)

describe('Log into application', () => {
  const browser = new Browser()
  it('refuses login for empty user', async () => {
    await browser.visit('/login')
    await browser.pressButton('#btnLogin')
    browser.assert.text('#validation-errors', 'Invalid login attempt. Please try again.')
    browser.assert.url('/login')
  })
  it('refuses login for invalid username', async () => {
    await browser.visit('/login')
    await browser.fill('.form-username', 'bad')
    await browser.fill('.form-password', 'Test1234')
    await browser.pressButton('#btnLogin')
    browser.assert.text('#validation-errors', 'Invalid login attempt. Please try again.')
    browser.assert.url('/login')
  })
  it('refuses login for invalid password', async () => {
    await browser.visit('/login')
    await browser.fill('.form-username', 'testUser')
    await browser.fill('.form-password', 'bad')
    await browser.pressButton('#btnLogin')
    browser.assert.text('#validation-errors', 'The password is incorrect for username testUser')
    browser.assert.url('/login')
  })
  it('allows login for authorized user', async () => {
    await browser.visit('/login')
    await browser.fill('.form-username', 'testUser')
    await browser.fill('.form-password', 'Test1234')
    await browser.pressButton('#btnLogin')
    browser.assert.text('title', 'Benefits Dashboard')
    browser.assert.element('#btnAddEmployee')
  })
})
