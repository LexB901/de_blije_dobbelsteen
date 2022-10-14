let input = document.getElementById('guess'); // the input box
let button = document.getElementById('button'); // the button
let guess;
let punten = 0;
punten = parseInt(leesCookie("lpunten"));
if (isNaN(punten)) {
  punten = 0;
}

document.getElementById("punten").innerHTML = `Aantal punten: ${punten}`
function resetp() {
    verwijderCookie("punten");
    location.reload();
}
// change css class
let changeClass = function(cng, old, newClass){
  cng.className = cng.className.replace(old, newClass);
}

// game loop
let gameloop = function(){
  // pick a random word
  let rand = quicklist[Math.floor(Math.random() * quicklist.length)].toUpperCase();
  let hasDuplicates = (/([a-zA-Z]).*?\1/).test(rand); // if multiple insances of a letter in the word
  
  let pressn = 1; // turn number
  
  // get all indexes of a given value in an array
  let getAllIndexes = function(arr, val) {
    let indexes = [], i;
    for(i = 0; i < arr.length; i++)
        if (arr[i] === val)
            indexes.push(i);
    return indexes;
  }

  // give first letter
    document.getElementById("row1").firstElementChild.innerHTML = rand[0];
  
  // guess event
  input.onkeypress = function(event) {
    if (event.key == "Enter" || event.keyCode == 13) {
      document.getElementById('smallMsg').innerHTML = "Rood = goede plek, Geel = verkeerde plek"; // reset message
      guess = input.value.toUpperCase();
      
      let current = "row" + pressn;
      // current row
      let childDivs = document.getElementById(current).getElementsByTagName('div');
      let c = 0; // correct count
      
      // If not right number of letters
      if(guess.length !== 5){
        document.getElementById('smallMsg').innerHTML = "Gok moet 5 letters lang zijn";
        if(pressn===5){
          end("Sorry, je hebt het niet geraden", "Correcte woord: " + rand);
        }
        pressn++;
        document.getElementById(current).firstElementChild.innerHTML=rand[0];
        return; // move down
      }

      // check for correctness
      for(let i=0; i<childDivs.length; i++) {
        childDivs[i].innerHTML = guess[i];
        
        // if letter match in right place
        if(guess[i] == rand[i]){
          changeClass(childDivs[i], 'default', 'correct');
          c++;
        } 
        // if exists but is in the wrong place
        
        input.value = ""; // clear input box
        
        if(c===5) { // if they have all the correct letters
          punten++
          maakCookie('lpunten',punten,365);
          document.getElementById("punten").innerHTML = `Punten: ${punten}`
          end("Gefeliciteerd, je hebt gewonnen!", "Opnieuw spelen?");
          
        } //if
        else if (pressn === 6){ // if they're out of tries
          end("Sorry, je hebt het niet geraden", "Correcte woord: " + rand);
        } //else if
      } //for (check for correctness loop)
      
      // check for wrong place
      for(let i=0; i<childDivs.length; i++) {
        if(rand.indexOf(guess[i])!=-1){
          if(hasDuplicates === false && childDivs[rand.indexOf(guess[i])].className != "square correct"){
            changeClass(childDivs[i], 'default', 'wrongplace');
          }
          // if there are duplicate letters
          else if(hasDuplicates === true){
            let ind = getAllIndexes(rand, guess[i]);
            if (ind.length > 1){
              for (let j=0; j<ind.length; j++){
                if(childDivs[ind[j]].className != "square correct" && childDivs[i].className != "square wrongplace"){
                  changeClass(childDivs[i], 'default', 'wrongplace');
                } //if
              } //for
            } //if
            else if (childDivs[rand.indexOf(guess[i])].className != "square correct"){
              changeClass(childDivs[i], 'default', 'wrongplace');
            } //else if
          } //else if(hasDuplicates === true)
        } //else if
      }

      pressn++; // inc number of guesses
    } //if (key = 'enter')
  } //input 
} //gameloop

// endgame
let end = function(msg, smallmsg){
  document.getElementById('msgBox').innerHTML = msg;
  document.getElementById('smallMsg').innerHTML = smallmsg;
  changeClass(button, "invisible", "visible");
  document.getElementById('guess').readOnly = true;
}

// reset
let playagain = function(){
  document.getElementById('msgBox').innerHTML="Raad het woord!"; // main message
  document.getElementById('smallMsg').innerHTML = "Rood = goede plek, Geel = verkeerde plek"; // small message
  document.getElementById('guess').readOnly = false;
  changeClass(button, "visible", "invisible");
  
  // clean boxes
  for(let i=1;i<6;i++){
    let resets = document.getElementById('row'+i).getElementsByTagName('div');
    for(let j=0;j<6;j++){
      resets[j].innerHTML="";
      if(resets[j].className == "square correct" || resets[j].className == "square wrongplace"){
        changeClass(resets[j], "correct", "default");
        changeClass(resets[j], "wrongplace", "default");
      } //if
    } //for
  } //for
  // restart the loop
  gameloop();
};

// ~500+ common 5-letter words
let quicklist = ['appel',
'aldus',
'afwas',
'aftel',
'aarde',
'armen',
'actie',
'apart',
'adres',
'avond',
'aders',
'agree',
'alarm',
'atoom',
'boten',
'balen',
'beter',
'bomen',
'boren',
'boven',
'boxen',
'brood',
'broek',
'brand',
'breed',
'benen',
'beeld',
'brief',
'beten',
'basis',
'blauw',
'beren',
'buren',
'banen',
'bloed',
'broer',
'blond',
'boter',
'beleg',
'breng',
'baken',
'beker',
'blind',
'bezig',
'beden',
'beken',
'bezem',
'baard',
'bidet',
'breuk',
'bloem',
'conus',
'cello',
'creme',
'cloud',
'cacao',
'cadet',
'cavia',
'ceder',
'combi',
'china',
'clown',
'draai',
'deden',
'dalen',
'derde',
'delen',
'dwaas',
'daden',
'dader',
'dames',
'diner',
'datum',
'dozen',
'dreun',
'duits',
'dagen',
'deren',
'dwerg',
'dwaal',
'dwing',
'druil',
'droog',
'draad',
'dweil',
'drank',
'duren',
'dwars',
'drugs',
'daten',
'daler',
'doorn',
'disco',
'degen',
'droom',
'dient',
'drone',
'dadel',
'duwen',
'druif',
'deken',
'deler',
'draaf',
'druis',
'elven',
'eigen',
'enger',
'engel',
'elder',
'enkel',
'effen',
'email',
'egaal',
'fiets',
'friet',
'files',
'forel',
'films',
'feest',
'fruit',
'falen',
'flora',
'fauna',
'feeen',
'freak',
'forum',
'fusie',
'geven',
'gaven',
'groen',
'graai',
'getal',
'grens',
'grond',
'groef',
'graal',
'gewei',
'games',
'grote',
'groet',
'garen',
'gebak',
'graag',
'genre',
'glans',
'geluk',
'geeuw',
'graaf',
'horen',
'heren',
'halen',
'hagel',
'haren',
'helen',
'harde',
'hemel',
'hoofd',
'huren',
'hamer',
'haken',
'heden',
'hotel',
'hobby',
'heler',
'hoger',
'ieder',
'index',
'immer',
'icoon',
'inlog',
'inzet',
'innig',
'jovel',
'jicht',
'jaren',
'jabot',
'jacht',
'jaden',
'jagen',
'jager',
'japon',
'jarig',
'jawel',
'jeans',
'jemig',
'jeugd',
'joint',
'jonas',
'joule',
'koken',
'kreet',
'koker',
'kerst',
'kegel',
'koude',
'kader',
'krent',
'kamer',
'kaars',
'kaart',
'kraan',
'krant',
'keren',
'kruid',
'kerel',
'kubus',
'kraal',
'kleur',
'kroon',
'klein',
'korst',
'klopt',
'kabel',
'kutje',
'kunst',
'kopje',
'krans',
'klimt',
'kater',
'klink',
'kudde',
'kruis',
'kolen',
'lopen',
'laten',
'lepel',
'links',
'laden',
'leven',
'lezen',
'lucht',
'lenen',
'laser',
'lente',
'links',
'licht',
'lader',
'leder',
'lunch',
'lijst',
'leger',
'leden',
'legen',
'lagen',
'lezer',
'lever',
'lingo',
'loper',
'luier',
'lager',
'leeuw',
'maand',
'malen',
'maken',
'media',
'meder',
'motor',
'maten',
'markt',
'mazen',
'molen',
'meest',
'meren',
'model',
'meden',
'maden',
'macht',
'meeuw',
'mager',
'magen',
'maren',
'manen',
'maagd',
'noord',
'nieuw',
'negen',
'namen',
'neven',
'nodig',
'naden',
'neder',
'nemen',
'onder',
'optel',
'ovaal',
'ovale',
'onwel',
'optie',
'orden',
'oppas',
'ouder',
'ophef',
'oases',
'ogend',
'omzet',
'palen',
'plein',
'pegel',
'paars',
'prijs',
'piano',
'pixel',
'paden',
'pasta',
'pizza',
'poten',
'paard',
'puber',
'pauze',
'preek',
'polis',
'pater',
'proef',
'panda',
'penis',
'prins',
'pluto',
'polen',
'plint',
'prima',
'patat',
'quota',
'quant',
'quark',
'queue',
'quilt',
'quote',
'robot',
'reken',
'raden',
'regen',
'radio',
'rente',
'regio',
'rugby',
'reden',
'roken',
'ruzie',
'ramen',
'ruist',
'riool',
'regel',
'radar',
'racen',
'roman',
'races',
'rokje',
'razen',
'roede',
'staan',
'staal',
'speel',
'stoel',
'steeg',
'stook',
'steek',
'schep',
'spijs',
'stoep',
'shirt',
'samen',
'sites',
'sport',
'spalk',
'sjaal',
'storm',
'staat',
'steun',
'strak',
'serie',
'shows',
'schat',
'snoep',
'sfeer',
'smeer',
'speer',
'scene',
'speld',
'smeed',
'smaak',
'super',
'stand',
'steer',
'smelt',
'sedan',
'skier',
'sluis',
'sneer',
'steel',
'schap',
'sorry',
'snaar',
'spuit',
'truck',
'terug',
'typen',
'talen',
'taboe',
'tegel',
'taart',
'tafel',
'trouw',
'teken',
'teren',
'taken',
'treur',
'tenen',
'titel',
'thuis',
'tiara',
'teder',
'toets',
'tabak',
'trein',
'tarwe',
'telen',
'uiten',
'uilig',
'uitje',
'uiver',
'ultra',
'uniek',
'uppie',
'uraan',
'uiers',
'velen',
'vloer',
'video',
'varen',
'vegen',
'veren',
'vader',
'vaten',
'vrouw',
'vlees',
'vogel',
'vroeg',
'vezel',
'veins',
'vorst',
'veder',
'vanaf',
'vieze',
'veger',
'villa',
'veler',
'vrede',
'vries',
'vraag',
'woord',
'wagen',
'wonen',
'waren',
'warme',
'weten',
'water',
'weren',
'wazig',
'wegen',
'weven',
'wezen',
'weken',
'wraak',
'wilde',
'wreed',
'wrede',
'wenst',
'woest',
'yacht',
'yucca',
'zwaar',
'zware',
'zesde',
'zagen',
'zalig',
'zomer',
'zeden',
'zwart',
'zeven',
'zicht',
'zadel',
'zweet',
'zenuw',
'zweer',
'zweef',
'zaden',
'zaken',
'zeker',
'zever',
'zeeen'];

// start loop
gameloop();
