/* global $ showCreatedDate showTimer */
/* eslint-disable no-unused-vars, no-global-assign */
function showTable () {
  window.fetch('data.json')
    .then(function (response) {
      return response.json()
    })
    .then(function (myJson) {
      drawTable(myJson)
    })
}

function drawTable (jsonData) {
  $(document).ready(function () {
    $('#oppos-table').remove()
    $('#my-table').append('<table class="table table-dark table-striped table table-bordered" id="oppos-table">' +
      '<tr><thead style="background-color: #2c3034">' +
      '<th scope="col" class="text-center" width="30px">Date</th>' +
      '<th scope="col">Opportunity Name</th>' +
      '<th scope="col" class="text-center" width="804px">Stages</th>' +
      '<th scope="col" class="text-center" width="30px">Timer</th>' +
      '</thead></tr>')
    jsonData.oppos.forEach(function (item) {
      var status = ''
      try {
        status = item.stages[5].stageStatus.statusStr
      } catch (err) {
      }

      $('#oppos-table').append('<tr><td style="font-size: 11px">' + showCreatedDate(item.id) + '</td><td>' + item.name + '</td><td>' + addStages(jsonData, item.name) + '</td>' +
        '<td>' + showTimer(item.id, status) + '</td></tr>')
    })
    $('#oppos-table').append('</table>')
  })
}

function addStages (jsonData, oppoName) {
  var buttons = ''
  jsonData.stages.forEach(function (stageName) {
    buttons = buttons + ' ' + addButton(jsonData, oppoName, stageName)
  })
  jsonData.stages.forEach(function (stageName) {
    if (buttons.indexOf(stageName) === -1) {
      buttons = buttons + ' <button type="button" class="btn btn-secondary btn-sm">' + stageName + '</button>'
    }
  })
  return buttons
}

function addButton (jsonData, oppoName, stageName) {
  var button = ''
  jsonData.oppos.forEach(function (item) {
    if (item.name === oppoName) {
      item.stages.forEach(function (item) {
        if (item.name === stageName) {
          switch (item.stageStatus.statusStr) {
            case 'CompletedStStatus':
              button = '<button type="button" class="btn btn-success btn-sm">' + stageName + '</button>'
              break
            case 'ErrorStStatus':
              button = '<button type="button" class="btn btn-danger btn-sm">' + stageName + '</button>'
              break
            case 'InProcessStStatus':
              button = '<button type="button" class="btn btn-warning btn-sm">' + stageName + '</button>'
              break
            default:
              break
          }
        }
      })
    }
  })
  return button
}
setInterval(showTable, 1000)
