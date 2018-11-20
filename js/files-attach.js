/* global $ globalOpportunities */
/* eslint-disable no-unused-vars, no-global-assign */
var filesStr = []
var accountId
function attachFiles (oppoId, stageName) {
  accountId = oppoId
  filesStr = []
  window.fetch('files.json')
  //  window.fetch('/files')
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

$(function () {
  $('#attachedFilesModal').on('change', '.file-checkbox', function () {
    var checked = $(this).prop('checked')
    var fileName = $(this).attr('id')
    if (checked) {
      filesStr.push(fileName)
    } else {
      var fileNameIndex = filesStr.indexOf(fileName)
      if (fileNameIndex !== -1) {
        filesStr.splice(fileNameIndex, 1)
      }
    }
  })
})
function showAttachedFiles (filesJson, oppoId, stageName) {
  $('#attachedFilesModal').modal()
  let html = ''
  filesJson.forEach(function (fileName, index) {
    fileName = JSON.stringify(fileName).replace(/^['"]/g, '').replace(/['"]$/g, '')
    html += '<div class="custom-control custom-checkbox border-bottom"><input type="checkbox" class="custom-control-input file-checkbox" id="' + fileName + '" data-index= "' + index + '"><label class="custom-control-label" for="' + fileName + '" id="fileLabel">' + fileName + '</label></div>'
  })
  $('#attachedFilesModalFilesArea').html(html)
  showAttachedFilesLog(oppoId, stageName)
}

// function check (checkBox, fileName) {
//   var index = filesStr.indexOf(fileName)
//   if (index > -1) {
//     filesStr.splice(index, 1)
//   } else {
//     filesStr.push(fileName)
//   }
//
// }

function showAttachedFilesLog (oppoId, stageName) {
  globalOpportunities.forEach(function (oppo) {
    if (oppo.id === oppoId) {
      oppo.processes.forEach(function (process) {
        process.stages.forEach(function (stage) {
          if (stage.stageNameStr === stageName) {
            stageName = stageName.replace(/([a-z](?=[A-Z]))/g, '$1 ')
            $('#attachedFilesModalLabel').html(stageName)
            $('#attachedFilesModalTextArea').html(stage.stageStatus.log)
          }
        })
      })
    }
  })
}

function sendFilesJson () {
  console.log(filesStr)
  // window.fetch('http://localhost:8080/files/' + accountId, {
  window.fetch('/files/' + accountId, {
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
