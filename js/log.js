/* global $ globalOpportunities */
/* eslint-disable no-unused-vars, no-global-assign */
var oppoProcess = ''
var opportunityId = ''
var opportunityStage = ''
function showLog (oppoId, stageName, process) {
  oppoProcess = process
  opportunityId = oppoId
  opportunityStage = stageName
  $('#logModal').modal()
  globalOpportunities.forEach(function (oppo) {
    if (oppo.id === oppoId) {
      oppo.processes.forEach(function (process) {
        process.stages.forEach(function (stage) {
          if (stage.stageNameStr === stageName) {
            stageName = stageName.replace(/([a-z](?=[A-Z]))/g, '$1 ')
            $('#modalLabel').html(stageName + ' (Log)')
            $('#text-area').html(stage.stageStatus.log)
          }
        })
      })
    }
  })
}

function tryToFix () {
  if (opportunityId !== '' && opportunityStage !== '') {
    console.log(opportunityId + ' : ' + opportunityStage + ' : ' + oppoProcess)
    window.fetch('/fixed/' + opportunityId + '/' + oppoProcess + '/' + opportunityStage, {
      method: 'GET'
    }).then(function (response) {
      if (response.status !== 200) {
        window.alert('not 200' + 'status is: ' + response.status + ' ' + response.statusText)
      }
    }).catch(window.alert)
  }
}
