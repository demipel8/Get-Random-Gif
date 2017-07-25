document.addEventListener('DOMContentLoaded', randomGif)

function randomGif() {
  getTag()
    .then(formatURL)
    .then(fetchURL)
    .then(parseJSON)
    .then(extractGif)
    .then(displayGif)
    .then(copyToClipboard)
    .catch(displayError)
}

function getTag() {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get('tag', items => resolve(items.tag))
  })
}

function formatURL(tag) {
  renderStatus(`Performing search in giphy for ${tag}`)
  return `https://random-gif.herokuapp.com/?tag=${tag}`
}

function fetchURL(url) {
  return fetch(url)
}

function parseJSON(response) {
  return response.json()
}

function extractGif(data) {
  if (!data || !data.image_url) return error('No response from Giphy!')

  let url = data.image_url
  let width = parseInt(data.image_width)
  let height = parseInt(data.image_height)

  return { url, width, height }
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

function copyToClipboard(gif) {
  let disposable = document.createElement('input')
  disposable.setAttribute('id', 'disposable_id')

  document.body.appendChild(disposable);
  document.getElementById('disposable_id').value = `![](${gif.url})`

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
