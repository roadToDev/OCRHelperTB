/* global $ globalOpportunities */
/* eslint-disable no-unused-vars, no-global-assign */
var opportunityId = ''
var opportunityStage = ''
var oppoProcess = ''
function showExportToSfModal (oppoId, stageName, process) {
  opportunityId = oppoId
  opportunityStage = stageName
  oppoProcess = process
  $('#exportToSfModal').modal()
  globalOpportunities.forEach(function (oppo) {
    if (oppo.id === oppoId) {
      console.log(oppo)
      oppo.processes.forEach(function (process) {
        process.stages.forEach(function (stage) {
          if (stage.stageNameStr === stageName) {
            stageName = stageName.replace(/([a-z](?=[A-Z]))/g, '$1 ')
            $('#exportToSfModalLabel').html(stageName)
            $('#exportToSfTextArea').html(stage.stageStatus.log)
          }
        })
      })
    }
  })
}

function exportToSfMarkAsFixed () {
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

function clearSf () {
  console.log(opportunityId + ' : ' + opportunityStage + ' : ' + oppoProcess)
  window.fetch('/clear-oppo/' + opportunityId, {
    method: 'GET'
  }).then(function (response) {
    if (response.status !== 200) {
      window.alert('status: ' + response.status + ' ' + response.statusText)
    }
  }).catch(window.alert)
}
