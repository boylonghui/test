;(function () {
    function is_mobile() {
        var reg=/phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone/i;
        return reg.test(navigator.userAgent.toLowerCase());
    }
    function addStyleNode( str){
        var styleNode=document.createElement("style");
        styleNode.type="text/css";
        styleNode.innerHTML=str;
        document.getElementsByTagName("head")[0].appendChild( styleNode );
        return styleNode;
    }
    /**
     * css元素尺寸=设计稿元素尺寸/100;
     */
    var psw= 750;//设计稿尺寸
    var change = 'orientationchange' in window ? 'orientationchange' : 'resize';
    function calculate() {
        var deviceWidth = document.documentElement.clientWidth;
        if (deviceWidth < 320) {
            deviceWidth = 320;
        }
        if(!is_mobile()){
            if(deviceWidth>=psw){
                deviceWidth=psw;
            }
        };
        document.documentElement.style.fontSize = deviceWidth/psw*100 + 'px';
    }
    window.addEventListener(change, calculate, false);
    calculate();
    if(!is_mobile()){
        addStyleNode("#wrapper{max-width:"+psw+"px}");
    }
})();

// 安卓禁止右上角放大
(function(){
    if(typeof WeixinJSBridge=="object"&& typeof WeixinJSBridge.invoke == "function"){
        handleFontSize();
    }else{
        if(document.addEventListener){
            document.addEventListener("WeixinJSBridgeReady",handleFontSize,false);
        }else if(document.attachEvent){
            document.attachEvent("WeixinJSBridgeReady",handleFontSize);
            document.attachEvent("onWeixinJSBridgeReady",handleFontSize);
        }
    };
    function handleFontSize(){
        WeixinJSBridge.invoke("setFontSizeCallback",{
            "fontSize":0
        });
        WeixinJSBridge.on("menu:setfont",function(){
            WeixinJSBridge.invoke("setFontSizeCallback",{
                "fontSize":0
            });
        });
    };

})();

