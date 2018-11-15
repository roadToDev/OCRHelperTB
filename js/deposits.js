/* global $ */
/* eslint-disable no-unused-vars, no-global-assign */
var jsonFile = ''
var opportunityId = ''
var opportunityStage = ''
var oppoProcess = ''
function checkDeposits (oppoId, stage, process) {
  opportunityStage = stage
  opportunityId = oppoId
  oppoProcess = process
  fetchData(oppoId)
  $('#depositsAdvancesModal').modal()
  stage = stage.replace(/([a-z](?=[A-Z]))/g, '$1 ')
  $('#depositsModalLabel').html(stage)
}

function fetchData (oppoId) {
  window.fetch('deposits.json')
  //  window.fetch('/truerev/' + oppoId)
    .then(function (response) {
      if (response.status !== 200) {
        window.alert('not 200' + 'status is: ' + response.status + ' ' + response.statusText)
      }
      return response.json()
    })
    .then(function (myJson) {
      jsonFile = myJson
      showBlock(myJson)
    })
}

function showBlock (json) {
  console.log(json)
  var html = '<table class="table table-hover table-striped" ><tbody><th>Date</th><th>Description</th><th>Amount</th><th>Tags</th><th>Check</th>'

  json.forEach(function (deposit) {
    html += '<tr><td>' + deposit.date + '</td><td>' + deposit.descr + '</td><td>' + deposit.amount + '</td><td>' + deposit.tags + '</td><td class="text-center text-nowrap">' + addCheckBox(deposit.isDeducted) + '</td>'
  })

  html += '</tbody></table>'
  $('#depositsTable').html(html)
}

function addCheckBox (isDeducted) {
  if (isDeducted) {
    return '<input type="checkbox" checked id="check-box">'
  } else {
    return '<input type="checkbox" id="check-box">'
  }
}

function checkTrueRev () {

}
