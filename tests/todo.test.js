/* eslint-disable @typescript-eslint/no-var-requires */
const playwright = require('playwright')

for (const browserType of ['chromium']) {
  //add this to launch() to open browser when doing the tests { headless: false, slowMo: 100 }
  describe('todos videos are displayed correctly', () => {
    test('video section is not visible until scrolling', async () => {
      let browser = await playwright[browserType].launch()
      const context = await browser.newContext()
      let page = await context.newPage()
      await page.goto('http://localhost:3000/todos/1')

      const numberElementsWithOneVideo = await page.$$eval(
        '"--Has video--"',
        (items) => items.length
      )
      expect(numberElementsWithOneVideo).toBe(0)

      await browser.close()
    })

    test('todo with one video are display correctly', async () => {
      let browser = await playwright[browserType].launch()
      const context = await browser.newContext()
      let page = await context.newPage()
      await page.goto('http://localhost:3000/todos/1')

      const videoSection = await page.$('text="Video"')
      videoSection.scrollIntoViewIfNeeded()

      await page.waitForSelector('text="--Has video--"')

      const numberElementsWithOneVideo = await page.$$eval(
        'text="--Has video--"',
        (items) => items.length
      )
      expect(numberElementsWithOneVideo).toBe(1)
    })

    test('todo with more than one video are display correctly', async () => {
      let browser = await playwright[browserType].launch()
      const context = await browser.newContext()
      let page = await context.newPage()
      await page.goto('http://localhost:3000/todos/2')

      const videoSection = await page.$('text="Video"')
      videoSection.scrollIntoViewIfNeeded()

      await page.waitForSelector('text="--Has many videos--"')
      const numberElementsWithMoreThanOneVideo = await page.$$eval(
        '"--Has many videos--"',
        (items) => items.length
      )
      expect(numberElementsWithMoreThanOneVideo).toBe(1)
    })

    test('todo WITHOUT videos does not have a video section', async () => {
      let browser = await playwright[browserType].launch()
      const context = await browser.newContext()
      let page = await context.newPage()
      await page.goto('http://localhost:3000/todos/3')

      const videoSection = await page.$('text="Video"')
      videoSection.scrollIntoViewIfNeeded()

      await page.waitForTimeout(3000)

      const numberElementsWithOneVideo = await page.$$eval(
        '"--Has video--"',
        (items) => items.length
      )
      expect(numberElementsWithOneVideo).toBe(0)

      await browser.close()
    })
  })
}
