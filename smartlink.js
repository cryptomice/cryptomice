/* SMART LINK ENGINE (GLOBAL) */

const SMART_LINKS = [
"https://omg10.com/4/10987288",
"https://omg10.com/4/10987286",
"https://omg10.com/4/10987290",
"https://omg10.com/4/10987285",
"https://omg10.com/4/10987293",
"https://omg10.com/4/10987291",
"https://omg10.com/4/10987289",
"https://omg10.com/4/10987284",
"https://omg10.com/4/10987292",
"https://omg10.com/4/10987287",
"https://www.profitablecpmratenetwork.com/s8k5ehp1?key=45d4890534ac4bbaeb9f23b2da7ae0c4",
"https://www.profitablecpmratenetwork.com/ix64kcqv?key=513b6a1c69d3509f2f492583b4ca2e4f",
"https://www.profitablecpmratenetwork.com/mh7etds8ti?key=e5d712029b02ef37b39eaa5a23b6d2cb",
"https://www.profitablecpmratenetwork.com/p5hphnf9fc?key=269305bebed62f9337be731bb78da522",
"https://www.profitablecpmratenetwork.com/eturs0ae8?key=efefb3c0c0b67d21b77a40bb5584efc6",
"https://www.profitablecpmratenetwork.com/zh4amdhffs?key=2e6acaf3fa289c0903bebf5d0a32ccdd",
"https://www.profitablecpmratenetwork.com/m5gndkqs2?key=377462ac4a412fbfd04b5918482fa8ae",
"https://www.profitablecpmratenetwork.com/t5vyxa92na?key=b719961a22436d3955e425b991b75a6b",
"https://www.profitablecpmratenetwork.com/ubwvyy95m?key=32feb6352dabaff4fedd9f7853c697f3",
"https://www.profitablecpmratenetwork.com/mn25weh3?key=6ee72c09a76e4e690de3ab57af8977d0",
"https://wrathful-piano.com/VFOZNk",
"https://wrathful-piano.com/rIiayv",
"https://thoroughgear.com/jVLBPd",
"https://thoroughgear.com/TpOLka",
"https://wrathful-piano.com/398aSn",
"https://wrathful-piano.com/ibU5KJ",
"https://thoroughgear.com/40mbTS",
"https://thoroughgear.com/FSas0E",
"https://wrathful-piano.com/fJDG7O",
"https://wrathful-piano.com/i1Tn5O"
];

/* avoid immediate repeats */
let lastIndex = -1;

function getSmartLink(){
let i;
do {
i = Math.floor(Math.random() * SMART_LINKS.length);
} while(i === lastIndex);
lastIndex = i;
return SMART_LINKS[i];
}

/* GLOBAL NAVIGATION (SAFE CORE) */
window.smartNavigate = function(page){

const unlock = localStorage.getItem("smartlink_unlock");
const now = Date.now();

/* if unlocked → direct navigation */
if(unlock && now < parseInt(unlock)){
window.location.href = page;
return;
}

/* store destination */
localStorage.setItem("target_page", page);
localStorage.setItem("awaiting_return", "yes");

/* open smart link */
window.open(getSmartLink(), "_blank");

alert("Return to continue...");
};

/* RETURN DETECTOR (GLOBAL) */
window.addEventListener("focus", () => {

const waiting = localStorage.getItem("awaiting_return");

if(waiting === "yes"){

localStorage.removeItem("awaiting_return");

const expire = Date.now() + (10 * 60 * 1000);
localStorage.setItem("smartlink_unlock", expire);

const target = localStorage.getItem("target_page") || "index.html";

window.location.href = target;
}

});
