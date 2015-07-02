'use strict';

var timeoutID;
var imgArray = [
    './images/envelop01.png',
    './images/envelop02.png',
    './images/envelop03.png'],
    curIndex = 0,
    imgDuration = 3000;

function slideShow() {

    if (curIndex < imgArray.length - 1) { 
        document.getElementById('slider').className += "fadeOut";
        setTimeout(function() {
            document.getElementById('slider').src = imgArray[curIndex];
            document.getElementById('slider').className = "";
        },1000);
        curIndex++;
        setTimeout(slideShow, imgDuration);
    }
}
document.getElementById('slider').src = imgArray[0];
timeoutID = setTimeout(slideShow, 1000); 