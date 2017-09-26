var togNav = true;
var togProjects = true;
var projHeight;
var height;
var sectIDs = [
    "pageHeader",
    "about",
    "proj",
    "javaQuizJSF",
    "pomodoro",
    "simon",
    "skills",
    "contact"
];
var sectHeights = [];
var current = 0;
var javaQuizJSFChangeVal = 0;
var space = 0;
var planets = ["mercury", "venus", "earth", "mars", "asteroidBelt", "jupiter", "saturn", "uranus", "neptune"];
var planetImages = ["mercuryImage", "venusImage", "earthImage", "marsImage", "asteroidBeltImage", "jupiterImage", "saturnImage", "uranusImage", "neptuneImage"];
var distance = [14, 18, 22, 26, 60, 60, 70, 80, 90];
var times = [88, 225, 365, 687, 10000, 4333, 10756, 30687, 60190];
var sizes = [7, 8, 8, 5, 9, 7, 7, 5, 4];

function loadScript() {
    projHeight = document.getElementById("projects").offsetHeight;
    resize();
    makeSpace();
    solarSystem();
}

function resize() {
    height = window.innerHeight;
    for (i = 0; i < sectIDs.length; i++) {
        document.getElementById(sectIDs[i]).style.minHeight = height + "px";
    }
    scroll();
    makeSpace();
    solarSystem();
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

function toggleProjects() {
    if (togProjects) {
        document.getElementById("projects").style.height = projHeight + "px";
        document.getElementById("nav2").style.top = document.getElementById("projects").offsetHeight + "px";
        document.getElementById("projects").style.top = "-60px";
        document.getElementById("toggle-projects").className = "glyphicon glyphicon-chevron-up";
        togProjects = false;
    } else {
        document.getElementById("projects").style.height = "0px";
        document.getElementById("nav2").style.top = "0px";
        document.getElementById("projects").style.top = "0px";
        document.getElementById("toggle-projects").className = "glyphicon glyphicon-chevron-down";
        togProjects = true;
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
        star.style.position = "fixed";
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
    x = 2000;
    size = 20.0;
    left = 50;
    document.getElementById("sun").style.height = 8 + "%";
    document.getElementById("sun").style.width = document.getElementById("sun").scrollHeight + "px";
    document.getElementById("sun").style.animationDuration = "3600s";
    for (i = 0; i < planets.length; i++) {
        document.getElementById(planets[i]).style.height = distance[i] + "%";
        document.getElementById(planets[i]).style.width = document.getElementById(planets[i]).scrollHeight + "px";
        document.getElementById(planets[i]).style.animationDuration = times[i] * 20 + "ms";
        document.getElementById(planetImages[i]).style.position = "absolute";
        document.getElementById(planetImages[i]).style.position = "absolute";
        document.getElementById(planetImages[i]).style.height = sizes[i] + "%";
        document.getElementById(planetImages[i]).style.width = document.getElementById(planetImages[i]).scrollHeight + "px";
    }
    document.getElementById("asteroidBeltImage").style.height = 100 + "%";
    document.getElementById("asteroidBeltImage").style.width = document.getElementById("asteroidBeltImage").scrollHeight + "px";
    
}