/* global $ globalOpportunities */
/* eslint-disable no-unused-vars, no-global-assign */
var countries = ['1st Source Bank',
  'Academy Bank',
  'AccessFCU',
  'AEROQUIP CREDIT UNION',
  'Affinity Plus Fed Cred Union',
  'Afinity Federal Credit Union',
  'Alaska USA FEDCU',
  'Alma Bank',
  'AmalgamatedBank',
  'AmarilloNationalBank',
  'Amegy Bank of Texas',
  'AmericanNationalBankOfMinessota',
  'ARBOR BANK',
  'Arthur State Bank',
  'Arvest Bank',
  'Associated Bank',
  'AustinTelcoFCU',
  'Axiom Bank',
  'Bank of America',
  'Bank Of Bartlet',
  'Bank of bridge',
  'Bank of Colorado',
  'BANK OF FEATHER RIVER',
  'Bank of Hawaii',
  'Bank of Hope',
  'Bank of Idaho',
  'Bank Of Indianapolis',
  'Bank of Millbrook',
  'Bank of New England',
  'Bank of Ozarks',
  'Bank of Pensacola',
  'Bank of the West',
  'Bankcorp South Bank',
  'BankOfNevada',
  'BankOfSouthernCalifornia',
  'BankOfTennessee',
  'Banner Bank',
  'BB&T Bank',
  'BBVA Compass',
  'Beacon Bank',
  'BENEFICIAL BANK',
  'BMO Harris',
  'BMT',
  'BNB',
  'BuseyBank',
  'Cadence Bank',
  'CaliforniaBank',
  'CAMBRIDGE SAVINGS BANK',
  'Camden National BANK',
  'Cap Com Credit Union',
  'Capital One Bank',
  'Carver Fed',
  'CathayBank',
  'CBB',
  'CCB',
  'Centennial Bank',
  'CENTRIC BANK',
  'Chase',
  'Chemical Bank',
  'Chino Commercial Bank',
  'Citi Bank',
  'Citi National Bank',
  'Citizen Bank',
  'Citizen First Bank',
  'Citizen National Bank',
  'CITIZEN STATE BANK',
  'CitizensDepositBank',
  'CitizensUnionBank',
  'CollegiatePeaks',
  'Comerica Bank',
  'Community Bank',
  'Community National Bank',
  'ConnectOneBank',
  'Country Bank',
  'DartBank',
  'DEDHAM SAVINGS',
  'Delta Community Credit Union',
  'DIRECTIONS CREDIT UNION',
  'DortFCU',
  'EAST CAMBRIDGE SAVINGS',
  'East West Bank',
  'Eastern bank',
  'Encore Bank',
  'EVANS BANK',
  'Falcon Bank',
  'FarmingtonBank',
  'Fidelity Bank',
  'FidelityBank(OklahomaFidelity)',
  'Fifth Third Bank',
  'First Bank',
  'First Bank & Trust',
  'First Citizen Bank',
  'First Commerce Bank',
  'First Convenience Bank (a division of First National Bank of Texas)',
  'First Federal Bank',
  'FIRST KNOX NATIONAL',
  'First National Bank',
  'First National Bank',
  'First National Bank Altavista',
  'First National Bank of Alaska',
  'First Northern Bank',
  'First republic bank',
  'FIRST TEXAS BANK',
  'FIRST VOLUNTEER BANK',
  'FirstCitizensFCU',
  'FirstCommonwealth',
  'FirstGeneralBank',
  'FirstHawaiianBank',
  'FirstNationalBank_MarketStreet',
  'FirstSecurityTrustAndSavingsBank',
  'FLORENCE BANK',
  'FMB Bank',
  'FREEDOM BANK OF SOUTHERN MO',
  'Freemont Bank',
  'Frost Bank',
  'Glacier Family Of Banks',
  'GrandSavingBank',
  'GREAT SOUTHERN',
  'GREAT WESTERN',
  'GreenBank',
  'Guaranty Bank',
  'GUILFORD SAVINGS BANK',
  'GULF COAST BANK',
  'HabBank',
  'HamiltonStateBank',
  'Hancock Bank',
  'Hanmi Bank',
  'HappyStateBank&TrustCo',
  'HERITAGE BANK',
  'HomeTrustBank',
  'Huntington',
  'IBC Bank',
  'IBERIA BANK',
  'Independent Bank',
  'Investors Bank',
  'ItascaBankAndTrust',
  'JeffBank',
  'Kenba Financial Credit Union',
  'KENTUCKY FARMERS BANK',
  'Key Bank',
  'Kleberg Bank',
  'Lakeland Bank',
  'LISTERHILL CREDIT UNION',
  'LONE STAR CAPITAL BANK',
  'LUZERNE BANK',
  'M&T Bank',
  'MainSource',
  'Martha’s Vineyard Bank',
  'MauchChunkTrustCompany',
  'MB FINANCIAL BANK',
  'MEADOWS BANK',
  'MembersFirstCUofFlorida',
  'MERRIL LYNCH BOA',
  'Metropolitan',
  'Michigan First Credit Union',
  'Mountain America Credit Union',
  'Nantahala Bank',
  'National Bank of Arizona',
  'NationalUnited',
  'NavyFedCreditUnionBusiness',
  'NBT Bank',
  'NEVADA STATE BANK',
  'Newport Bank',
  'Nicolet National Bank',
  'NOAH BANK',
  'NORTH EAST COMMUNITY BANK',
  'NorthFieldBank',
  'NorthrimBank',
  'Northwest Bank',
  'NUMERICA CREDIT UNION',
  'Ocean Bank',
  'Ocean First Bank',
  'OCULINA BANK',
  'OKLAHOMA CENTRAL',
  'OLD LINE BANK',
  'Old National Bank',
  'OpusBank',
  'ORANGE COUNTY\'S CREDIT UNION',
  'OrangeBankTrust',
  'PACIFIC CITY BANK',
  'Pacific Premier Bank',
  'Parkway Bank And Trust Company',
  'Patterson state bank',
  'Pegasus bank',
  'People’s United Bank',
  'Pinnacle Bank',
  'Plains Capital Bank',
  'PNC',
  'Prosperity Bank',
  'ProvidentBank',
  'PSB BANK',
  'RBFCU',
  'Reading Cooperative Bank',
  'Redstone Bank',
  'Regions Bank',
  'RepublicBank',
  'Resanant Bank',
  'RIVER BANK & TRUST',
  'RiverWindBank',
  'Rocklands Trust',
  'RoyalBusinessBank',
  'RSNB BANK',
  'Salisbury Bank',
  'Sandy Spring Bank',
  'Santander Bank',
  'Shore Community Bank',
  'SIlicon Valley Bank',
  'Simmons Bank',
  'South Louisiana Bank',
  'South Shore Bank',
  'SOUTH TRUST BANK',
  'South West Capital Bank',
  'Southern BanCorp',
  'Southwest Missouri Bank',
  'Star Financial Bank',
  'State Bank of Southern Utah',
  'State Bank Of Taunton',
  'Stock Yards Bank and Trust',
  'Suncoast Credit Union',
  'Suntrust',
  'Synovus Bank',
  'TCF Bank',
  'TD Bank',
  'Texas Regional Bank',
  'Texel Credit Union',
  'The Bank Of Tampa',
  'The Union Bank Co',
  'TheCitizensBank',
  'TheMiddlefieldBankingCompany',
  'ThirdCoastBank',
  'Time Federal Savings',
  'TrueCoreFCU',
  'Trulient Fed Cred Union',
  'Trustco Bank',
  'Trustmark National Bank',
  'Two River Comunity',
  'TX Association',
  'UmpquaBank',
  'Union Bank',
  'United Bank',
  'United Community Bank',
  'UnitedSouthernBank',
  'University Fed Cred',
  'UniversityFederalCreditUnion(AustinTexas)',
  'UNIVEST BANK AND TRUST',
  'US Bank',
  'Valiance Bank',
  'Valley National Bank',
  'VantageWestCU',
  'Vectera Bank',
  'Verify Credit Union',
  'Village Bank',
  'Washington 1st Bank',
  'Washington Business Bank',
  'WCCU Credit Union',
  'Webster Bank',
  'Wells Fargo',
  'WeokieFCU',
  'Westconsin Credit Union',
  'Whitaker Bank',
  'Winter Hill Bank',
  'Woodforest National Bank',
  'Worthington National Bank',
  'Wright Patt Credit Union',
  'Xenith Bank',
  'Y-12 Federal Credit Union',
  'Zion Bank',
  'Texas Community Bank',
  'Somerset Trust Company',
  'Security National Bank',
  'RELYANCE BANK',
  'RIVERVIEW COMMUNITY BANK',
  'BEACH COMMUNITY BANK',
  'PROSPECT BANK',
  'PRIME SOUTH BANK']

function showFiles (oppoId, stageName) {
  $('#documentsModal').modal()
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

function autocomplete (inp, arr) {
  /* the autocomplete function takes two arguments,
  the text field element and an array of possible autocompleted values: */
  var currentFocus
  /* execute a function when someone writes in the text field: */
  inp.addEventListener('input', function (e) {
    var a; var b; var i; var val = this.value
    /* close any already open lists of autocompleted values */
    closeAllLists()
    if (!val) { return false }
    currentFocus = -1
    /* create a DIV element that will contain the items (values): */
    a = document.createElement('DIV')
    a.setAttribute('id', this.id + 'autocomplete-list')
    a.setAttribute('class', 'autocomplete-items')
    /* append the DIV element as a child of the autocomplete container: */
    this.parentNode.appendChild(a)
    /* for each item in the array... */
    for (i = 0; i < arr.length; i++) {
      /* check if the item starts with the same letters as the text field value: */
      if (arr[i].substr(0, val.length).toUpperCase() === val.toUpperCase()) {
        /* create a DIV element for each matching element: */
        b = document.createElement('DIV')
        /* make the matching letters bold: */
        b.innerHTML = '<strong>' + arr[i].substr(0, val.length) + '</strong>'
        b.innerHTML += arr[i].substr(val.length)
        /* insert a input field that will hold the current array item's value: */
        b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>"
        /* execute a function when someone clicks on the item value (DIV element): */
        b.addEventListener('click', function (e) {
          /* insert the value for the autocomplete text field: */
          inp.value = this.getElementsByTagName('input')[0].value
          /* close the list of autocompleted values,
          (or any other open lists of autocompleted values: */
          closeAllLists()
        })
        a.appendChild(b)
      }
    }
  })
  /* execute a function presses a key on the keyboard: */
  inp.addEventListener('keydown', function (e) {
    var x = document.getElementById(this.id + 'autocomplete-list')
    if (x) x = x.getElementsByTagName('div')
    if (e.keyCode === 40) {
      /* If the arrow DOWN key is pressed,
      increase the currentFocus variable: */
      currentFocus++
      /* and and make the current item more visible: */
      addActive(x)
    } else if (e.keyCode === 38) { // up
      /* If the arrow UP key is pressed,
      decrease the currentFocus variable: */
      currentFocus--
      /* and and make the current item more visible: */
      addActive(x)
    } else if (e.keyCode === 13) {
      /* If the ENTER key is pressed, prevent the form from being submitted, */
      e.preventDefault()
      if (currentFocus > -1) {
        /* and simulate a click on the "active" item: */
        if (x) x[currentFocus].click()
      }
    }
  })
  function addActive (x) {
    /* a function to classify an item as "active": */
    if (!x) return false
    /* start by removing the "active" class on all items: */
    removeActive(x)
    if (currentFocus >= x.length) currentFocus = 0
    if (currentFocus < 0) currentFocus = (x.length - 1)
    /* add class "autocomplete-active": */
    x[currentFocus].classList.add('autocomplete-active')
  }
  function removeActive (x) {
    /* a function to remove the "active" class from all autocomplete items: */
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove('autocomplete-active')
    }
  }
  function closeAllLists (elmnt) {
    /* close all autocomplete lists in the document,
    except the one passed as an argument: */
    var x = document.getElementsByClassName('autocomplete-items')
    for (var i = 0; i < x.length; i++) {
      if (elmnt !== x[i] && elmnt !== inp) {
        x[i].parentNode.removeChild(x[i])
      }
    }
  }
  /* execute a function when someone clicks in the document: */
  document.addEventListener('click', function (e) {
    closeAllLists(e.target)
  })
}

function sendBankFolder () {
  var bankFolderName = $('#myInput').val()
  console.log(bankFolderName)
  window.fetch('/keywords', {
    method: 'POST',
    body: JSON.stringify({
      'folder': bankFolderName
    })
  }).then(function (response) {
    if (response.status === 200) {
      //   loadUpdatedData(mca)
    } else {
      window.alert('status: ' + response.status + ' ' + response.statusText)
    }
    console.log(response.statusText)
  }).catch(window.alert)
}
