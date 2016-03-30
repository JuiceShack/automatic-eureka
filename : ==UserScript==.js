

var init = parseFloat((Math.floor(document.getElementById('goCoins').innerHTML) / Math.pow(2, 8)).toFixed(2)); 
var delay = 100; 
var maxBetValue = parseFloat((Math.floor(document.getElementById('goCoins').innerHTML) / 2).toFixed(2)); 
var start = init;
var btRoll = document.getElementById("roll");
var tbBet = document.getElementById("bet");
var btOverUnder = document.getElementById("oddsOverUnder");
var rollUnder;
var loop = true;
var firstTime = true;


function checkOverUnder() {
    if ((btOverUnder.value).indexOf("<") != "0") {
        btOverUnder.click();
    }
rollUnder = parseInt((btOverUnder.value).replace(/[^\d.]/g,''));
}


var menu = document.createElement('div');
menu.innerHTML = '' +
    '<div class="form-group">' +
    '<div class="text-center col-sm-6 col-sm-offset-3">' +
    '<p><a href="https://github.com/ADAMPOKE111/CSGODiceGame-Automated">CSGODiceGame.com Automated <small>by Adam^</small></a></p>' +
    '<input id="rollscript" type="button" value="| Start the Script |" onClick="startscript()">' +
    '<input id="rollscript" type="button" value="| End the Script |" onClick="endscript()">' +
    '<input id="rollscript" type="button" value="| Change Base Bet |" onClick="changebase()">' +
    '<input id="rollscript" type="button" value="| Change Max Bet |" onClick="changemax()">' +
    '<input id="rollscript" type="button" value="| Change Delay |" onClick="changedelay()">' +
    '<input id="rollscript" type="button" value="| Refresh Values |" onClick="checkOverUnder()">' +
    '</div>' +
    '</div>';
document.getElementsByClassName('form-horizontal')[0].appendChild(menu);

function startscript() {
    alert("Script started!\n - Base bet: " + init + "\n - Max bet: " + maxBetValue + "\n - Delay (ms): " + delay);
    loop = true;
    firstTime = false;
    checkOverUnder();

    function roll() {
        if (loop === true) {
            tbBet.value = start;
            btRoll.click();
            refreshIntervalId = setInterval(roll2, delay);
        }
    }

    function roll2() {
        var thestring = document.getElementById('roll').value;
        var thenumber = retnum(thestring);
        if (thenumber < rollUnder) {
            start = init;
        }
        if (thenumber > rollUnder) {
            start = start * 2;
        }
        if (start > maxBetValue) {
            start = init;
        }
        btRoll.click();
        clearInterval(refreshIntervalId);
        roll();
    }

    function retnum(str) {
        var num = str.replace(/[^0-9]/g, '');
        var number = parseInt(num);
        return number;
    }
    roll();
}

function endscript() {
    loop = false;
}

function changebase() {
    n = parseFloat((Math.floor(document.getElementById('goCoins').innerHTML) / Math.pow(2, 8)).toFixed(2));
    init = parseFloat(prompt("Please enter the new inital betting value", n));
    if (firstTime === true) {
        start = init;
    }
}

function changemax() {
    n = parseFloat(Math.floor(document.getElementById('goCoins').innerHTML).toFixed(2));
    maxBetValue = parseFloat(prompt("Please enter the new maximum bet", n));
}

function changedelay() {
    delay = parseInt(prompt("Please enter the new delay (milliseconds)", "100"));
}