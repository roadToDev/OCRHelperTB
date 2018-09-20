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
      console.log(myJson)
    })
}

function showTable (opportunities) {
  $(document).ready(function(){

    $('#1').append('<td id="2">2</td>');

  });

}

parseJsonData('data.json')
