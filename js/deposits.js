/* global $ */
/* eslint-disable no-unused-vars, no-global-assign */
var jsonFile = ''
var opportunityId = ''
var opportunityStage = ''
var oppoProcess = ''
var revName = ''
function checkDeposits (oppoId, stage, process) {
  opportunityStage = stage
  opportunityId = oppoId
  oppoProcess = process
  fetchTrueRevData(oppoId)
  $('#depositsAdvancesModal').modal()
  stage = stage.replace(/([a-z](?=[A-Z]))/g, '$1 ')
  $('#depositsModalLabel').html(stage)
}

function fetchTrueRevData (oppoId) {
  window.fetch('deposits.json')
  //  window.fetch('/truerev/' + oppoId)
    .then(function (response) {
      if (response.status !== 200) {
        window.alert('not 200' + 'status is: ' + response.status + ' ' + response.statusText)
      }
      return response.json()
    })
    .then(function (myJson) {
      fetchDropDown()
      jsonFile = myJson
      showTrueRevBlock(myJson)
    })
}

function showTrueRevBlock (json) {
  console.log(json)
  var html = '<table class="table table-hover table-striped" ><tbody><th>Date</th><th>Description</th><th>Amount</th><th>Tags</th><th>Check</th>'

  json.forEach(function (deposit) {
    html += '<tr><td>' + deposit.date + '</td><td onclick="addTrueRevLabel()">' + deposit.descr + '</td><td>' + deposit.amount + '</td><td>' + deposit.tags + '</td><td class="text-center text-nowrap">' + addCheckBox(deposit.descr + deposit.id, deposit.isDeducted) + '</td>'
  })

  html += '</tbody></table>'
  $('#depositsTable').html(html)
}

function addNewTrueRevenue () {
  console.log(revName)
  console.log($('#trueRevLabel').val())
}

function checkRev (check, id) {

}

function addCheckBox (id, isDeducted) {
  if (isDeducted) {
    return '<div class="custom-control custom-checkbox"><input type="checkbox" onclick="checkRev(this, \'' + id + '\')" class="custom-control-input" checked id = "' + id + '"><label class="custom-control-label" for="' + id + '" id="fileLabel"></label></div>'
  } else {
    return '<div class="custom-control custom-checkbox"><input type="checkbox" onclick="checkRev(this, \'' + id + '\')" class="custom-control-input" id = "' + id + '"><label class="custom-control-label" for="' + id + '" id="fileLabel"></label></div>'
  }
}

function fetchDropDown () {
  var html = '<a class="dropdown-item" href="#" onclick="addTrueRevName(this)">McaDepoWithdNames</a>' + '<a class="dropdown-item" href="#" onclick="addTrueRevName(this)">GenericDepositsKeywords</a>' + '<a class="dropdown-item" href="#" onclick="addTrueRevName(this)">OnlineKeywords</a>' +
    '<a class="dropdown-item" href="#" onclick="addTrueRevName(this)">WireKeywords</a>' +
    '<a class="dropdown-item" href="#" onclick="addTrueRevName(this)">OtherDeductableKeywords</a>' +
    '<a class="dropdown-item" href="#" onclick="addTrueRevName(this)">GenericWithdKeywords</a>' +
    '<a class="dropdown-item" href="#" onclick="addTrueRevName(this)">NsfKeywords</a>' +
    '<a class="dropdown-item" href="#" onclick="addTrueRevName(this)">McaKeywords</a>' +
    '<a class="dropdown-item" href="#" onclick="addTrueRevName(this)">ReturnKeywords</a>' +
    '<a class="dropdown-item" href="#" onclick="addTrueRevName(this)">OverdraftKeywords</a>' +
    '<a class="dropdown-item" href="#" onclick="addTrueRevName(this)">McaWithdNames</a>'
  $('#dropdown-truerev').html(html)
}

function addTrueRevName (item) {
  revName = item.text
  $('#dropdown-keywords').text(revName)
}

function addTrueRevLabel () {
  var textTrueRev = window.getSelection().toString()
  $('#trueRevLabel').val(textTrueRev)
}
