/* global $ tableTheme showTable theadBgColor */
/* eslint-disable no-unused-vars, no-global-assign */
function playSound () {
  $('my_audio').trigger('load')
  $('my_audio').trigger('play')
}
function changeTheme () {
  $(document).ready(function () {
    if (tableTheme === 'table-dark') {
      tableTheme = 'table-light'
      theadBgColor = 'background-color: rgb(240, 240, 241)'
    } else {
      tableTheme = 'table-dark'
      theadBgColor = 'background-color: #2c3034'
    }
    showTable()
    playSound()
  })
}
