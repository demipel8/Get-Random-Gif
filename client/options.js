const TAG = 'tag'
const defaultTag = 'ok'
const getElement = document.getElementById.bind(document)

document.addEventListener('DOMContentLoaded', restore_options);
getElement('save').addEventListener('click', save_options);

function save_options() {
  let tag = getElement(TAG).value

  chrome.storage.sync.set({ tag }, function() {
    let status = getElement('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

function restore_options() {
  chrome.storage.sync.get(TAG, items => {
    getElement(TAG).value = items.tag || defaultTag;
  });
}
