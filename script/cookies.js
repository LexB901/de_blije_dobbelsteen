// fuction: maakCookie
// parameters: naam, waarde, dagen
// doel: een cookie maken
function maakCookie(naam, waarde, dagen) {
    if (dagen) {
        let datum = new Date();
        datum.setTime(datum.getTime() + (dagen * 24 * 60 * 60 *1000));
        var verloopdatum = '; expires= ' + datum.toGMTString();
    } else {
        verloopdatum = '';
    }
    document.cookie = naam + '=' + waarde + verloopdatum + ';path=/'
}
function leesCookie(naam) {
    let naamCookie = naam + '=';
    let cookieArray = document.cookie.split(';');
    for (let i = 0; i < cookieArray.length; i++) {
        let dezeCookie = cookieArray[i];
        dezeCookie = dezeCookie.trim();
        if (dezeCookie.indexOf(naamCookie) == 0) {
            return dezeCookie.substring(naamCookie.length, dezeCookie.length);
        }
    }
    return null;
}

function verwijderCookie(naam, waarde) {
    let nu = new Date();
    let datum = new Date(nu.setDate(nu.getDate() - 10));
    let wegdatum = '; expires= ' + datum.toGMTString();
    document.cookie = naam + '=' + waarde + wegdatum + ';path=/'}

function checkCookieExists(cookieName){
    let cookies = document.cookie.split(';'); //returns lots of these: key=value
    let toCheckCookie = cookieName; //checks if this cookie exists
      
    cookies.forEach(function( cookie ){ //foreach cookie
        let key = cookie.split('=')[0]; //the key cookie
      
        if (key.toLowerCase() === toCheckCookie) //if the current key is the toCheckCookie
        {
        return true;
        }
    });
    return true;
      
}

    