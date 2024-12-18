exports.handler = (event, context, callback) => {
  const HTTPS = require('https')

  const TAG = event.queryStringParameters.tag || 'ok'
  const API_KEY = process.env.GIPHY_API_KEY
  const URL = `https://api.giphy.com/v1/gifs/random?api_key=${API_KEY}&rating=R&tag=${TAG}`

  fetch(URL)
    .then(response => {
      const gif = JSON.parse(response)

      callback(null, {
        "statusCode": 200,
        "body": JSON.stringify(gif.data)
      })
    })


  function fetch(url) {
      return new Promise((resolve, reject) => {
        const request = HTTPS.get(url, response => {
          const status = response.statusCode
          const body = []

          if (status < 200 || status > 299) reject(new Error('Failed to load page, status code: ' + status))

          response.on('data', chunk => body.push(chunk))
          response.on('end', () => resolve(body.join('')))
        });

      request.on('error', reject)
    })
  }
}