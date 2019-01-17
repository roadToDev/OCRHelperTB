/* global $ globalOpportunities */
/* eslint-disable no-unused-vars, no-global-assign */
var opportunityId = ''
var opportunityStage = ''
var oppoProcess = ''
var layoutsToSend = []
var layouts = []
function showDocsDownloadModal (oppoId, stageName, process) {
  document.getElementById('docsDownloadInput').value = 'sad'
  opportunityId = oppoId
  opportunityStage = stageName
  oppoProcess = process
  $('#documentsModal').modal()
  showLayoutsTable()
  globalOpportunities.forEach(function (oppo) {
    if (oppo.id === oppoId) {
      console.log(oppo)
      oppo.processes.forEach(function (process) {
        process.stages.forEach(function (stage) {
          if (stage.stageNameStr === stageName) {
            stageName = stageName.replace(/([a-z](?=[A-Z]))/g, '$1 ')
            $('#documentsModalLabel').html(stageName)
            $('#documentsTextArea').html(stage.stageStatus.log)
          }
        })
      })
    }
  })
}

function searchLayout () {
  var input, filter, table, tr, td, i, txtValue
  input = document.getElementById('docsDownloadInput')
  filter = input.value.toUpperCase()
  table = document.getElementById('docDownloadTable')
  tr = table.getElementsByTagName('tr')
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName('td')[0]
    if (td) {
      txtValue = td.textContent || td.innerText
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = ''
      } else {
        tr[i].style.display = 'none'
      }
    }
  }
}

function showLayoutsTable () {
 // window.fetch('layouts.json')
   window.fetch('/layout-connection/list')
    .then(function (response) {
      if (response.status !== 200) {
        window.alert('Data fetch error, ' + 'status is: ' + response.status + ' ' + response.statusText)
      }
      return response.json()
    })
    .then(function (myJson) {
      layouts = myJson
      drawTable(layouts)
    })

  function drawTable (layouts) {
    var html = '<tbody>'
    layouts.forEach(function (layoutName) {
      html += '<tr><td>' + layoutName + '</td><td><input class="layout-checkbox" id="' + layoutName + '" type="checkbox" /></td></tr>'
    })
    html += '</tbody>'
    $('#docDownloadTable').html(html)
  }
}

$(function () {
  $('#documentsModal').on('change', '.layout-checkbox', function () {
    var checked = $(this).prop('checked')
    var fileName = $(this).attr('id')
    if (checked) {
      layoutsToSend.push(fileName)
    } else {
      var fileNameIndex = layoutsToSend.indexOf(fileName)
      if (fileNameIndex !== -1) {
        layoutsToSend.splice(fileNameIndex, 1)
      }
    }
  })
})

function docsDownloadMarkAsFixed () {
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

function addDefinitions () {
  console.log('add')
}

