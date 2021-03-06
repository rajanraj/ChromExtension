'use strict';

function saveOptions() {
  const isCookiesChecked = document.getElementById('cookies').checked;
  const isLocalStorageChecked = document.getElementById('localStorage').checked;
  const isCacheChecked = document.getElementById('cache').checked;
  const isSessionStorageChecked = document.getElementById('sessionStorage').checked;
  const isIndexedDBChecked = document.getElementById('indexedDB').checked;
  const status = document.getElementById('status');

  try {
    chrome.storage.sync.set({
      cookiesSetting: isCookiesChecked,
      localStorageSetting: isLocalStorageChecked,
      cacheSetting: isCacheChecked,
      sessionStorageSetting: isSessionStorageChecked,
      indexedDBSetting: isIndexedDBChecked
    }, function() {
      status.textContent = `Your settings have been saved`;
      setTimeout(function() {
        status.textContent = '';
      }, 1000);
    });
  } catch (err) {
    status.textContent = `An unexpected error occurred: ${err}`;
  }
}

function restoreOptions() {
  try {
    chrome.storage.sync.get({
      'cookiesSetting': false,
      'localStorageSetting': false,
      'cacheSetting': false,
      'sessionStorageSetting': false,
      'indexedDBSetting': true
    }, function(items) {
      document.getElementById('cookies').checked = items['cookiesSetting'];
      document.getElementById('localStorage').checked = items['localStorageSetting'];
      document.getElementById('cache').checked = items['cacheSetting'];
      document.getElementById('sessionStorage').checked = items['sessionStorageSetting'];
      document.getElementById('indexedDB').checked = items['indexedDBSetting'];
    });
  } catch (err) {
   // console.log(`Unexpected error when accessing storage from options page: ${err}`);
  }
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save').addEventListener('click', saveOptions);