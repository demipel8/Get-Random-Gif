const API_KEY = '<API_SECRET>'
const TAG = 'ok'
const URL = `https://random-gif.herokuapp.com/?tag=${TAG}`

document.addEventListener('DOMContentLoaded', randomGif)

function randomGif() {
  renderStatus('Performing search in giphy for ' + TAG)

  fetch(URL)
    .then(parseJSON)
    .then(extractGif)
    .then(displayGif)
    .then(copyToClipboard)
    .catch(displayError)
}

function parseJSON(response) {
  return response.json()
}

function displayGif(gif) {
  let gifContainer = document.getElementById('image-result')

  gifContainer.width = gif.width
  gifContainer.height = gif.height
  gifContainer.src = gif.url
  gifContainer.hidden = false
  renderStatus('')

  return gif
}

function extractGif(response) {
  if (!response || !response.data || !response.data.image_url) return error('No response from Giphy!')

  let data = response.data
  let url = data.image_url
  let width = parseInt(data.image_width)
  let height = parseInt(data.image_height)

  return { url, width, height }
}

function fetchGif(tag, callback, error) {
  let url = `https://api.giphy.com/v1/gifs/random?api_key=${API_KEY}&rating=R&tag=${tag}`
  let request = new XMLHttpRequest()

  request.open('GET', url)
  request.responseType = 'json'

  request.onload = () => {
    let response = request.response

    if (!response || !response.data || !response.data.image_url) return error('No response from Giphy!')

    let data = response.data
    let imageUrl = data.image_url
    let width = parseInt(data.image_width)
    let height = parseInt(data.image_height)

    console.assert(
        typeof imageUrl == 'string' && !isNaN(width) && !isNaN(height),
        'Unexpected respose from the Giphy API!')

    return { url, width, height }
  }

  request.onerror = () => error('Network error.')

  request.send()
}

function copyToClipboard(gif) {
  let disposable = document.createElement('input')
  disposable.setAttribute('id', 'disposable_id')

  document.body.appendChild(disposable);
  document.getElementById('disposable_id').value = gif.url

  disposable.select();

  document.execCommand('copy');

  document.body.removeChild(disposable);
}

function renderStatus(text) {
  document.getElementById('status').textContent = text
}

function displayError(message) {
  renderStatus(`Cannot display image. ${message}`)
}
