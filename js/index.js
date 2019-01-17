/* global $ showDocsDownloadModal showExportToSfModal chooseAccount showFiles checkCurrentAdvances checkDeposits showCreatedDate showTimer showLog attachFiles */
/* eslint-disable no-unused-vars, no-global-assign */

var tableTheme = 'table-dark'
var theadBgColor = 'background-color: #2c3034'
var globalOpportunities
var opportunityId = ''
var opportunityStage = ''
var processes
var process = ''
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
      processes = myJson.processes
      drawTable(myJson)
    //  showHideColumn()
    })
  // $(document).ready(function () {
  //   $('#navi-div').css({
  //     'width': ($('#my-table').width() + 'px')
  //   })
  // })
}

function drawTable (jsonData) {
  var oppos = jsonData.oppos.reverse()
  $(document).ready(function () {
    $('#oppos-table').remove()
    $('#my-table').append('<table class="table ' + tableTheme + '  table table-bordered" id="oppos-table">' +
      '<tr><thead style = "' + theadBgColor + '">' +
      '<th scope="col"></th>' +
      '<th scope="col" class="text-center" width="30px">Date</th>' +
      '<th scope="col">Opportunity Name</th>' +
      addProcessesToTable(jsonData.processes) +
      '<th scope="col" class="text-center" width="100px">Timer</th>' +
      '</thead></tr>')
    var oppoNumber = 1
    var prevDate = oppos[oppos.length - 1].date
    oppos.forEach(function (oppo) {
      var processesStages = []
      oppo.processes.forEach(function (process) {
        processesStages.push(process)
      })
      var lastStageStatus = ''
      var lastStageName = ''
      var decline = false
      processesStages.forEach(function (process) {
        process.stages.forEach(function (stage) {
          if (stage.stageStatus.statusStr === 'StoppedStStatus') {
            decline = true
          } else if (process.processName === 'Document Processing' && process.stages.length) {
            lastStageStatus = process.stages[process.stages.length - 1].stageStatus.statusStr
            lastStageName = process.stages[process.stages.length - 1].stageNameStr
          }
        })
      })
      oppoNumber = getOppoNumber(prevDate, oppo.date, oppoNumber)
      $('#oppos-table').append('<tr><td  width="3px" class="' + addClass(oppo.oppoStatus) + '"></td><td style="font-size: 11px">' + showCreatedDate(oppo.date) + '</td><td><a href="http://arcariusfunding.my.salesforce.com/' + oppo.id + '" class="oppo-href" target="_blank">' + oppoNumber + '.  ' + oppo.oppoName + '</a></td>' + addStages(jsonData, oppo.id) + '<td class="text-center text-nowrap">' +
           showTimer(oppo.id, lastStageStatus, lastStageName, oppo.date, decline) + '</tr>')
    prevDate = oppo.date
    })
    $('#oppos-table').append('</table>')
  })
}

function addStages (jsonData, oppoId) {
  var htmlButtons = ''
  var processes = jsonData.processes
  var oppoProcesses

  jsonData.oppos.forEach(function (oppo) {
    if (oppo.id === oppoId) {
      oppoProcesses = oppo.processes
    }
  })
  var oppoStages = []
  oppoProcesses.forEach(function (process) {
    process.stages.forEach(function (stage) {
      oppoStages.push(stage)
    })
  })
  htmlButtons += addButtons(processes, oppoStages, oppoId)
  return htmlButtons
}

function addButtons (processes, oppoStages, oppoId) {
  var htmlButtons = ''

  for (var processName in processes) {
    htmlButtons += '<td class="text-center text-nowrap">'
    processes[processName].forEach(function (stageName) {
      var flag = false
      var existingStage
      oppoStages.forEach(function (stage) {
        if (stageName === stage.stageNameStr) {
          flag = true
          existingStage = stage
        }
      })
      if (flag) {
        htmlButtons += addButton(existingStage, oppoId)
      } else {
        htmlButtons += '<input type="button" value="' + stageName + '" class="btn btn-secondary btn-sm">'
      }
      htmlButtons += ' '
    })
    htmlButtons += '</td>'
  }

  return htmlButtons
}

function addButton (stage, oppoId) {
  var button = ''
  switch (stage.stageStatus.statusStr) {
    case 'CompletedStStatus':
      button = '<input type="button" value="' + stage.stageNameStr + '" class="btn btn-success2 btn-sm" id="btn" onclick="showPopUp(this, \'' + oppoId + '\')">'
      break
    case 'ErrorStStatus':
      button = '<input type="button" value="' + stage.stageNameStr + '" class="btn btn-danger1 btn-sm" id="btn" onclick="showPopUp(this, \'' + oppoId + '\')">'
      break
    case 'InProcessStStatus':
      button = '<input type="button" value="' + stage.stageNameStr + '" class="btn btn-warning btn-sm" id="btn" onclick="showPopUp(this, \'' + oppoId + '\')">'
      break
    case 'NotStartedStStatus':
      button = '<input type="button" value="' + stage.stageNameStr + '" class="btn btn-secondary btn-sm" id="btn" onclick="showPopUp(this, \'' + oppoId + '\')">'
      break
    case 'StoppedStStatus':
      button = '<input type="button" value="' + stage.stageNameStr + '" class="btn btn-info btn-sm" id="btn" onclick="showPopUp(this, \'' + oppoId + '\')">'
      break
    default:
      break
  }
  return button
}

function showPopUp (button, oppoId) {
  globalOpportunities.forEach(function (oppo) {
    if (oppoId === oppo.id) {
      showPopUpForCurrentStage(button.value, oppoId)
    }
  })
}

function setSelectedOppoIdProcessAndStageName (id, stage) {
  opportunityId = id
  opportunityStage = stage
  for (var processName in processes) {
    processes[processName].forEach(function (stageName) {
      if (stage === stageName) {
        process = processName
      }
    })
  }
}

function showPopUpForCurrentStage (stage, oppoId) {
  switch (stage) {
    case 'DocumentsDownloaded':
      setSelectedOppoIdProcessAndStageName(oppoId, stage)
      showDocsDownloadModal(oppoId, stage, process)
      break
    case 'FilesAttached':
      setSelectedOppoIdProcessAndStageName(oppoId, stage)
      attachFiles(oppoId, stage)
      break
    case 'AccountChosen':
      setSelectedOppoIdProcessAndStageName(oppoId, stage)
      chooseAccount(oppoId, stage)
      break
    case 'SubmissionValidated':
      setSelectedOppoIdProcessAndStageName(oppoId, stage)
      console.log(process)
      showLog(oppoId, stage, process)
      break
    case 'ExportedToSF':
      setSelectedOppoIdProcessAndStageName(oppoId, stage)
      showExportToSfModal(oppoId, stage, process)
      break
    case 'AdvancesValidated':
      setSelectedOppoIdProcessAndStageName(oppoId, stage)
      checkCurrentAdvances(oppoId, stage, process)
      break
    case 'TrueRevenue':
      setSelectedOppoIdProcessAndStageName(oppoId, stage)
      checkDeposits(oppoId, stage, process)
      break
    default:
      setSelectedOppoIdProcessAndStageName(oppoId, stage)
      showLog(oppoId, stage)
      break
  }
}

function resetStage () {
  if (opportunityId !== '' && opportunityStage !== '') {
    console.log(opportunityId + ' : ' + opportunityStage + ' : ' + process)
    // window.fetch('http://localhost:8080/reset/' + opportunityId + '/' + opportunityStage, {
    window.fetch('/reset/' + opportunityId + '/' + process + '/' + opportunityStage, {
      method: 'GET'
    }).then(function (response) {
      if (response.status !== 200) {
        window.alert('not 200' + 'status is: ' + response.status + ' ' + response.statusText)
      }
    }).catch(window.alert)
  }
}

function setAppVersion () {
  window.fetch('data.json')
  //  window.fetch('/status')
    .then(function (response) {
      if (response.status !== 200) {
        window.alert('Data fetch error, ' + 'status is: ' + response.status + ' ' + response.statusText)
      }
      return response.json()
    })
    .then(function (myJson) {
      if (myJson.appVersion !== undefined) {
        setVersion(myJson.appVersion)
      }
    })
}

function setVersion (version) {
  $(document).ready(function () {
    $('#ocr-title').append('<span style="font-size: small; color: #737b81"> &nbsp;' + version + '</span>')
  })
}

function addProcessesToTable (processes) {
  var html = ''
  for (var processName in processes) {
    html += '<th scope="col" class="text-center">' + processName + '</th>'
  }
  return html
}

function showHideColumn () {
  $(document).ready(function () {
    $('td:nth-child(3),th:nth-child(3)').hide()
  })
}

function addClass (status) {
  if (status) {
    return 'bg-success'
  }
}

function getOppoNumber (prevDay, day, number) {
  var prevDayArray = prevDay.split(' ')
  var dayArray = day.split(' ')
  if (prevDayArray[2] === dayArray[2]) {
    return number + 1
  } else {
    return 1
  }
}


setAppVersion()

showTableInterval()
// showTable()
