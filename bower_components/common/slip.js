/**
   * [slipping description]
   * 调用方法  slipping('.slipping-area')||slipping(1000)||slipping('.slipping-area',1000)||slipping('.slipping-area',1000)
   * @param  {[jq选择器]} wrap [jq选择器,默认'.slipping-area']
   * @param  {[int]} time     [轮播时间，默认0,0则代表不开启自动轮播]
   */
define(["common/jquery.min"],function(){
    var slipping=function(){
    }

    slipping.prototype.iniT=function(wrap,child,time)
    {
        // if(arguments.length==1){
        //     if(typeof(arguments[0]=='number')){
        //         time=arguments[0];
        //         wrap='.slipping-area';
        //     }else{
        //         time=0;
        //         wrap=arguments[0];
        //     }
        // }else{
        //     time=time||0;
        //     wrap='.slipping-area'||0;
        // }
        var img_arr=$(wrap).find(child);
        this.autotime=time;
        this.elem=img_arr.parent();
        this.img_len=img_arr.length;    //得到所有图片数量
        var zhe_first=img_arr.eq(0).clone(true);    //复制第一张图片
        var zhe_last=img_arr.eq(this.img_len-1).clone(true);    //复制最后一张图片
        this.elem.append(zhe_first);    //将复制的第一张图片插入图片盒子最后面
        this.elem.prepend(zhe_last);    //将复制的最后一张图片插入图片盒子最前面
        this.imgs = $(wrap).find(child);
        var em='';
        for(var i = 1;i<=this.img_len;i++){
            em+='<em><i></i></em>';
        }
        var dot="<div class='slipping-dot'>"+em+"</div>";
        $(wrap).append(dot);
        this.img_len+=2;    //所有图片数量+2
        this.index= 1;  //开始图片位置
        this.coordinate=new Object();   //定义存储坐标对象
        this._iniT();    
        this.addListen();
        this.chageDot();
        if(this.autotime!=0){
            this.changeAuto(this.autotime);
        }
    }

    slipping.prototype._iniT=function()
    {
        this.win_wid=$(window).width()||$(document.body).width();    //得到屏幕宽度
        this.div_width=this.win_wid*this.img_len;   //得到图片盒子宽度
        this.elem.css('width',this.div_width);  //设置图片盒子宽度
        this.imgs.css('width',this.win_wid+"px");    //设置图片宽度为屏幕宽度
        var mx=-this.index*this.win_wid;
        this.tanSlate(mx,0);
        _this=this;
        $(window).off("orientationchange resize");
        $(window).on("orientationchange resize", function(){    //屏幕宽度改变，重新配置
                _this._iniT();
            });
        this.imgs.on('dragstart touchmove',function(){event.preventDefault();})   //禁止拖放事件
    }
    slipping.prototype.changeAuto=function(time)
    {
        clearInterval(this.intervarauto);
        var _this=this;
        this.intervarauto=setInterval(function(){
             var gochage=function(){
                    _this.index=_this.index+1>_this.img_len-1?_this.img_len-2:_this.index+1;
                    var mx=-_this.index*_this.win_wid;
                    _this.tanSlate(mx,0.5);
                    _this.chageDot();
                }

            if(_this.index==1){
                 var mx=-_this.index*_this.win_wid;
                    _this.tanSlate(mx,0);
                    _this.chageDot();
                       var timeout=setTimeout(function(){
                            gochage();
                        },10);
            }else{
                 gochage();
            }
               
            if(_this.index==_this.img_len-1){
                 _this.index=1;
                var mx=-_this.index*_this.win_wid;
                    _this.timeout=setTimeout(function(){
                    _this.tanSlate(mx,0);
                    _this.chageDot();
                        },550);
                }
        },time);

    }
    slipping.prototype.tStart=function()    //start执行事件
    {
        this.imgs.off('touchmove');
        if(this.autotime!=0){
            clearInterval(this.intervarauto);
            clearTimeout(this.timeout);
        }
        this.time=0;
        var _this=this;
        this.interval=setInterval(function(){
            _this.time+=10;
        },10);
        this.coordinate.start=getClient();
    };
    slipping.prototype.tMove=function()     //move执行事件
    {
        var coord=this.coordinate;
        try{
            coord.move=getClient();
            var mx=coord.move.x-coord.start.x;
            var my=coord.move.y-coord.start.y;
            // console.log(Math.abs(my),Math.abs(mx))
            if(Math.abs(my)>=5&&Math.abs(mx)<15){
                return
            }else{
                this.imgs.on('touchmove',function(){event.preventDefault();})   //禁止拖放事件
                if(this.index==0){  //右滑
                    if(mx>2){
                        this.index=this.img_len-2;
                        return
                    }else{
                        this.index=0;
                    }
                }
                if(this.index==this.img_len-1){
                    if(mx<-2){       //左滑
                        this.index=1;
                        return
                    }else{
                        this.index=this.img_len-1;
                    }
                }
                mx-=this.index*this.win_wid;
                this.tanSlate(mx,0);
            }
        }catch(e){''}
    };

    slipping.prototype.tEnd=function()      //end执行事件
    {
        clearInterval(this.interval);
        var coord=this.coordinate;
        try{
            var mx=coord.move.x-coord.start.x;
            if(mx>0&&this.time<=200&&mx>5||mx>=this.win_wid/2){    //右
                this.index=this.index-1<0?this.index=0:this.index-1;
            }else if(mx<0&&this.time<=200&&mx<-5||-mx>=this.win_wid/2){    //左
                this.index=this.index+1>this.img_len-1?this.img_len-2:this.index+1;
            }else{
                this.index=this.index;
            }
            mx=-this.index*this.win_wid;
        }
        catch(e){''}
        this.tanSlate(mx,0.5);
        this.chageDot();
        if(this.autotime!=0){
            if(this.index==this.img_len-1){
                this.index=1;
            }
            this.changeAuto(this.autotime);
        }
        this.coordinate=new Object();
    };

    slipping.prototype.chageDot=function()
        {   
            var index=this.index>=this.img_len-1?0:this.index-1;
            $(".slipping-dot").find('em').removeClass('active');
            $(".slipping-dot").find('em').eq(index).addClass('active');
        }

    slipping.prototype.addListen=function()
    {
        var _this=this;
        var is_mouseup=false;
        this.elem.on('touchstart touchmove touchend mousedown mousemove mouseup mouseout',function(e){
            if((e.type=='touchstart'&&e.originalEvent.touches.length <= 1)||e.type=='mousedown')
            {
                is_mouseup=true;
                _this.tStart();
            }
            else if((e.type=='touchmove'&&e.originalEvent.touches.length <= 1)||(is_mouseup&&e.type=='mousemove'))
            {
                _this.tMove();
            }
            else if(((e.type=='touchend'||e.type=='touchcancel')&&e.originalEvent.touches.length <= 1)||e.type=='mouseup')
            {
                _this.tEnd();
                 is_mouseup=false;
            }else if(e.type=='mouseout'){
                _this.tEnd();
            }
            
        });
    }
    /**
     * [tanSlate description]
     * @param  {string} x [move-number]
     * @param  {int} t [transition-time]
     */
     slipping.prototype.tanSlate = function(x,t)
    {
        var tran_3d='translate3d(' + x + 'px,'+ '0px,0px)';
        var tran_2d='translate(' + x + 'px,'+ '0px)';
        this.elem.css({
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
     /**
     * [getClient  得到坐标pageX,pageY]
     * @return {[object]}       [pageX,pageY]
     */  
    var getClient = function()
    {
        var x=event.pageX||event.targetTouches[0].pageX;
        var y=event.pageY||event.targetTouches[0].pageY;
        return {
          "x": x,
          "y": y,
        };
    };
    var slip=new slipping();
    return slip;
});
 