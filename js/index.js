/* global $ */
/* eslint-disable no-unused-vars, no-global-assign */
function parseJsonData (url) {
  // $.getJSON(url, function (err, data) {
  //   if (err !== null){
  //     alert("Error: " + err)
  //   } else {
  //
  //   }
  //   data.forEach()
  //   // console.log( "JSON Data: " + json.oppos[3].name );
  // })
  window.fetch(url)
    .then(function (response) {
      return response.json()
    })
    .then(function (myJson) {
      showTable(myJson)
    })
}

function showTable (jsonData) {
  $(document).ready(function () {
    jsonData.oppos.forEach(function (item) {
      $('#oppos-table').append('<tr><td>17:52</td><td>' + item.name + '</td><td>' + addStages(jsonData, item.name) + '</td></tr>')
    })
  })
}

function addStages (jsonData, oppoName) {
  var buttons = ''
  jsonData.stages.forEach(function (stageName) {
    buttons = buttons + ' ' + addButton(jsonData, oppoName, stageName)
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
              button = '<button type="button" class="btn btn-success btn-sm">' + stageName + '</button>'
              break
            default:
              button = '<button type="button" class="btn btn-secondary btn-sm">' + stageName + '</button>'
          }
        }
      })
    }
  })
  return button
}

parseJsonData('data.json')
