// 好友
window.shareData1 = {
	title: "我在家复工/开课的姿势",
	desc: "疫情面前不低头，在家也要做贡献！",
    link: 'https://workathome.elloworld.com/',
    imgUrl: "https://workathome.elloworld.com/Public/img/share.png?v=0.11",
    success: function () {
        // _hmt.push(['_trackEvent', 'schroders', 'click', '分享好友']);
    },
    cancel: function () {
    }
};
//朋友圈
window.shareData2 = {
	title: "疫情面前不低头，在家也要做贡献！",
    link: 'http://workathome.elloworld.com/',
    imgUrl: "https://workathome.elloworld.com/Public/img/share.png?v=0.11",
    success: function () {
        // _hmt.push(['_trackEvent', 'schroders', 'click', '分享朋友圈']);
    },
    cancel: function () {
    }
};
if(/MicroMessenger/i.test(navigator.userAgent)) {
    $.getScript("https://res.wx.qq.com/open/js/jweixin-1.0.0.js", function callback() {
        $.ajax({
            type: "post",
            url: "https://game.elloworld.cn/wxapi/index/getSignPackage",
            dataType: 'json',
            data: {
                url: window.location.href
            },
            success: function(data) {
                // console.log(data);
                wx.config({
                    debug: false,
                    appId: data.data.appId,
                    timestamp: data.data.timestamp,
                    nonceStr: data.data.nonceStr,
                    signature: data.data.signature,
                    jsApiList: [
                        'onMenuShareTimeline',
                        'onMenuShareAppMessage',
                        'hideMenuItems',
                        'chooseImage',
                        'uploadImage'
                    ]
                })
                wx.ready(function() {
                    wx.onMenuShareAppMessage(shareData1);//好友
                    wx.onMenuShareTimeline(shareData2);//朋友圈
                    wx.hideMenuItems({
                        menuList: [
                            'menuItem:share:qq',
                            'menuItem:share:weiboApp',
                            'menuItem:favorite',
                            'menuItem:share:facebook',
                            // 'menuItem:copyUrl',
                            'menuItem:readMode',
                            'menuItem:openWithQQBrowser',
                            'menuItem:openWithSafari'
                        ]
                    });
                })
                wx.error(function(res) {
                   // console.log(res);
                })
            },
            error: function(xhr, ajaxOptions, thrownError) {
                // alert("Http status: " + xhr.status + " " + xhr.statusText + "\najaxOptions: " + ajaxOptions + "\nthrownError:" + thrownError + "\n" + xhr.responseText);
            }
        })
    })
}
