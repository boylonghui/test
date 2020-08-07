// 图片自适应
$("img").each(function () {
    var obj = $(this);
    var img = new Image();
    img.src = $(this).attr("src");
    // obj.attr("src", $(this).attr("src") + "?v=" + Math.random());
    img.onload = function () {
        obj.width(img.width / 100 + "rem");
    }
});

// alert隐藏域名
window.alert = function (name) {
    var iframe = document.createElement("IFRAME");
    iframe.style.display = "none";
    iframe.setAttribute("src", 'data:text/plain,');
    document.documentElement.appendChild(iframe);
    window.frames[0].window.alert(name);
    iframe.parentNode.removeChild(iframe);
};

// 横竖屏切换效果
function screenOrientation(fn) {
    function is_ios() {
        return !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
    }
    var fn = fn || {};
    var supportsOrientation = (typeof window.orientation == 'number' && typeof window.onorientationchange == 'object');
    var xEvent = is_ios() ? 'orientationchange' : 'resize';
    var mark1 = -1, mark2 = -2;
    var updateOrientation = function () {
        switch (window.orientation) {
            case 90:
            case-90:
                mark1 = 1;
                if (mark1 != mark2) {
                    mark2 = 1;
                    if (fn.x) fn.x()
                }
                break;
            default:
                mark1 = 2;
                if (mark1 != mark2) {
                    mark2 = 2;
                    if (fn.y) fn.y()
                }
                break
        }
    };
    if (supportsOrientation) {
        window.addEventListener(xEvent, function () {
            updateOrientation()
        }, false)
    }
    if (is_ios()) {
        updateOrientation()
    } else {
        if ((window.innerWidth > window.innerHeight)) {
            if (fn.x) fn.x()
        } else {
            if (fn.y) fn.y()
        }
    }
}

screenOrientation({
    x: function () {
        $("#shuping").show();
    },
    y: function () {
        $("#shuping").hide();
    }
});

// 设备设计稿的高度
function PageHeight(width) {
    return document.body.clientHeight * (width / document.body.clientWidth);
}

//判断超出设计高度
function Height_X(width, maxHeight) {
    if (PageHeight(width) >= maxHeight) {
        return true;
    }
    return false;
}


//动画完成
function Animationendf(classs) {
    // animationstart
    document.querySelector(classs).addEventListener('animationend', function () {
        return true;
    }, false);
    return false;
}


//视频控制
// window.enableInlineVideo(document.getElementById('video'), true);// 视频兼容微博
// var video = document.getElementById('video');

// 音乐控制
var Issound = false;
var BGM = document.getElementById('BGM');
var Btnmusic = document.getElementById('Btnmusic');
document.addEventListener('DOMContentLoaded', function () {
    function audioAutoPlay() {
        document.addEventListener("WeixinJSBridgeReady", function () {
            // BGM.play();
            Btnmusic.play();
            Btnmusic.pause();
        }, false);
    }

    // audioAutoPlay();
});

function BgmPaly() {
    Issound = true;
    BGM.play();
    $(".musicBtn").addClass("musics_am");
}

function BgmPause() {
    Issound = false;
    BGM.pause();
    $(".musicBtn").removeClass("musics_am");
}

$(".musicBtn").on("click", function () {
    if (!BGM.paused) {
        BgmPause()
    } else {
        BgmPaly()
    }
});

// 前后台切换
function BeforeAfter() {
    var hiddenProperty = 'hidden' in document ? 'hidden' :
        'webkitHidden' in document ? 'webkitHidden' :
            'mozHidden' in document ? 'mozHidden' :
                null;
    var visibilityChangeEvent = hiddenProperty.replace(/hidden/i, 'visibilitychange');
    var onVisibilityChange = function () {
        if (!document[hiddenProperty]) {
            // alert("页面激活");
            if (Issound) {
                setTimeout(function () {
                    $("#BGM")[0].play();
                }, 200)
            } else {
                $("#BGM")[0].pause();
            }
        } else {
            $("#BGM")[0].pause();
            // alert("页面隐藏")
        }
    };
    document.addEventListener(visibilityChangeEvent, onVisibilityChange);
}

// BeforeAfter();

// 解决苹果输入框弹起
// $("textarea,input,select").blur(function () {
//     window.scrollTo(0, 0);
// });
function inputTop() {
    var inputItems = document.querySelectorAll("input");
    inputItems.forEach(function (ele) {
        ele.addEventListener("blur", function () {
            window.scrollTo(0, 0)
        })
    });
    var inputItems = document.querySelectorAll("select");
    inputItems.forEach(function (ele) {
        ele.addEventListener("blur", function () {
            window.scrollTo(0, 0)
        })
    });
    var inputItems = document.querySelectorAll("textarea");
    inputItems.forEach(function (ele) {
        ele.addEventListener("blur", function () {
            window.scrollTo(0, 0)
        })
    });
    $("input,select").blur(function () {
        setTimeout(function () {
            var scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0;
            window.scrollTo(0, Math.max(scrollHeight - 1, 0));
        }, 100);
    })
}

inputTop();


// 网络图片转base64
function getBase64(imgUrl) {
    return new Promise(function (resolve, reject) {
        window.URL = window.URL || window.webkitURL;
        var xhr = new XMLHttpRequest();
        xhr.open("get", imgUrl, true);
        xhr.responseType = "blob";
        xhr.onload = function () {
            if (this.status == 200) {
                var blob = this.response;
                let oFileReader = new FileReader();
                oFileReader.onloadend = function (e) {
                    let base64 = e.target.result;
                    resolve(base64);
                    return base64;
                };
                oFileReader.readAsDataURL(blob);
                var img = document.createElement("img");
                img.onload = function (e) {
                    window.URL.revokeObjectURL(img.src);
                };
                let src = window.URL.createObjectURL(blob);
                img.src = src
            }
        };
        xhr.send();
    });
}


//判断是否是微信浏览器的函数
function isWeiXin() {
    var ua = window.navigator.userAgent.toLowerCase();
    //通过正则表达式匹配ua中是否含有MicroMessenger字符串
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        return true;
    } else {
        return false;
    }
}

// 获取参数值
function GetValue(Value) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == Value) {
            return pair[1];
        }
    }
    return (false);
}

// 判断是否是苹果系统
function isIos() {
    var u = navigator.userAgent;
    if (!!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
        return true;
    } else {
        return false;
    }
}

//时间戳转时间
function RiQi(sj) {
    var now = new Date(sj * 1000);
    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var date = now.getDate();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();
    // return   year+"-"+month+"-"+date+"   "+hour+":"+minute+":"+second;
    return year + "-" + month + "-" + date;
}


// 活动结束时间
function startend(date, tip) {
    var now_time = Date.parse(new Date());
    // var end_time = new Date("2019/11/13 00:00:00".substring(0, 19)).getTime();
    var end_time = new Date(date.substring(0, 19)).getTime();
    if (now_time > end_time) {
        alert(tip);
    }
}

//生成从minNum到maxNum的随机数
function randomNum(minNum, maxNum) {
    switch (arguments.length) {
        case 1:
            return parseInt(Math.random() * minNum + 1, 10);
            break;
        case 2:
            return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
            break;
        default:
            return 0;
            break;
    }
}

// 生成二维码
function addqrcode(width, height, url) {
    $("body").append('<div id="qrcodes" class="hide"></div>')
    var qrcodes = new QRCode(document.getElementById("qrcodes"), {width: width, height: height});
    qrcodes.clear(); // 清除
    qrcodes.makeCode(url);
    var qrcodeurl = $('#qrcodes canvas')[0].toDataURL("image/jpeg", 1);
    if (qrcodeurl) {
        return qrcodeurl;
    }
}


// 禁用滚动条
// $('#wrapper>*').on('touchmove', function (e) {
//     e.preventDefault();
// });

// 预加载加载
//preloadjs.js
// var loader = new createjs.LoadQueue(false);
// loader.addEventListener("progress", function (e) {
//     var percent = Math.ceil(e.progress * 100);
//     $(".loadnum").html(percent + "%");
//     $(".load_ico2").css("width", percent + "%");
//     // console.log(percent)
// });
// //loading完成
// loader.addEventListener("complete", function () {
//     $(".loadnum").html("100%");
//     $(".load_ico2").css("width", "100%");
//     setTimeout(function () {
//         $(".homepage").fadeIn().siblings(".pages").hide();
//     }, 500);
// });
// // loader.loadManifest(resJson);

//imagesloades.js
//loading列表
var loader = new window.PxLoader();
//声明资源文件列表
var fileList = imgjson;
for (var i = 0; i < fileList.length; i++) {
    loader.addImage(fileList[i]);
}
loader.addProgressListener(function (e) {
    var percent = Math.round((e.completedCount / e.totalCount) * 100);
    $(".loadnum").html(percent + "%");
    $(".load_ico2").css("width", percent + "%");
    // console.log(percent)
});
// 加载完成
loader.addCompletionListener(function () {
    $(".loadnum").html("100%");
    $(".load_ico2").css("width", "100%");
    setTimeout(function () {
        $(".homepage").fadeIn().siblings(".pages").hide();
    }, 500);
});

