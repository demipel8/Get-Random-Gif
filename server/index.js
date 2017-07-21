const Koa = require('koa')
const getContent = require('./getContent')

const app = new Koa()
const port = process.env.PORT
const TAG = 'ok'
const API_KEY = process.env.GIPHY_API_KEY

app.use(async (ctx) => {
  let tag = ctx.request.query.tag || TAG
  let url = `https://api.giphy.com/v1/gifs/random?api_key=${API_KEY}&rating=R&tag=${tag}`
  let response = await getContent(url)
  let gif = JSON.parse(response)

  ctx.body = gif.data
  console.log(gif.data.image_original_url)
});

app.listen(port);