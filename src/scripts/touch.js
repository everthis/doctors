var tools = {};
tools.getMousePosOfElement = function(t, n) {
    var mouse_pos = tools.getMousePos(t),
        ele_pos = tools.getElementPos(n),
        c_width = n.clientWidth,
        c_height = n.clientHeight,
        deltaX = mouse_pos.left - ele_pos.left,
        deltaY = mouse_pos.top - ele_pos.top;
    return deltaX = deltaX < 0 ? 0 : deltaX > c_width ? c_width : deltaX, deltaY = deltaY < 0 ? 0 : deltaY > c_height ? c_height : deltaY, {
        x: deltaX,
        y: deltaY
    }
};

tools.getMousePos = function(el) {
    var top = Math.max(document.body.scrollTop, document.documentElement.scrollTop),
        left = Math.max(document.body.scrollLeft, document.documentElement.scrollLeft);
    return {
        top: top + el.clientY,
        left: left + el.clientX
    }
};

tools.getElementPos = function(el) {
        var top = 0, left = 0;
        do{
            top += el.offsetTop, left += el.offsetLeft;
        }
        while (el = el.offsetParent);
        return {top: top,left: left}
};

tools.browserPrefix = function() {
    var ua = navigator.userAgent.toLowerCase(), prefix = "";
        prefix = (ua.indexOf("chrome") >= 0 || window.openDatabase) ? "-webkit-" : (ua.indexOf("firefox") >= 0) ? "-moz-" : window.opera ? "-o-" : (document.all && navigator.userAgent.indexOf("Opera") === -1) ? "-ms-" : "";
        return prefix;

};
tools.getTranslateX = function(el) {
        var style_attr = tools.browserPrefix() + 'transform';
        var transform = window.getComputedStyle(el, null).getPropertyValue(style_attr);
        var results = transform.match(/matrix(?:(3d)\(-{0,1}\d+(?:, -{0,1}\d+)*(?:, (-{0,1}\d+))(?:, (-{0,1}\d+))(?:, (-{0,1}\d+)), -{0,1}\d+\)|\(-{0,1}\d+(?:, -{0,1}\d+)*(?:, (-{0,1}\d+))(?:, (-{0,1}\d+))\))/);
        if(!results) return [0, 0, 0];
        if(results[1] === '3d') return results.slice(2,5);
        results.push(0);
        return results.slice(5, 8)[0]; // returns the [X,Y,Z,1] values
};

var touch = {
    init: function() {},
    parameters: {
        "element": ui
    },
    bindEvent: function() {
        window.addEventListener("resize", this.resizeCarousel.bind(this), false),
        this.imageouter().addEventListener("touchstart", this.onTouchStart.bind(this), false),
        this.imageouter().addEventListener("touchmove", this.onTouchMove.bind(this), false),
        this.imageouter().addEventListener("touchend", this.onTouchEnd.bind(this), false),
        this.imageouter().addEventListener("touchcancel", this.onTouchEnd.bind(this), false)
    },
    onTouchStart: function(a) {
        this.imageinter().style[tools.browserPrefix() + "transition"] = "";
        var start_distance = tools.getMousePosOfElement(a.targetTouches[0], a.currentTarget);
        this.isPaused = true;
        this.startX = start_distance.x, this.startY = start_distance.y,
            this.imageinterLeft = parseInt(tools.getTranslateX(this.imageinter()));
    },
    onTouchMove: function(a) {
        var distance = tools.getMousePosOfElement(a.targetTouches[0], a.currentTarget);
        var deltaX = distance.x - this.startX,
            deltaY = distance.y - this.startY;
        this.margin_left = this.imageinterLeft + deltaX;
        this.imageinter().style[tools.browserPrefix() + "transition"] = "";
        if (this.margin_left > -this.imageActualWidth()) {
            this.imageinter().style[tools.browserPrefix() + "transform"] = "translate3d(-" + ((this.imagesLength() - 1) * this.imageActualWidth() - deltaX) + "px, 0, 0)";
        } else if (this.margin_left < -(this.imagesLength() - 2) * this.imageActualWidth() && this.margin_left > -(this.imagesLength()) * this.imageActualWidth()) {
            this.imageinter().style[tools.browserPrefix() + "transform"] = "translate3d(-" + Math.abs(deltaX) + "px, 0, 0)";
        } else {
            this.imageinter().style[tools.browserPrefix() + "transform"] = "translate3d(" + this.margin_left + "px, 0, 0)";
        };
    },
    onTouchEnd: function(a) {
        var distance = tools.getMousePosOfElement(a.changedTouches[0], a.currentTarget);
        var deltaX = distance.x - this.startX;
        if (deltaX > 50) {
            this.minusIndex(this.index);
            this.initPosition(this.index);
        } else if (deltaX < -50) {
            this.plusIndex(this.index);
            this.initPosition(this.index);
        } else {
            this.holdIndex();
        };
        this.setCurrentMark(this.index);
        setTimeout(this.resumePlay.bind(this), 3000);
    },
};