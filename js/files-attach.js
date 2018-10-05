/* global $ globalOpportunities */
/* eslint-disable no-unused-vars, no-global-assign */
var filesStr = []
var accountId
function attachFiles (oppoId, stageName) {
  accountId = oppoId
  filesStr = []
  window.fetch('files.json')
    .then(function (response) {
      if (response.status !== 200) {
        window.alert('not 200' + 'status is: ' + response.status + ' ' + response.statusText)
      }
      return response.json()
    })
    .then(function (myJson) {
      showAttachedFiles(myJson.files, oppoId, stageName)
    })
}

function showAttachedFiles (filesJson, oppoId, stageName) {
  $('#attachedFilesModal').modal()
  let html = ''
  filesJson.forEach(function (fileName) {
    html += '<div class="custom-control custom-checkbox border-bottom"><input type="checkbox" onclick="check(this, \'' + fileName + '\')" class="custom-control-input" id = "' + fileName + '"><label class="custom-control-label" for="' + fileName + '" id="fileLabel">' + fileName + '</label></div>'
  })
  $('#attachedFilesModalFilesArea').html(html)
  showAttachedFilesLog(oppoId, stageName)
}

function check (checkBox, fileName) {
  var index = filesStr.indexOf(fileName)
  if (index > -1) {
    filesStr.splice(index, 1)
  } else {
    filesStr.push(fileName)
  }
}

function showAttachedFilesLog (oppoId, stageName) {
  globalOpportunities.forEach(function (oppo) {
    if (oppo.id === oppoId) {
      oppo.stages.forEach(function (stage) {
        if (stage.name === stageName) {
          stageName = stageName.replace(/([a-z](?=[A-Z]))/g, '$1 ')
          $('#attachedFilesModalLabel').html(stageName)
          $('#attachedFilesModalTextArea').html(stage.stageStatus.log)
        }
      })
    }
  })
}

function sendFilesJson () {
  console.log(filesStr)
  window.fetch('http://localhost:8080/files/' + accountId, {
    method: 'POST',
    body: JSON.stringify({
      'files': filesStr
    })
  }).then(function (response) {
    if (response.status !== 200) {
      window.alert('not 200' + 'status is: ' + response.status + ' ' + response.statusText)
    }
  }).catch(window.alert)
}
