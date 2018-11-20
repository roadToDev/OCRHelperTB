/* global $ _ */
/* eslint-disable no-unused-vars, no-global-assign */
var jsonFile = ''
var opportunityId = ''
var blockNumber = 0
var opportunityStage = ''
var oppoProcess = ''
var curAdvData = []
function checkCurrentAdvances (oppoId, stage, process) {
  opportunityStage = stage
  opportunityId = oppoId
  oppoProcess = process
  fetchAdvData(oppoId)
  $('#currentAdvancesModal').modal()
  stage = stage.replace(/([a-z](?=[A-Z]))/g, '$1 ')
  $('#currentAdvancesModalLabel').html(stage)
}

function fetchAdvData (oppoId) {
  window.fetch('adv.json')
  // window.fetch('/adver/' + oppoId)
    .then(function (response) {
      if (response.status !== 200) {
        window.alert('status: ' + response.status + ' ' + response.statusText)
      }
      return response.json()
    })
    .then(function (myJson) {
      jsonFile = myJson
      showAdvBlock(myJson)
      curAdvData = myJson
    })
}

function showAdvBlock (json) {
  var html = ''
  var id = 0
  json.forEach(function (block) {
    html += '<table class="table table-hover table-striped" ><tbody><th>Description</th><th width="100">Amount</th>'
    block.forEach(function (element) {
      html += '<tr><td onclick="addMciNameLabel()">' + element.descr + '</td><td>' + element.amount + '</td></tr>'
    })
    id = id + 1
    html += '</tbody></table>'
  })

  $('#currentAdvTable').html(html)
}

function addMciNameLabel () {
  var textMci = window.getSelection().toString()
  $('#currentAdvMciLabel').val(textMci)
}

function markAsFixed () {
  if (opportunityId !== '' && opportunityStage !== '') {
    console.log(opportunityId + ' : ' + opportunityStage + ' : ' + oppoProcess)
    window.fetch('/fixed/' + opportunityId + '/' + oppoProcess + '/' + opportunityStage, {
      method: 'GET'
    }).then(function (response) {
      if (response.status !== 200) {
        window.alert('status: ' + response.status + ' ' + response.statusText)
      }
    }).catch(window.alert)
  }
}

function addNewMca () {
  var mca = $('#currentAdvMciLabel').val()
  window.fetch('/keywords', {
    method: 'POST',
    body: JSON.stringify({
      'keyword': mca,
      'category': 'McaDepoWithdNames'
    })
  }).then(function (response) {
    if (response.status === 200) {
      loadUpdatedData(mca)
    } else {
      window.alert('status: ' + response.status + ' ' + response.statusText)
    }
    console.log(response.statusText)
  }).catch(window.alert)
}

function loadUpdatedData (mca) {
  _.remove(curAdvData, function (block) {
    return block.some(function (item) {
      return item.descr.includes(mca)
    })
  })
  showAdvBlock(curAdvData)
}
