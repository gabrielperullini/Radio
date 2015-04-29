
var testEl,position=0;



var scroll;
function startDrag(e) {
    
    
    var pos = [testEl.offsetLeft,testEl.offsetTop];
    var origin = getCoors(e);
    var originTime = new Date().getTime();
    var step = 50,    // in milliseconds
    startPos,speed,
    distance = 0,
    min = -position + $('wrapper').offsetWidth/2,
    max = $('wrapper').offsetWidth/2;
    clearInterval(scroll);
    
    testEl.ontouchmove = testEl.onmousemove = moveDrag;
    testEl.ontouchend = document.onmouseup = function (e) {
        var end  = getCoors(e);
        startPos = testEl.offsetLeft;
        var endTime = new Date().getTime();
        var dist = end - origin;
        var time = endTime - originTime;
        speed = dist/(time/1000); // pixels per second
        scroll = setInterval(extraScroll,step);
        testEl.ontouchmove = testEl.ontouchend = testEl.onmousemove = document.onmouseup = null;
    }
    
    return false; // cancels scrolling
    
    function extraScroll() {
        distance += Math.round(speed*(step/1000))
        var newPos = startPos + distance;
        if (newPos > max || newPos < min) {
            clearInterval(scroll);
            return;
        }
        testEl.style.left = newPos + 'px';
        speed *= .85;
        if (Math.abs(speed) < 10) {
            speed = 0;
            clearInterval(scroll);
        }
    }
    
    function moveDrag (e) {
        var currentPos = getCoors(e);
        var newPos = (currentPos - origin) + pos[0];
        if (newPos <= max && newPos >= min) {
            testEl.style.left = newPos + 'px';
        }
    }
    
    function getCoors(e) {
        var coors;
        if (e.changedTouches) {     // iPhone
            coors = e.changedTouches[0].clientX;
        } else {                                 // all others
            coors = e.clientX;
        }
        return coors;
    }
}

function $(id) {
    return document.getElementById(id);
}

