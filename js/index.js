/* global $ showCreatedDate showTimer showLog */
/* eslint-disable no-unused-vars, no-global-assign */
var tableTheme = 'table-dark'
var theadBgColor = 'background-color: #2c3034'
var globalOpportunities
function showTable () {
  window.fetch('data.json')
    .then(function (response) {
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
      '<th scope="col" class="text-center" width="847px">Stages</th>' +
      '<th scope="col" class="text-center" width="30px">Timer</th>' +
      '</thead></tr>')
    oppos.forEach(function (item) {
      var lastStageStatus = ''
      var firstStageStatus = item.stages[0].stageStatus.statusStr
      try {
        lastStageStatus = item.stages[5].stageStatus.statusStr
      } catch (err) {
      }

      $('#oppos-table').append('<tr><td style="font-size: 11px">' + showCreatedDate(item.id) + '</td><td>' + item.name + '</td><td>' + addStages(jsonData, item.id) + '</td>' +
        '<td id="timer" style="align-content: center">' + showTimer(item.id, firstStageStatus, lastStageStatus) + '</td></tr>')
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
              button = '<input type="button" value="' + stageName + '" class="btn btn-success btn-sm" id="btn" onclick="showPopUp(this, \'' + oppoId + '\')">'
              break
            case 'ErrorStStatus':
              button = '<input type="button" value="' + stageName + '" class="btn btn-danger btn-sm" id="btn" onclick="showPopUp(this, \'' + oppoId + '\')">'
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

function showPopUpForCurrentStage (stage, oppoId) {
  switch (stage) {
    case 'DocumentsDownloaded':
      showLog(oppoId, stage)
      break
    case 'FilesAttached':
      break
    case 'AccountChosen':
      break
    case 'SubmissionValidated':
      showLog(oppoId, stage)
      break
    case 'ExportedToSF':
      showLog(oppoId, stage)
      break
    default:
      showLog(oppoId, stage)
      break
  }
}

setInterval(showTable, 1000)
