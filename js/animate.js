function animate(obj, json, interval, sp, fn) {
    clearInterval(obj.timer);
    function getStyle(obj, arr) {
        if(obj.currentStyle){
            return obj.currentStyle[arr];    //针对ie
        } else {
            return document.defaultView.getComputedStyle(obj, null)[arr]; 
        }
    }
    obj.timer = setInterval(function(){
        //j ++;
        var flag = true;
        for(var arr in json) {
            var icur = 0;
            //k++;
            if(arr == "opacity") {
                icur = Math.round(parseFloat(getStyle(obj, arr))*100);
            } else {
                icur = parseInt(getStyle(obj, arr));
            }
            var speed = (json[arr] - icur) * sp;
            speed = speed > 0 ? Math.ceil(speed): Math.floor(speed);
            if(icur != json[arr]){
                flag = false;
            } 
            if(arr == "opacity"){
                obj.style.filter = "alpha(opacity : '+(icur + speed)+' )";
                obj.style.opacity = (icur + speed)/100;
            }else {
                obj.style[arr] = icur + speed + "px";
            }
        }

        if(flag){
            clearInterval(obj.timer);
            if(fn){
                fn();
            }
        }
    },interval);
}