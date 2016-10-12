define(["common/jquery.min"],function(){
        var $ = jQuery;
return{
    "move" : function(sel){
        var global_y=0,global_x=0;
        var elem = $(sel);
        elem.on("touchstart touchmove touchend touchcancel",function(e){
            // this.p = new Object();
            var _this=this;
            var getClient = function(){
                var x=event.pageX||event.targetTouches[0].pageX;
                var y=event.pageY||event.targetTouches[0].pageY;
                return {
                  "x": x,
                  "y": y,
                };
            };
            var start = function(){
                forBidMove();
                _this.s = getClient();
            }
            var move= function(){
                _this.m = getClient();
                _this.mx = _this.m.x - _this.s.x+global_x;
                _this.my = _this.m.y - _this.s.y+global_y;
                tanSlate(_this.mx,_this.my,0);
            }
            var end = function(){
                var ww=$(window).width();
                var cw=elem.width();
                allowMove();
                // if(Math.abs(_this.mx)>ww/2){
                //     var xx=-ww+cw+10;
                //     tanSlate(xx,_this.my,0.3);
                // }else{  //ww-cw-10+
                    var xx=0;
                    tanSlate(xx,_this.my,0.3);
                // }
                global_y=_this.my;
                global_x=xx;
            }
            var tanSlate = function(x,y,t){
                var tran_3d='translate3d(' + x + 'px,'+ y +'px,0px)';
                var tran_2d='translate(' + x + 'px,'+ y +'px)';
                elem.css({
                        '-webkit-transform':   tran_3d,
                          '-o-transform':       tran_2d,
                          '-ms-transform':      tran_2d,
                          '-moz-transform':     tran_2d,
                          'transform':          tran_3d,
                          '-moz-transition': '-moz-transform '+t+'s ease-out',
                          '-webkit-transition': '-webkit-transform '+t+'s ease-out',
                          '-o-transition': '-o-transform '+t+'s ease-out',
                        '-ms-transition': '-ms-transform '+t+'s ease-out',
                        'transition': 'transform '+t+'s ease-out',
                        });
            }
            switch(e.type){
                case "touchstart":
                    start();
                break;
                case "touchmove":
                    move();
                break;
                case "touchend":
                    end();
                break;
                case "touchcancel":
                    end();
                break;
            }
        });
    }
}
//页面禁止滑动
function preDefault() {
    event.preventDefault();
}
function forBidMove() { //禁止touchmove
    $("body").on("touchmove",preDefault);
}
function allowMove() {  //恢复touchmove
    $("body").off("touchmove",preDefault);
}
});