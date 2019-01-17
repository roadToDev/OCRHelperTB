/* global */
/* eslint-disable no-unused-vars, no-global-assign */
function showTimer (id, lastStageStatus, lastStageName, date, decline) {
  if (decline || (lastStageStatus === 'CompletedStStatus' && lastStageName === 'DocumentDecline')) {
    var timeSpent = window.localStorage.getItem('timer' + id)
    if (timeSpent !== null) {
      return timeSpent.fontcolor('#2deb55')
    } else {
      return saveTimer(id, date)
    }
  } else { return showTime(id, date) }
}

function showTime (id, date) {
  const createdDate = createDateFromStr(id, date)
  return calculateTime(createdDate)
}

function createDateFromStr (id, date) {
  const strDate = getCreatedDate(id, date)
  const arrDate = strDate.split(/[\n/:]/).map(Number)
  const newDate = new Date(arrDate[2], arrDate[1] - 1, arrDate[0], arrDate[3], arrDate[4], arrDate[5])
  return newDate
}

function getCreatedDate (id, date) {
  const newDate = showCreatedDate(date)
  return newDate
}

function calculateTime (date) {
  const newDate = new Date()
  const calculatedTime = newDate - date
  var hours = Math.floor(calculatedTime / 3600000)
  var minutes = Math.floor((calculatedTime - (hours * 3600000)) / 60000)
  var seconds = parseInt((calculatedTime - (hours * 3600000) - (minutes * 60000)) / 1000)
  return ((hours <= 0 ? '' : hours + ':') + '' + (minutes < 10 ? '0' + minutes : minutes) + ':' + (seconds < 10 ? '0' + seconds : seconds))
}

function saveTimer (id, date) {
  const savedDate = createDateFromStr(id, date)
  const timeSpent = calculateTime(savedDate)
  window.localStorage.setItem('timer' + id, timeSpent)
  return timeSpent
}

function setCreatedDate (date) {
  return date.getDate() + '/' + (date.getMonth() < 10 ? '0' + date.getMonth() + 1 : date.getMonth() + 1) + '/' + date.getFullYear() + '\n' + date.getHours() + ':' + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':' + (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds())
}

function showCreatedDate (oppoDate) {
  var dateArray = oppoDate.split(' ')
  var strDate = dateArray[0] + ', ' + dateArray[2] + ' ' + dateArray[1] + ' ' + dateArray[5] + ' ' + dateArray[3]
  var realDate = Date.parse(strDate)
  var newDate = new Date(realDate)

  return setCreatedDate(newDate)
}


