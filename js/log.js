/* global $ globalOpportunities */
/* eslint-disable no-unused-vars, no-global-assign */
function showLog (oppoId, stageName) {
  $('#logModal').modal()
  globalOpportunities.forEach(function (oppo) {
    if (oppo.id === oppoId) {
      oppo.processes.forEach(function (process) {
        process.stages.forEach(function (stage) {
          if (stage.stageNameStr === stageName) {
            stageName = stageName.replace(/([a-z](?=[A-Z]))/g, '$1 ')
            $('#modalLabel').html(stageName + ' (Log)')
            $('#text-area').html(stage.stageStatus.log)
          }
        })
      })
    }
  })
}
