/* global */
/* eslint-disable no-unused-vars, no-global-assign */
function setCreatedDate () {
  var date = new Date()
  return date.getDate() + '/' + (date.getMonth() < 10 ? '0' + date.getMonth() : date.getMonth()) + '/' + date.getFullYear() + '\n' + date.getHours() + ':' + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':' + (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds())
}

function saveCreatedDate (id, date) {
  window.localStorage.setItem(id, date)
}
function showCreatedDate (id) {
  var date = window.localStorage.getItem(id)
  if (date !== null) {
  } else {
    date = setCreatedDate()
    saveCreatedDate(id, date)
  }
  return date
}

//window.localStorage.clear()