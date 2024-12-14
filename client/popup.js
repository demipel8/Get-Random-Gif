document.addEventListener('DOMContentLoaded', randomGif)

const defaultTag = 'ok'

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
    chrome.storage.sync.get('tag', ({ tag }) => resolve(tag || defaultTag))
  })
}

function formatURL(tag) {
  renderStatus(`Performing search in giphy for ${tag}`)
  return `https://tbdsa3t4af.execute-api.us-east-2.amazonaws.com/v1/ramon?tag=${tag}`
}

function fetchURL(url) {
  return fetch(url)
}

function parseJSON(response) {
  return response.json()
}

function extractGif(data) {
  if (!data || !data.id) return error('No response from Giphy!')

  let url = `https://i.giphy.com/${data.id}.webp`
  let width = parseInt(data.images.original.width)
  let height = parseInt(data.images.original.height)

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
