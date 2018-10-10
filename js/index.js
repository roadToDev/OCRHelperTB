/* global $ chooseAccount showCreatedDate showTimer showLog attachFiles */
/* eslint-disable no-unused-vars, no-global-assign */

var tableTheme = 'table-dark'
var theadBgColor = 'background-color: #2c3034'
var globalOpportunities
var opportunityId = ''
var opportunityStage = ''
var showTableInterval = function () { setInterval(showTable, 1000) }

function showTable () {
  window.fetch('data.json')
  // window.fetch('/status')
    .then(function (response) {
      if (response.status !== 200) {
        clearInterval(showTableInterval)
        window.alert('Data fetch error, ' + 'status is: ' + response.status + ' ' + response.statusText)
      }
      return response.json()
    })
    .then(function (myJson) {
      globalOpportunities = myJson.oppos
      drawTable(myJson)
    })
}

function drawTable (jsonData) {
  var oppos = jsonData.oppos.reverse()
  $(document).ready(function () {
    $('#oppos-table').remove()
    $('#my-table').append('<table class="table ' + tableTheme + ' table-striped table table-bordered" id="oppos-table">' +
      '<tr><thead style = "' + theadBgColor + '">' +
      '<th scope="col" class="text-center" width="30px">Date</th>' +
      '<th scope="col">Opportunity Name</th>' +
      '<th scope="col" class="text-center" width="850px"">Stages</th>' +
      '<th scope="col" class="text-center" width="95px">Timer</th>' +
      '</thead></tr>')
    oppos.forEach(function (item) {
      var lastStageStatus = ''

      if (item.stages.length) {
        lastStageStatus = item.stages[item.stages.length - 1].stageStatus.statusStr
      }

      $('#oppos-table').append('<tr><td style="font-size: 11px">' + showCreatedDate(item.id) + '</td><td>' + item.name + '</td><td class="text-center">' + addStages(jsonData, item.id) + '</td>' +
        '<td id="timer" style="text-align: center">' + showTimer(item.id, lastStageStatus) + '</td></tr>')
    })
    $('#oppos-table').append('</table>')
  })
}

function addStages (jsonData, oppoId) {
  var buttons = ''
  jsonData.stages.forEach(function (stageName) {
    buttons = buttons + ' ' + addButton(jsonData, oppoId, stageName)
  })
  jsonData.stages.forEach(function (stageName) {
    if (buttons.indexOf(stageName) === -1) {
      buttons = buttons + ' <input type="button" value="' + stageName + '" class="btn btn-secondary btn-sm">'
    }
  })
  buttons += ''
  return buttons
}

function addButton (jsonData, oppoId, stageName) {
  var button = ''
  jsonData.oppos.forEach(function (oppo) {
    if (oppo.id === oppoId) {
      oppo.stages.forEach(function (stage) {
        if (stage.name === stageName) {
          switch (stage.stageStatus.statusStr) {
            case 'CompletedStStatus':
              button = '<input type="button" value="' + stageName + '" class="btn btn-success2 btn-sm" id="btn" onclick="showPopUp(this, \'' + oppoId + '\')">'
              break
            case 'ErrorStStatus':
              button = '<input type="button" value="' + stageName + '" class="btn btn-danger1 btn-sm" id="btn" onclick="showPopUp(this, \'' + oppoId + '\')">'
              break
            case 'InProcessStStatus':
              button = '<input type="button" value="' + stageName + '" class="btn btn-warning btn-sm" id="btn" onclick="showPopUp(this, \'' + oppoId + '\')">'
              break
            default:
              break
          }
        }
      })
    }
  }
  )
  return button
}

function showPopUp (button, oppoId) {
  globalOpportunities.forEach(function (oppo) {
    if (oppoId === oppo.id) {
      showPopUpForCurrentStage(button.value, oppoId)
    }
  })
}

function setSelectedOppoIdAndStageName (id, stage) {
  opportunityId = id
  opportunityStage = stage
}

function showPopUpForCurrentStage (stage, oppoId) {
  switch (stage) {
    case 'DocumentsDownloaded':
      setSelectedOppoIdAndStageName(oppoId, stage)
      showLog(oppoId, stage)
      break
    case 'FilesAttached':
      setSelectedOppoIdAndStageName(oppoId, stage)
      attachFiles(oppoId, stage)
      break
    case 'AccountChosen':
      setSelectedOppoIdAndStageName(oppoId, stage)
      chooseAccount(oppoId, stage)
      break
    case 'SubmissionValidated':
      setSelectedOppoIdAndStageName(oppoId, stage)
      showLog(oppoId, stage)
      break
    case 'ExportedToSF':
      setSelectedOppoIdAndStageName(oppoId, stage)
      showLog(oppoId, stage)
      break
    default:
      setSelectedOppoIdAndStageName(oppoId, stage)
      showLog(oppoId, stage)
      break
  }
}

function resetStage () {
  if (opportunityId !== '' && opportunityStage !== '') {
    console.log(opportunityId + ' : ' + opportunityStage)
    window.fetch('http://localhost:8080/reset/' + opportunityId + '/' + opportunityStage, {
      // window.fetch('/reset/' + opportunityId + '/' + opportunityStage, {
      method: 'GET'
    }).then(function (response) {
      if (response.status !== 200) {
        window.alert('not 200' + 'status is: ' + response.status + ' ' + response.statusText)
      }
    }).catch(window.alert)
  }
}

showTableInterval()
