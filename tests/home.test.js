/* eslint-disable @typescript-eslint/no-var-requires */
const playwright = require('playwright')

for (const browserType of ['chromium']) {
  describe('user videos are displayed correctly', () => {
    let browser = null
    let page = null

    beforeAll(async () => {
      //To see the browser UI pass { headless: false, slowMo: 50 } to launch()
      browser = await playwright[browserType].launch()
      const context = await browser.newContext()
      page = await context.newPage()
      await page.goto('http://localhost:3000')
    })

    afterAll(async () => {
      await browser.close()
    })

    test('users with one video are display correctly', async () => {
      const numberElementsWithOneVideo = await page.$$eval(
        '"--Has video--"',
        (items) => items.length
      )
      expect(numberElementsWithOneVideo).toBe(1)
    })

    test('users with more than one video are display correctly', async () => {
      const numberElementsWithMoreThanOneVideo = await page.$$eval(
        '"--Has many videos--"',
        (items) => items.length
      )
      expect(numberElementsWithMoreThanOneVideo).toBe(1)
    })
  })
}
