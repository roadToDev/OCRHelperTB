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
      addProcessesToTable(jsonData.processes) +
    // '<th scope="col" class="text-center">Stages</th>' +
      '<th scope="col" class="text-center" width="100px">Timer</th>' +
      '</thead></tr>')

    oppos.forEach(function (oppo) {
      var processesStages = []
      oppo.processes.forEach(function (process) {
        processesStages.push(process)
      })
      var lastStageStatus = ''
      if (processesStages[1].stages.length) {
        lastStageStatus = processesStages[1].stages[processesStages[1].stages.length - 1].stageStatus.statusStr
      }

      $('#oppos-table').append('<tr><td style="font-size: 11px">' + showCreatedDate(oppo.id) + '</td><td><a href="http://arcariusfunding.my.salesforce.com/' + oppo.id + '" class="oppo-href" target="_blank">' + oppo.name + '</a></td>' + addStages(jsonData, oppo.id) + '<td class="text-center text-nowrap">' +
           showTimer(oppo.id, lastStageStatus) + '</tr>')
    })
    $('#oppos-table').append('</table>')
  })
}

// function addCBCStages (jsonData, process, oppoId) {
//   console.log(process)
//   var buttons = ''
//   process.stages.forEach(function (stage) {
//     buttons = buttons + ' ' + addButton(process, oppoId, stage.stageNameStr)
//   })
//   jsonData.processes[process.processName].forEach(function (stageName) {
//     if (buttons.indexOf(stageName) === -1) {
//       buttons = buttons + ' <input type="button" value="' + stageName + '" class="btn btn-secondary btn-sm">'
//     }
//   })
//   buttons += ''
//   return buttons
// }

function addStages (jsonData, oppoId) {
  var buttons = ''
  jsonData.oppos.forEach(function (oppo) {
    if (oppo.id === oppoId) {
      oppo.processes = oppo.processes.reverse()
      oppo.processes.forEach(function (process) {
        buttons += '<td class="text-center text-nowrap">'
        process.stages.forEach(function (stage) {
          buttons = buttons + ' ' + addButton(jsonData, oppoId, stage.stageNameStr)
        })
        buttons += '</td>'
      })
    }
  })

  var allStages = []
  for (var key in jsonData.processes) {
    jsonData.processes[key].forEach(function (stage) {
      allStages.push(stage)
    })
  }
  var stageIndex = 0
  allStages.forEach(function (stage) {
    var index = buttons.indexOf(stage)
    console.log(stageIndex)
   // console.log('index' + index)
    if (index === -1) {
      var charIndex = buttons.indexOf('>', stageIndex)
      console.log('after ' + stageIndex)
    //  console.log('before StageInd' + stageIndex)
     // console.log('char' + charIndex)
      var notStartedButton = ' <input type="button" value="' + stage + '" class="btn btn-secondary btn-sm">'
      buttons = insert(buttons, charIndex + 1, notStartedButton)

      if (stageIndex === 0) {
        stageIndex = charIndex + stageIndex + notStartedButton.length
        console.log('here')
      } else {
        stageIndex = stageIndex + notStartedButton.length
      }
     // console.log('after StageInd' + stageIndex)
    } else stageIndex = index
  })
  buttons += ''
  return buttons
}

function addButton (jsonData, oppoId, stageName) {
  var button = ''
  var oppoStages = []
  jsonData.oppos.forEach(function (oppo) {
    if (oppo.id === oppoId) {
      oppo.processes.forEach(function (process) {
        process.stages.forEach(function (stage) {
          oppoStages.push(stage)
        })
      })
    }
  })
  oppoStages.forEach(function (oppoStage) {
    if (oppoStage.stageNameStr === stageName) {
      switch (oppoStage.stageStatus.statusStr) {
        case 'CompletedStStatus':
          button = '<input type="button" value="' + stageName + '" class="btn btn-success2 btn-sm" id="btn" onclick="showPopUp(this, \'' + oppoId + '\')">'
          break
        case 'ErrorStStatus':
          button = '<input type="button" value="' + stageName + '" class="btn btn-danger1 btn-sm" id="btn" onclick="showPopUp(this, \'' + oppoId + '\')">'
          break
        case 'InProcessStStatus':
          button = '<input type="button" value="' + stageName + '" class="btn btn-warning btn-sm" id="btn" onclick="showPopUp(this, \'' + oppoId + '\')">'
          break
        case 'NotStartedStStatus':
          button = '<input type="button" value="' + stageName + '" class="btn btn-secondary btn-sm" id="btn" onclick="showPopUp(this, \'' + oppoId + '\')">'
          break
        default:
          break
      }
    }
  })

  return button
}

// function addButton (process, oppoId, stageName) {
//   var button = ''
//   process.stages.forEach(function (stage) {
//     if (stage.stageNameStr === stageName) {
//       switch (stage.stageStatus.statusStr) {
//         case 'CompletedStStatus':
//           button = '<input type="button" value="' + stageName + '" class="btn btn-success2 btn-sm" id="btn" onclick="showPopUp(this, \'' + oppoId + '\')">'
//           break
//         case 'ErrorStStatus':
//           button = '<input type="button" value="' + stageName + '" class="btn btn-danger1 btn-sm" id="btn" onclick="showPopUp(this, \'' + oppoId + '\')">'
//           break
//         case 'InProcessStStatus':
//           button = '<input type="button" value="' + stageName + '" class="btn btn-warning btn-sm" id="btn" onclick="showPopUp(this, \'' + oppoId + '\')">'
//           break
//         case 'NotStartedStStatus':
//           button = '<input type="button" value="' + stageName + '" class="btn btn-secondary btn-sm" id="btn" onclick="showPopUp(this, \'' + oppoId + '\')">'
//           break
//         default:
//           break
//       }
//     }
//   })
//
//   return button
// }

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

function setAppVersion () {
  window.fetch('data.json')
    // window.fetch('/status')
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
    $('#ocr-title').append('<span style="font-size: small; color: #737b81"> &nbsp;v.' + version + '</span>')
  })
}

function addProcessesToTable (processes) {
  var html = ''
  for (var processName in processes) {
    html += '<th scope="col" class="text-center">' + processName + '</th>'
  }
  return html
}

function insert (str, index, value) {
  return str.substr(0, index) + value + str.substr(index)
}

setAppVersion()

// showTableInterval()
showTable()
