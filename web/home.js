var togNav = true;
var togProjects = true;
var projHeight;
var height;
var sectIDs = ["pageHeader", "about", "proj", "javaQuizJSF", "pomodoro", "simon", "skills", "contact"
];
var sectHeights = [];
var javaQuizJSFChangeVal = 0;
var space = 0;
var planets = ["mercury", "venus", "earth", "mars", "asteroidBelt", "jupiter", "saturn", "uranus", "neptune"];
var planetImages = ["mercuryImage", "venusImage", "earthImage", "marsImage", "asteroidBeltImage", "jupiterImage", "saturnImage", "uranusImage", "neptuneImage"];
var distance = [14, 18, 22, 26, 60, 60, 70, 80, 90];
var times = [88, 225, 365, 687, 10000, 4333, 10756, 30687, 60190];
var sizes = [7, 8, 8, 5, 9, 7, 7, 5, 4];
var links = ["topLink", "aboutLink", "skillsLink", "projectLink", "contactLink"];
var isDown = false;
var pastX;
var pastY;
var convas;
var ctx;
var toolSwitchBool = false;


function loadScript() {
    canvas = document.getElementById('notebookSketch');
    ctx = canvas.getContext('2d');
    ctx.strokeStyle = "black";
    ctx.lineWidth = 1;
    resize();
    softwareEngineer();
    spaceNav();
}

function resize() {
    height = window.innerHeight;
    for (i = 0; i < sectIDs.length; i++) {
        document.getElementById(sectIDs[i]).style.minHeight = height + "px";
    }
    scroll();
    makeSpace();
    solarSystem();
    notebookPaper();
}

function toggleNav() {
    if (togNav) {
        document.getElementById("navigation-panel").style.animationDuration = ".5s";
        document.getElementById("navigation-panel").style.WebkitAnimationName = "openNav";
        document.getElementById("navigation-panel").style.MozAnimationName = "openNav";
        document.getElementById("navigation-panel").style.left = "0px";
        document.getElementById("page-body").style.animationDuration = ".5s";
        document.getElementById("page-body").style.WebkitAnimationName = "openBody";
        document.getElementById("page-body").style.left = "200px";
        document.getElementById("toggle-nav").style.animationDuration = ".5s";
        document.getElementById("toggle-nav").style.WebkitAnimationName = "openBtn";
        document.getElementById("toggle-nav").style.left = "200px";
        document.getElementById("toggle-nav").className = "glyphicon glyphicon-chevron-left";
        togNav = false;
    } else {
        document.getElementById("navigation-panel").style.animationDuration = ".5s";
        document.getElementById("navigation-panel").style.animationName = "closeNav";
        document.getElementById("navigation-panel").style.left = "-200px";
        document.getElementById("page-body").style.animationDuration = ".5s";
        document.getElementById("page-body").style.animationName = "closeBody";
        document.getElementById("page-body").style.left = "0px";
        document.getElementById("toggle-nav").style.animationDuration = ".5s";
        document.getElementById("toggle-nav").style.WebkitAnimationName = "closeBtn";
        document.getElementById("toggle-nav").style.left = "0px";
        document.getElementById("toggle-nav").className = "glyphicon glyphicon-chevron-right";
        togNav = true;
    }
}

function scroll() {
    sectHeights = [];
    scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
    height = 0;
    for (i = 0; i < sectIDs.length; i++) {
        sectHeights.push(height);
        height += document.getElementById(sectIDs[i]).scrollHeight;
    }
    for (i = 0; i < sectIDs.length; i++) {
        if (scrollTop > sectHeights[sectHeights.length - 1]) {
            //do nothing
        } else if (scrollTop > sectHeights[i]) {
            document.getElementById(sectIDs[i]).style.position = "fixed";
            document.getElementById(sectIDs[i]).style.width = "100%";
            if (
                    document.getElementById(sectIDs[i]).scrollHeight > window.innerHeight
                    ) {
                if (
                        scrollTop >=
                        sectHeights[i] +
                        document.getElementById(sectIDs[i]).scrollHeight -
                        window.innerHeight
                        ) {
                    document.getElementById(sectIDs[i]).style.top =
                            window.innerHeight -
                            document.getElementById(sectIDs[i]).scrollHeight +
                            "px";
                } else {
                    document.getElementById(sectIDs[i]).style.top =
                            sectHeights[i] - scrollTop + "px";
                }
            } else {
                document.getElementById(sectIDs[i]).style.top = "0px";
            }
        } else {
            document.getElementById(sectIDs[i]).style.position = "relative";
            document.getElementById(sectIDs[i]).style.width = "100%";
            document.getElementById(sectIDs[i]).style.top = sectHeights[i] + "px";
        }
    }
    sectFixed = 0;
    for (i = 0; i < sectIDs.length; i++) {
        if (document.getElementById(sectIDs[i]).style.position === "fixed") {
            sectFixed++;
        }
    }


    if (sectFixed <= 1) {
        spaceNav();
    } else if (sectFixed === 2) {
        notebookNav();
    }
}

function javaQuizJSFChange(str) {
    images = [
        "https://i.imgur.com/CHk3WR1.png",
        "https://i.imgur.com/D2XCtsc.png",
        "https://i.imgur.com/P39RDEY.png",
        "https://i.imgur.com/D2XCtsc.png"
    ];
    if (str === "+") {
        javaQuizJSFChangeVal = (javaQuizJSFChangeVal + 1) % 4;
        document.getElementById("javaQuizJSFImage").src =
                images[javaQuizJSFChangeVal];
    } else if (str === "-") {
        javaQuizJSFChangeVal = (javaQuizJSFChangeVal + 4 - 1) % 4;
        document.getElementById("javaQuizJSFImage").src =
                images[javaQuizJSFChangeVal];
    }
}

function makeSpace() {
    if (space !== 0) {
        var element = document.getElementById("starSpace");
        while (element.firstChild) {
            element.removeChild(element.firstChild);
        }
    }
    space++;
    for (i = 0; i < (window.innerHeight + window.innerWidth) / 5; i++) {
        h = Math.floor(Math.random() * window.innerHeight);
        w = Math.floor(Math.random() * window.innerWidth);
        star = document.createElement("div");
        star.style.position = "absolute";
        star.style.top = h + "px";
        star.style.left = w + "px";
        star.style.width = "1px";
        star.style.height = "1px";
        star.style.animation = "glow infinite linear";
        star.style.animationDuration = (Math.random() * 3) + 1 + "s"
        star.style.animationDelay = Math.random() * 3 + "s";
        star.style.backgroundColor = "white";
        star.id = "stars";
        document.getElementById("starSpace").appendChild(star);
    }
}

function solarSystem() {
    document.getElementById("sun").style.height = 8 + "%";
    document.getElementById("sun").style.width = document.getElementById("sun").scrollHeight + "px";
    document.getElementById("sun").style.animationDuration = "3600s";
    for (i = 0; i < planets.length; i++) {
        document.getElementById(planets[i]).style.height = distance[i] + "%";
        document.getElementById(planets[i]).style.width = document.getElementById(planets[i]).scrollHeight + "px";
        document.getElementById(planets[i]).style.animationDuration = times[i] * 50 + "ms";
        document.getElementById(planetImages[i]).style.position = "absolute";
        document.getElementById(planetImages[i]).style.position = "absolute";
        document.getElementById(planetImages[i]).style.height = sizes[i] + "%";
        document.getElementById(planetImages[i]).style.width = document.getElementById(planetImages[i]).scrollHeight + "px";
    }
    document.getElementById("asteroidBeltImage").style.height = 100 + "%";
    document.getElementById("asteroidBeltImage").style.width = document.getElementById("asteroidBeltImage").scrollHeight + "px";


}

function spaceNav() {
    document.getElementById("navigation-panel").style.backgroundImage = "";
    document.getElementById("navigation-panel").style.backgroundColor = "#7EC7FF";
    for (i = 0; i < links.length; i++) {
        document.getElementById(links[i]).style.backgroundSize = "100% 100%";
        document.getElementById(links[i]).style.backgroundImage = "url('images/cloud.png')";
    }
    document.getElementById("navContent").innerHTML = '<img id="rocketImage" src="images/rocket.png"/>\n\
        <img id="middleRocketImage" src="images/middleRocket.png"/>\n\
        <img id="leftRocketImage" src="images/leftRocket.png"/>\n\
        <img id="rightRocketImage" src="images/rightRocket.png"/>\n\
        <img id="launchPadImage" src="images/launchPad.png"/>\n\
        <button id="launchButton" onclick="launchRocket()">Launch</button>';
}

function launchRocket() {
    document.getElementById("rocketImage").style.animation = "launchRocket 1 linear";
    document.getElementById("rocketImage").style.animationDuration = 20 + "s";
    document.getElementById("rocketImage").style.animationFillMode = "forwards";

    document.getElementById("middleRocketImage").style.animation = "launchRocket 1 linear";
    document.getElementById("middleRocketImage").style.animationDuration = 20 + "s"
    document.getElementById("middleRocketImage").style.animationFillMode = "forwards";

    document.getElementById("leftRocketImage").style.animation = "launchRocketLeftBooster 1 linear";
    document.getElementById("leftRocketImage").style.animationDuration = 20 + "s"
    document.getElementById("leftRocketImage").style.animationFillMode = "forwards";

    document.getElementById("rightRocketImage").style.animation = "launchRocketRightBooster 1 linear";
    document.getElementById("rightRocketImage").style.animationDuration = 20 + "s"
    document.getElementById("rightRocketImage").style.animationFillMode = "forwards";

    countDown = 10;
    document.getElementById("launchButton").innerHTML = "10";
    document.getElementById("launchButton").disabled = "true";
    setInterval(function () {
        countDown--;
        if (countDown >= 0) {
            document.getElementById("launchButton").innerHTML = countDown;
        } else {
            clearInterval();
        }
    }, 1000);

    setTimeout(function () {
        document.getElementById("spaceRocket").innerHTML = '<img id="rocketSpaceImage" src="images/rocket.png"/>\n\
        <img id="middleRocketSpaceImage" src="images/middleRocket.png""/>';
        earthCoords = document.getElementById("earthImage").getBoundingClientRect();

        document.getElementById("middleRocketSpaceImage").style.imageOrientation = "90deg";
        document.getElementById("middleRocketSpaceImage").style.position = "absolute";
        document.getElementById("middleRocketSpaceImage").style.height = "4px";
        document.getElementById("middleRocketSpaceImage").style.left = earthCoords.left - 195 + "px";
        document.getElementById("middleRocketSpaceImage").style.top = earthCoords.top + "px";
        document.getElementById("middleRocketSpaceImage").style.transform = "translate(0px, -300px) scale(50)";
        document.getElementById("middleRocketSpaceImage").style.transitionDuration = 5000 + "ms";

        document.getElementById("rocketSpaceImage").style.imageOrientation = "90deg";
        document.getElementById("rocketSpaceImage").style.position = "absolute";
        document.getElementById("rocketSpaceImage").style.height = "4px";
        document.getElementById("rocketSpaceImage").style.left = earthCoords.left - 195 + "px";
        document.getElementById("rocketSpaceImage").style.top = earthCoords.top + "px";
        document.getElementById("rocketSpaceImage").style.transform = "translate(0px, -300px) scale(50)";
        document.getElementById("rocketSpaceImage").style.transitionDuration = 5000 + "ms";
    }, 20000);
    setTimeout(function () {
        document.getElementById("middleRocketSpaceImage").style.transform = " rotate(450deg)"; //translate(20px, 500px)";
        document.getElementById("middleRocketSpaceImage").style.transitionDuration = 13250 + "ms";
        document.getElementById("rocketSpaceImage").style.transform = "translate(0px, -600px) scale(50)";
        document.getElementById("rocketSpaceImage").style.transitionDuration = 5000 + "ms";
    }, 25000);
    setTimeout(function () {
        document.getElementById("middleRocketSpaceImage").style.opacity = "0"; //translate(20px, 500px)";
        document.getElementById("middleRocketSpaceImage").style.transitionDuration = 0 + "ms";
    }, (38250));
    setTimeout(function () {
        document.getElementById("spaceRocket").innerHTML = '<img id="rocketSpaceImage2" src="images/rocket.png"/>';
        document.getElementById("rocketSpaceImage2").style.animation = "moonLanding 1 linear";
        document.getElementById("rocketSpaceImage2").style.animationDuration = 5 + "s";
        document.getElementById("rocketSpaceImage2").style.animationFillMode = "forwards";
    }, (38250));

}

function softwareEngineer() {
    flash = 0
    softDev = "SOFTWARE DEVELOPER"
    setInterval(function () {

        innHtml = "";
        for (i = 0; i < softDev.length; i++) {
            if (softDev[i] == ' ') {
                innHtml = innHtml + " ";
            } else if (i != flash) {
                innHtml = innHtml + '<a style="color: yellowgreen">' + softDev[i] + '</a>';
            } else {
                innHtml = innHtml + '<a style="color: green">' + softDev[i] + '</a>';
            }

        }
        document.getElementById("softwareDeveloperText").innerHTML = innHtml;
        ;
        flash = (flash + 1) % 17;
    }, 1000);
}

function notebookNav() {
    document.getElementById("navigation-panel").style.backgroundImage = "url('images/notebookCover.png')";
    document.getElementById("navigation-panel").style.backgroundSize = "100% 100%";
    for (i = 0; i < links.length; i++) {
        document.getElementById(links[i]).style.backgroundSize = "100% 100%";
        document.getElementById(links[i]).style.backgroundColor = "white";
    }
    document.getElementById("navContent").innerHTML = '\n\
        <div id="red"><h4 id="redLabel">R</h4><input type="range" onchange="rgb()" id="redRange" value="255" min="0" max="255"></div>\n\
        <div id="green"><h4 id="greenLabel">G</h4><input type="range" onchange="rgb()" id="greenRange" value="255" min="0" max="255"></div>\n\
        <div id="blue"><h4 id="blueLabel">B</h4><input type="range" onchange="rgb()" id="blueRange" value="255" min="0" max="255"></div>\n\
        <div id="size"><h4 id="sizeLabel">Pencil Width</h5><input type="range" onchange="penWidth()" id="drawWidthRange" value="100" min="1" max="100"></div>\n\
        <div id="penColorDisplay"><div id="penSizeDisplay"></div></div>\n\
        <div id="toolToggle">\n\
            <h5 id="pencilActive">Pencil</h5>\n\
            <div id="pencilToggle" onclick="toolSwitch()" >\n\
                <div id="toolSwitch" onclick="toolSwitch()">\n\
            </div>\n\
            <h5 id="eraserActive">Eraser</h5>\n\
        </div>';

}

function noteBookDraw() {
    if (isDown === true) {
        var loc = canvas.getBoundingClientRect();
        var x = event.clientX - loc.left;
        var y = event.clientY - loc.top;
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(pastX, pastY);
        ctx.lineTo(x, y);
        ctx.stroke();
        pastX = x;
        pastY = y;
    }
    movePencil();
}

function noteBookBool(isDownBool) {
    scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
    isDown = isDownBool;
    pastX = event.clientX;
    pastY = event.clientY + scrollTop - sectHeights[1];
    if (!togNav) {
        pastX = event.clientX - 200;
    }
}

function rgb() {
    ctx.globalCompositeOperation = "source-over";
    redValue = 255 - document.getElementById("redRange").value;
    blueValue = 255 - document.getElementById("blueRange").value;
    greenValue = 255 - document.getElementById("greenRange").value;
    ctx.strokeStyle = "rgb(" + redValue + "," + greenValue + "," + blueValue + ")";
    document.getElementById("penSizeDisplay").style.backgroundColor = "rgb(" + redValue + "," + greenValue + "," + blueValue + ")";
    document.getElementById("pencilColor").style.backgroundColor = "rgb(" + redValue + "," + greenValue + "," + blueValue + ")";

}

function penWidth() {
    ctx.lineWidth = (101 - document.getElementById("drawWidthRange").value);
    document.getElementById("penSizeDisplay").style.width = (102 - document.getElementById("drawWidthRange").value) + "px";
    document.getElementById("penSizeDisplay").style.height = (102 - document.getElementById("drawWidthRange").value) + "px";

}

function eraser() {
    ctx.strokeStyle = "rgb(255, 255, 255)";
    ctx.globalCompositeOperation = "destination-out";
    ctx.strokeStyle = ("rgba(255,255,255,255)");
    ctx.fillStyle = "rgba(255,0,0,0)";

}

function toolSwitch() {
    if (toolSwitchBool != true) {
        toolSwitchBool = true;
        eraser();
        document.getElementById("pencil").style.transform = "rotate(-225deg)";
        document.getElementById("toolSwitch").style.right = "1px";
    } else {
        toolSwitchBool = false;
        rgb();
        document.getElementById("pencil").style.transform = "rotate(-45deg)";
        document.getElementById("toolSwitch").style.right = "15px";

    }
}

function notebookPaper() {
    //document.getElementById("notebookSketch").style.height = document.getElementById("about").scrollHeight;
    //document.getElementById("notebookSketch").style.height = document.getElementById("about").scrollHeight;

    canvas.height = document.getElementById("about").scrollHeight;
    canvas.width = window.innerWidth;
    notebookHeight = document.getElementById("about").scrollHeight - 107;
    innHTML = '<img id="notebookTop" src="images/notebookSheetTop.png"/>';
    while (notebookHeight > 0) {
        innHTML += '<img id="notebookLine" src="images/notebookSheetLines.png"/>';
        notebookHeight -= 40;
    }
    document.getElementById("noteBookPaper").innerHTML = innHTML;
}

function movePencil() {
    loc = document.getElementById("about").getBoundingClientRect();
    x = event.clientX - loc.left - 70;
    y = event.clientY - loc.top - 160;
    document.getElementById("pencil").style.left = x + "px";
    document.getElementById("pencil").style.top = y + "px";
}