/* global $ globalOpportunities */
/* eslint-disable no-unused-vars, no-global-assign */
var chosenAccount = ''
var accountId = ''
function chooseAccount (id, stage) {
  accountId = id
 // window.fetch('accounts.json')
   window.fetch('/accounts/' + id)
    .then(function (response) {
      if (response.status !== 200) {
        window.alert('not 200' + 'status is: ' + response.status + ' ' + response.statusText)
      }
      return response.json()
    })
    .then(function (myJson) {
      showAccounts(myJson.accounts, id, stage)
    })
}

function showAccounts (accounts, id, stage) {
  $('#chooseAccountModal').modal()
  var html = ''
  accounts.forEach(function (account) {
    html += '<a href="#" onclick="addAccount(\'' + account + '\')" class="list-group-item list-group-item-action">' + account + '</a>'
  })
  $('#accountsList').html(html)
  showAccountChosenLog(id, stage)
}

function addAccount (account) {
  chosenAccount = account
}

function sendAccountJson () {
 // window.fetch('http://localhost:8080/accounts', {
    window.fetch('/accounts', {
    method: 'POST',
    body: JSON.stringify({
      'oppoId': accountId,
      'accountId': chosenAccount
    })
  }).then(function (response) {
    if (response.status !== 200) {
      window.alert('not 200' + 'status is: ' + response.status + ' ' + response.statusText)
    }
    console.log(response.statusText)
  }).catch(window.alert)
}

function showAccountChosenLog (oppoId, stageName) {
  globalOpportunities.forEach(function (oppo) {
    if (oppo.id === oppoId) {
      oppo.processes.forEach(function (process) {
        process.stages.forEach(function (stage) {
          if (stage.stageNameStr === stageName) {
            stageName = stageName.replace(/([a-z](?=[A-Z]))/g, '$1 ')
            $('#chooseAccountModalLabel').html(stageName)
            $('#chooseAccountModalTextArea').html(stage.stageStatus.log)
          }
        })
      })
    }
  })
}
