define(['common/jquery.min'],function($){
    var adviser = $("#adviser_wrap");
    var wh = $("body").width();
    var next = function(sel){
        
    };
    var last = function(sel){
        
    };
    var tanSlate = function(sel,x,y,t){
        var tran_3d='translate3d('+x+'px,'+y+'px,0px)';
        var tran_2d='translate('+x+'px,'+y+'px)';
        sel.css({
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
    };
});