
    let foto = ["images/memory/foto1.jpg", "images/memory/foto2.jpg", "images/memory/foto3.jpg", "images/memory/foto4.jpg", "images/memory/foto5.jpg", "images/memory/foto6.jpg", "images/memory/foto7.jpg", "images/memory/foto8.jpg", "images/memory/foto9.jpg", "images/memory/foto10.jpg", "images/memory/foto11.jpg", "images/memory/foto12.jpg", "images/memory/foto13.jpg", "images/memory/foto14.jpg", "images/memory/foto15.jpg", "images/memory/foto16.jpg", "images/memory/foto17.jpg", "images/memory/foto18.jpg"];
    
    let e = [];
    function begin(aantal, kansen, level) {

        gehaald();
        
        document.getElementById("memcontainer").style.backgroundColor = "gray";
        kans = [];
        aantalk = [];
        levels = [];
        kansen = kansen;
        g = 0;
        k = 0;
        e = [];
        Array.prototype.filter.call(kaarten, function(kaarten){
        kaarten.classList.remove('disabled');
        });
        let nummer = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17];
        /*RANDOM NUMMER GENERATOR BEGIN*/
        for(let i = nummer.length - 1; i > 0; i--){
            const j = Math.floor(Math.random() * i)
            const temp = nummer[i]
            nummer[i] = nummer[j]
            nummer[j] = temp
        }
        /*RANDOM NUMMER GENERATOR EIND*/
        let paras = document.getElementsByClassName('kaart');
        while(paras[0]) {
            paras[0].parentNode.removeChild(paras[0]);
        }
        /*ARRAY OP LENGTE BRENGEN BEGIN*/
        if (aantal == 16) {
            nummer = nummer.slice(0,aantal/2)
        }
        let b=[];
            for(var i = 0; i< nummer.length;++i){
                b.push(nummer[i]);
                b.push(nummer[i]);
            }
        nummer=b;
        /*ARRAY OP LENGTE BRENGEN EIND*/
        /*RANDOM NUMMER GENERATOR BEGIN*/
        for(let i = nummer.length - 1; i > 0; i--){
            const j = Math.floor(Math.random() * i)
            const temp = nummer[i]
            nummer[i] = nummer[j]
            nummer[j] = temp
        }
        /*RANDOM NUMMER GENERATOR EIND*/
        document.getElementById("memtitel").innerHTML = `level ${level}`;
        /*KAART MAKEN BEGIN*/
        let y=0;
        for(x = 0; x < aantal; x++) {
            y++;
            let kaart = document.createElement("div");
            let img = document.createElement("img");
            img.src = "";
            kaart.appendChild(img);
            document.getElementById("memcontainer").appendChild(kaart);
            kaart.setAttribute("class", "kaart");
            kaart.setAttribute("draggable","false")
            img.setAttribute("draggable","false")
            img.setAttribute("class", "img hidden");
            img.src = foto[nummer[x]];

            kaart.addEventListener("click", function(x) {
                keuze(x);
            });
            
            if (aantal == 16) {
                const aantal = 16;
                let k = document.getElementsByClassName("kaart");
                let s = document.getElementsByClassName("img");
                let i;
                for (i = 0; i < k.length; i++) {
                    k[i].style.width = "165px";
                    k[i].style.height = "165px";
                    s[i].style.width = "165px";
                    s[i].style.height = "165px";
                } 
            } else if (aantal == 36){
                let k = document.getElementsByClassName("kaart");
                let s = document.getElementsByClassName("img");
                let i;
                for (i = 0; i < k.length; i++) {
                    k[i].style.width = "100px";
                    k[i].style.height = "100px";
                    s[i].style.width = "100px";
                    s[i].style.height = "100px";
                }
            } 
            
            memcontainer.appendChild(kaart);
        }
        /*KAART MAKEN EIND*/


    }
    
    let img = document.getElementsByClassName("img");
    let kaarten = document.getElementsByClassName("kaart");
    let keuzenar = []
    let keuzen = [];
    let len = 0;
    let cooldown = 2000;
    let g = 0;
    function keuze(x) {
        if (len <= 1){
            keuzen.push(x.target)
            keuzenar.push(x.target.src);
            len = keuzenar.length;
            x.target.classList.remove("hidden");
            x.target.parentElement.classList.add("disabled");
            
        

            if (len == 2) {
                
                
            
                disable();
                if (keuzenar[0] == keuzenar[1]) {
                    
                    keuzen[0].classList.add("goed");
                    keuzen[1].classList.add("goed");
                    keuzen = [];
                    keuzenar = [];
                    len = 0;
                    enable();
                } else {
                    g++
                    

                    setTimeout(function() {

                        enable();
                        keuzen[0].classList.add("hidden");
                        keuzen[1].classList.add("hidden"); 
                        
                        keuzen = [];
                        keuzenar = []; 
                        len = 0;
                    }, cooldown);
                    
                    
                }
                check(0,0,g)
            }
        }

        
}



//disable cards temporarily
function disable(){
    Array.prototype.filter.call(kaarten, function(kaarten){
        kaarten.classList.add('disabled');
    });
    
}

//enable cards and disable matched cards
let goed = document.getElementsByClassName("goed");
function enable(){
Array.prototype.filter.call(kaarten, function(kaarten){
    kaarten.classList.remove('disabled');
    for(var i = 0; i < goed.length; i++){
        goed[i].parentElement.classList.add("disabled");
    }
});
}
function level(level) {
    maakCookie("levels",level,140);
}   

        let kans = [];
        let aantalk = [];
        let levels = []
        function check(aantal, kansen, g, level) {
                    aantalk.push(aantal);
                    levels.push(level);
                    kans.push(kansen);
                    over = (kans[0]-g);
                    document.getElementById("kansen").innerHTML = "je hebt nog " + over + " kansen over.";
                    goedd = goed.length;
                    if ((goedd) == aantalk[0]){
                        document.getElementById("memcontainer").style.backgroundColor = "green";
                        maakCookie("level: "+ levels[0],levels[0],14);
                        gehaald();
                    }
                    if (g >= kans[0]){
                        document.getElementById("memcontainer").style.backgroundColor = "red";
                        disable();
                        setTimeout(function(){ disable(); }, cooldown+1);
                        Array.prototype.filter.call(img, function(img){
                            img.classList.remove('hidden');
                        });
                        setTimeout(function(){ Array.prototype.filter.call(img, function(img){
                            img.classList.remove('hidden');
                        }); }, cooldown+1);
                    }
                    

                }
function gehaald() {
    for (i = 0; i <= 6; i++) {
        let dezeCookie = leesCookie("level: "+ i);
        if (dezeCookie == null || dezeCookie == 'niet-gevonden') {continue;}
        if (dezeCookie == 1) {
                document.getElementById("twee").classList.remove("rip");
        }
        if (dezeCookie == 2) {
                document.getElementById("drie").classList.remove("rip");
        }
        if (dezeCookie == 3) {
                document.getElementById("vier").classList.remove("rip");
        }
        if (dezeCookie == 4) {
                document.getElementById("vijf").classList.remove("rip");
        }
        if (dezeCookie == 5) {
                document.getElementById("vijf").classList.remove("rip");
        }
        /*switch (dezeCookie) {
            case 1:
                console.log("level 1 gehaald")
                document.getElementById("twee").classList.remove("rip");
            case 2:
                document.getElementById("drie").classList.remove("rip");
            case 3:
                document.getElementById("vier").classList.remove("rip");
            case 4:
                document.getElementById("vijf").classList.remove("rip");
            case 5:
                document.getElementById("zes").classList.remove("rip");
        }*/
    }
}
function reset() {
    let vraag = confirm("--WAARSCHUWING-- \r\n Weet je zeker dat je alles wilt resetten?\r\nDit zal al je levels resetten en dit kan niet ontdaan worden.");
    if (vraag == true) {
        let i = 0;
        for (i = 0; i <= 6; i++) {
        verwijderCookie("level: "+ i, i);
        
        } 
        location.reload();
    }
}