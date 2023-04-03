export default function polsinelli (req, res) {
  console.log(performance.now() + 'ms' + ' - ' + 'polsinelli')
  const { url, tag } = req.body
  console.log(performance.now() + 'ms' + ' - ' + 'url: ' + url)
  console.log(performance.now() + 'ms' + ' - ' + 'tag: ' + tag)
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] })
  const page = await browser.newPage()
  await page.goto(url)
  const data = await page.evaluate((tag) => {
    console.log(performance.now() + 'ms' + ' - ' + 'data')
    console.log(performance.now() + 'ms' + ' - ' + 'tag: ' + tag)
    const price = document.querySelector(tag.price).innerText
    console.log(performance.now() + 'ms' + ' - ' + 'price: ' + price)
    const status = document.querySelector(tag.status).innerText
    console.log(performance.now() + 'ms' + ' - ' + 'status: ' + status)
    return { price, status }
  }, tag)
  await browser.close()
  console.log(performance.now() + 'ms' + ' - ' + 'data: ' + data)
  res.json(data)
}
