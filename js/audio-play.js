var playAudioEvery5sec = function () { setInterval(fetchDataForAudio, 10000) }

function fetchDataForAudio () {
  window.fetch('data.json')
  // window.fetch('/status')
    .then(function (response) {
      if (response.status !== 200) {
        window.alert('Data fetch error, ' + 'status is: ' + response.status + ' ' + response.statusText)
      }
      return response.json()
    })
    .then(function (myJson) {
      checkAdvAndRevenue(myJson)
    })
}

function checkAdvAndRevenue (json) {
  var activeOpposArray = json.oppos.filter(function (oppo) {
    return (oppo.oppoStatus === 'Active')
  })
  activeOpposArray.forEach(function (oppo) {
    oppo.processes.forEach(function (process) {
      if (process.processName === 'Document Processing') {
        process.stages.forEach(function (stage) {
          if (stage.stageNameStr === 'AdvancesValidated' || stage.stageNameStr === 'TrueRevenue') {
            if (stage.stageStatus.statusStr === 'ErrorStStatus') {
              console.log('here')
              document.getElementById('audio').play()
            }
          }
        })
      }
    })
  })
}

fetchDataForAudio()
playAudioEvery5sec()
