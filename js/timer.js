/* global */
/* eslint-disable no-unused-vars, no-global-assign */
function showTimer (id, lastStageStatus) {
  if (lastStageStatus === 'CompletedStStatus') {
    var timeSpent = window.localStorage.getItem('timer' + id)
    if (timeSpent !== null) {
      return timeSpent.fontcolor('#2deb55')
    } else {
      return saveTimer(id)
    }
  } else { return showTime(id) }
}

function showTime (id) {
  const createdDate = createDateFromStr(id)
  return calculateTime(createdDate)
}

function createDateFromStr (id) {
  const strDate = getCreatedDate(id)
  const arrDate = strDate.split(/[\n/:]/).map(Number)
  const date = new Date(arrDate[2], arrDate[1], arrDate[0], arrDate[3], arrDate[4], arrDate[5])
  return date
}

function getCreatedDate (id) {
  const date = window.localStorage.getItem(id)
  if (date !== null) {
  } return date
}

function calculateTime (date) {
  const newDate = new Date()
  const calculatedTime = newDate - date
  var hours = Math.floor(calculatedTime / 3600000)
  var minutes = Math.floor((calculatedTime - (hours * 3600000)) / 60000)
  var seconds = parseInt((calculatedTime - (hours * 3600000) - (minutes * 60000)) / 1000)
  return ((hours <= 0 ? '' : hours + ':') + '' + (minutes < 10 ? '0' + minutes : minutes) + ':' + (seconds < 10 ? '0' + seconds : seconds))
}

function saveTimer (id) {
  const date = createDateFromStr(id)
  console.log(date)
  const timeSpent = calculateTime(date)
  console.log(timeSpent)
  window.localStorage.setItem('timer' + id, timeSpent)
  return timeSpent
}
