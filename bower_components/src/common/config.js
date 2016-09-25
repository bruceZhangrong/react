define([],function(INIT){
    var DEBUG = 1; //1开启调试模式
    var TIMEOUT = 30000; //超时时间 30秒
    var EXPIRE = 1800000; //缓存有效期 30分钟
    var METHOD = 'post';  //网络请求方式
    var ROW_ACOUNT = 20;
    var WxShare = new Object();  //分享对象
 
var API = {
    'DEBUG' : DEBUG,
    'TIMEOUT' : TIMEOUT,
    'EXPIRE' : EXPIRE,
    'METHOD' : METHOD,
    'WXSHARE' : WxShare,
    'ROW_ACOUNT' : ROW_ACOUNT,
    'SERVER_URL' : "http://api.test.qicheng51.com/",  //服务器url
    //'SERVER_URL' : "http://"+window.location.host+"/",
    //'SERVER_URL' : 'http://api.qicheng51.localhost/',
    'APP_LICATION' : 'api/',  //项目名
    'APPID' : '1',
    'PLATFORM' : 'web',
    'VERSION' : '1.0',
    'API_LIST' : {  //api接口列表
        'JSSDK_SIGNPACKAGE' : 'jssdk/signPackage',  //微信js
        /* 用户认证接口 */
        'AUTH_GETSALT' : 'auth/salt',       //盐获取
        'AUTH_GETCODE' : 'auth/getCode',    //验证码获取
        'AUTH_REGISTER' : 'auth/register',  //用户注册 手机、邮箱
        'AUTH_LOGIN' : 'auth/login',        //用户登录
        'AUTH_LOGINPHONEs' : 'auth/loginPhone',//用户手机验证码登录
        'AUTH_LOGOUT' : 'auth/logout',      //登出
        'AUTH_RESET' : 'auth/reset',        //密码重置
        'AUTH_SOCIAL_QQ' : 'auth/social/qq',//QQ登录
        'AUTH_SOCIAL_WECHAT' : 'auth/social/wechat',//微信登录
        'AUTH_BIND' : 'auth/bind',          //用户绑定邮箱或手机号
        /*用户信息接口*/
        'USER_COMPLETEINFO' : 'user/CompleteInfo', //完善个人信息
        'USER_DETAIL' : 'user/detail',             //用户详细信息
        'USER_M_NICKNAME' : 'user/modifyNickname', //修改用户昵称
        'USER_M_INTRO' : 'user/modifyIntro', // 修改介绍
        'USER_M_AVATAR' : 'user/modifyAvatar', //修改头像
        'USER_APPLYFOREXPERT' : 'user/applyforExpert',//申请成为达人
        'USER_MODIFYIMSTATUS' : 'user/modifyImStatus',//修改移民状态
        'USER_MODIFYIMCOUNTRY' : 'user/modifyImCountry',  //修改意向国家
        /*项目*/
        'PROJECT_LISTS' : 'project/lists',            //项目列表数据
        'PROJECT_IMMICOUNTRY' : 'project/immiCountry',//移民国家
        'PROJECT_IMMIYPE' : 'project/immiType',        //移民类型
        'PROJECT_DETAIL' : 'project/detail',          //项目详细
        'PROJECT_BRIEF' : 'project/brief',            //项目简要信息
        'PROJECT_IMMISTATUS' : 'project/immiStatus',  //移民状态
        'PROJECT_APPONITMENT' : 'project/appointment',//预约项目
        'PROJECT_APPOINTMENT_INFO': 'project/appointmentInfo', //预约信息
        'PROJECT_HANDING' : 'project/handing', //签约项目
        'PROJECT_SERVE_FEE' : 'project/serveFeeItems', // 费用项
        'PROJECT_SIGN' : 'project/sign', // 签约项目
        'PROJECT_SIGN_INFO' : 'project/signInfo', // 签约信息
        'PROJECT_ORDER_INFO' : 'project/orderInfo', // 订单信息
        'PROJECT_PAY_NOTIFY' : 'project/payNotify', // 支付通知
        'PROJECT_EVALUATEINFO' : 'project/evaluateInfo',// 评价信息获取
        'PROJECT_EVALUATE' : 'project/evaluate',  // 评价
        'PROJECT_AGENTLISTS' : 'project/agentLists',  //经纪人项目列表数据
        /*问答*/
        'ASK_GETHOTEXPERTS' : 'ask/getHotExpertsByType', //根据 海外华人/专业人士/热心问答者 拉取专家列表
        'ASK_POSTANSWER' : 'ask/postAnswer',             //发表回答
        'ASK_POSTCOMMENT' : 'ask/postComment',           //发表回答的评论
        'ASK_POSTASK' : 'ask/postAsk',                   //提交问题
        'ASK_GETASKDETAIL' : 'ask/getAskDetail',         //问答详情 最近的100个回答
        'ASK_GETANSWERBYEXPERT' : 'ask/getAnswerByExpert',//获取专家的时间线
        'ASK_FAV_ASK' : 'ask/fav_ask',                   //点赞问题
        'ASK_FAV_EXPERT' : 'ask/favExpert',              //点赞达人  
        'ASK_FAV_ANS' : 'ask/favAnswer',                 //点赞回答
        'ASK_GETANSWERLIST_BYAUDIOID' : 'ask/getAnswerListByAudioId',   //根据音频id获取其问答列表,支持翻页
        'ASK_GETEXPERTCOUNTRYLIST' : 'ask/getExpertCountryList',    //拉取国家列表
        'ASK_ADDAUDIO' : 'ask/addAudio',    //添加音频
        'ASK_GETANSLISTBYUSERID' : 'ask/getAnsListByUserid',//获取我的回答
        'ASK_GETCOMMEDLISTBYUSERID' : 'ask/getCommedListByUserid',//获取评论我的
        'ASK_GETASKLISTBYUSERID' : 'ask/getAskListByUserid', //获取我的提问
        'ASK_GETASKEDLISTBYUSERID' : 'ask/getAskedListByUserid', //获取向我提问的 type 1 我的发帖;不带则为向我的提问
        'ASK_GETSHORTCUTURLS' : 'ask/getShortcutUrls2',  //获取轮播图
        'ASK_GETASKLISTBYOTHERUSERID' : 'ask/getAskListByOtherUserid',  //获取其他人的帖子列表
        /*项目测试*/
        'MATCH_POSTEXAM' : 'match/postExam',     //提交答卷
        'MATCH_GETANSWER' : 'match/getAnswer',   //获取某个用户答卷
        'MATCH_GETRESULTLIST' : 'match/getResultList', //获取匹配结果
        'MATCH_UPDATEMCHANSPHONE' : 'match/updateMchAnsPhone', //更新某份答卷的手机号

        /*图片上传*/
        'UPLOAD_IMAGE' : 'upload/image', //图片上传
        'UPLOAD_POSTIMAGE' : 'upload/postImage', //图片上传 base64
        'UPLOAD_QINIUTOKEN' : 'upload/qiniuToken',  //七牛token
        /*社区*/
        'SOCIAL_GETFORUMTYPELIST' : 'social/getForumTypeList',  //获取论坛分类列表
        'SOCIAL_GETHOMELIST' : 'social/getHomeList',    //社区默认时间列表
        'SOCIAL_GETPOSTDETAIL' : 'social/getPostDetail',    //获取帖子详情
        'SOCIAL_POSTMOMENT' : 'social/postMoment',      //发表一个帖子
        'SOCIAL_POSTREPLY' : 'social/postReply',        //发表帖子的回复
        'SOCIAL_POSTCOMMENT' : 'social/postComment',    //发表回复的评论
        'SOCIAL_GETSOCIALTOPIC' : 'social/getSocialTopic',    //拉取首页的社区专题列表
        'SOCIAL_GETLIST_BYCOUNTRY' : 'social/getForumTypeListByCountry',    //获取论坛分类列表，按国家分类
        'SOCIAL_GETPOSTLIST_BYCOUNTRY' : 'social/getPostListByCountry',     //根据国家/post_id/二级分类 来获取帖子列表
        'SOCIAL_GETCOUNTRYSCDTYPELIST' : 'social/getCountryScdtypeList',    //获取国家，分类列表
        /*个人中心*/ 
        'SOCIAL_GETMYREPLAY' : 'social/getMyReplay',  //获取我的回帖
        'SOCIAL_GETREPLAYME' : 'social/getReplayMe',  //获取回复我的
        /*顾问*/
        'ADVISER_GETLISTS' : 'adviser/getLists',        //获取顾问列表
        'ADVISER_GETDETAILS' : 'adviser/getDetail',    //获取顾问详情
        'ADVISER_GETCOMMENTLIST' : 'adviser/getCommentList', //获取点评列表
        /*微信支付*/
        'PAY_WXPAYJSTOKEN' : 'pay/wxPayJsToken', // 微信支付
        'PAY_WXPAYORDERTOKEN' : 'pay/wxPayOrderToken',//微信支付by订单
        /*在线办理handle*/
        'HANDLE_GETFILELIST' : 'handle/getFileList',   //获取文件清单列表
        'HANDLE_GETLIST' : 'handle/getList',    //在办项目列表
        'HANDLE_GETDETAIL' : 'handle/getDetail',    //获取在办项目详细情况
        'HANDLE_EVALUATE' : 'handle/evaluate',  //步骤点评
        'HANDLE_EVALUATEINFO' : 'handle/evaluateInfo',  //步骤点评信息获取
        'HANDLE_GETFEELIST' : 'handle/getFeeList',  //获取费用信息
        /*agent接口*/
        'AGENT_RECOMDCUSTMONPRJ' : 'http://devagent.qicheng51.com/agent/recomdCustmOnPrj', //通过产品页发送推荐项目邮件

    },

    'WEB' : '/mobile/',
    'HTML':{
        // '标记' : ['页面路径', 'true : 需要登录 false : 不需要登录']
        /*用户认证专区*/
        'login' : ['web/sign/login', false],    //登录页面
        'register' : ['web/sign/register', false],  //注册,绑定,重置页面
        'personinfo' : ['web/sign/personinfo', false], //用户完善信息页面
        'qichengcode' : ['web/sign/qichengcode',false], //关注公众号

        /*主项目专区*/
        'index' : ['index', false],
        'appointment' : ['web/project/appointment', false], // 预约
        'list' : ['web/project/projectlist', false], // 列表页
        'intro' : ['web/project/projectintro', false], // 项目介绍
        'booking' : ['web/project/projectbooking', true], // 项目办理
        'sign' : ['web/project/projectsign', true], // 签约页面
        'servicerule': ['web/project/servicerule', true], // 服务条款
        'order' : ['web/project/projectorder', true], // 订单处理
        'servicerappraise' : ['web/project/servicerappraise', false], // 评价

        /*问答专区*/
        'questionbar' : ['web/questionbar/questionbar', false], //问答主页
        'questiondetail' : ['web/questionbar/questiondetail', false], //问答详情
        'talent' : ['web/questionbar/talent', false], //达人主页
        'edit' : ['web/questionbar/edit', false], //编辑页面
        'addvideo' : ['web/questionbar/addvideo', true], //添加音频页面
        'videoshare' : ['web/questionbar/videoshare',false], //音频问答页
        'applytalent' : ['web/questionbar/applytalent',true],//申请成为达人
        /*项目评估*/
        'evaluate' : ['web/evaluate/evaluate', false], // 项目评估页面
        'testmatch' : ['web/evaluate/testmatch',false], // 结果匹配筛选 
        /*个人中心*/
        'my' : ['web/personal/my',true], //个人中心页面
        'myquestion' : ['web/personal/myquestion',true], //我的问答
        'mypost' : ['web/personal/mypost',true],    //我的社区
        
        /*社区*/
        'community' : ['web/community/community',false],  //社区主页
        'postdetail' : ['web/community/postdetail',false],  //帖子详情页
        'community-nav' : ['web/community/community-nav',false], //社区导航
        'social' : ['web/community/social',false],  //国家社区专题
        'editpost' : ['web/community/editpost',false], //发表帖子
        'indextopic' : ['web/community/indextopic',false], //首页社区推荐
        /*顾问*/
        'adviser' : ['web/adviser/adviser',false],  //顾问列表
        'adviserdetail' : ['web/adviser/adviserdetail',false],  //顾问详情
        'advisercase' : ['web/adviser/advisercase',false],      //顾问案例
        /*下载app*/
        'appguide':['web/app/appguide',false], //下载app
        /*办理*/
        'payment':['web/handle/payment',true],  //费用支付
        'handle':['web/handle/handle',true],   //步骤办理
        'myhandle':['web/personal/myhandle',true],   //步骤办理
        'schedule':['web/handle/payment',true], //步骤反馈
        'sourcematerial':['web/handle/sourceMaterial',true],//材料列表
        /*activity*/
        'abank' : ['web/activity/abank.html',false],
    },
}
if(window.location.hostname=="m.qicheng51.com"){
    API.SERVER_URL="http://api.qicheng51.com/";
    API.DEBUG =0;
    API.API_LIST.AGENT_RECOMDCUSTMONPRJ = "http://agent.qicheng51.com/agent/recomdCustmOnPrj";
}
return API;
});
