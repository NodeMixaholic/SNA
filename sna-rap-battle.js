var snaCurrentKey;
var keyRepeatCount = 0;
var snaOldKey = "n/a"
var snaLevelCurrentKey;
const urlParams = window.location.search;
const urlParamsObject = new URLSearchParams(urlParams);
function getWeek() {
    if (typeof urlParamsObject.get("week") != 'undefined' && urlParamsObject.get("week") != null) {
        return urlParamsObject.get("week");
    } else {
        return "TEST";
    }
}

function getVillain(week) {
    if (week == "TEST") {
        return "testMan";
    } else {
        return "errorGal";
    }
}

function getRandomNumber(min, max) {
    return Math.random() * (max - min) + min
}

function getPose(isVillain) {
    let v;
    if (isVillain) {
        v = getVillain(getWeek());
    }
    let poseNum = Math.floor(getRandomNumber(0,3))
    if (isVillain) {
        var pathToVillainPose = `villains/${v}/${poseNum}.png`
        console.log(pathToVillainPose)
        return pathToVillainPose
    } else {
        var pathToHeroPose = `hero/${poseNum}.png`
        console.log(pathToHeroPose)
        return pathToHeroPose;
    }
}

function getAudio(isVillain) {
    let v;
    if (isVillain) {
        v = getVillain(getWeek());
    }
    let audioNum = Math.floor(getRandomNumber(0,3))
    if (isVillain) {
        var pathToVillainMp3 = `villains/${v}/${audioNum}.mp3`
        console.log(pathToVillainMp3)
        return pathToVillainMp3;
    } else {
        var pathToHeroMp3 = `hero/${audioNum}.mp3`
        console.log(pathToHeroMp3)
        return pathToHeroMp3;
    }
}

document.onkeydown = function(e) {
    if (e.key == 'ArrowUp') {
        console.log("UP/38")
        snaCurrentKey = "u";
        document.getElementById('hero').setAttribute("src", getPose(false))
        var aud = new Audio(`${getAudio(false)}`);
        aud.addEventListener("canplay", evt => { aud.play(); }); 
    } else if (e.key == 'ArrowDown') {
        console.log("DOWN/40")
        snaCurrentKey = "d";
        document.getElementById('hero').setAttribute("src", getPose(false))
        var aud = new Audio(`${getAudio(false)}`);
        aud.addEventListener("canplay", evt => { aud.play(); }); 
    } else if (e.key == 'ArrowLeft') {
        console.log("LEFT/37")
        snaCurrentKey = "l";
        document.getElementById('hero').setAttribute("src", getPose(false))
        var aud = new Audio(`${getAudio(false)}`);
        aud.addEventListener("canplay", evt => { aud.play(); }); 
    } else if (e.key == 'ArrowRight') {
        console.log("RIGHT/39")
        snaCurrentKey = "r";
        document.getElementById('hero').setAttribute("src", getPose(false))
        var aud = new Audio(`${getAudio(false)}`);
        aud.addEventListener("canplay", evt => { aud.play(); }); 
    }
    if (snaCurrentKey == snaOldKey) {
        keyRepeatCount++
        console.log(`Repeat x${keyRepeatCount}`);
    } else {
        keyRepeatCount = 0;
    }
    snaOldKey = snaCurrentKey;
}

async function freestyleVillain() {
    while (true) {
        await new Promise(r => setTimeout(r, getRandomNumber(500,2000)));
        var audV = new Audio(`${getAudio(true)}`);
        audV.addEventListener("canplay", evt => { audV.play(); }); 
        document.getElementById('villain').setAttribute("src", `${getPose(true)}`)
    }
}

document.title = `SNA WEEK ${getWeek()}`
document.body.style.backgroundImage = `url('week-bgs/${getWeek()}.jpg')`
document.getElementById('villain').setAttribute("src", `villains/${getVillain(getWeek())}/0.png`)
document.getElementById('hero').setAttribute("src", `hero/0.png`)

async function streamLevel(week) {
    let args;
    let codeLine;
    fetch(`levels/${week}`)
    .then(response => response.text())
        .then(lines => {
            for(var i = 0;i < lines.length;i++) {
                console.log(lines[i])
                codeLine = String.prototype.toLowerCase(lines[i])
                console.log(codeLine)
                args = codeLine.split(":")
            }
    });
    document.getElementById("instruction").innerText = codeLine
    while (true) {
        if (args[0] == "h") {
            if (snaOldKey == snaCurrentKey && snaCurrentKey == args[1]) {
                //do nothing for now...
            } else {
                gameOver();
                break;
            }
        } else if (args[0] == "wait" || args[0] == "sleep") {
            await new Promise(r => setTimeout(r, Number(args[1]) * 1000));
        } else if (args[0] == "v") {
            var audV = new Audio(`${getAudio(true)}`);
            audV.addEventListener("canplay", evt => { audV.play(); }); 
            document.getElementById('villain').setAttribute("src", `${getPose(true)}`)
        } else {
            console.log(`UNKNOWN COMMAND ${codeLine}`)
        }
    }
}
