var Tsex = "g";// 选择性别
$(".home_personage div").on("click", function () {
    // Btnmusic.play();
    Tsex = $(this).data("sex");
    $(".home_sex_av,.home_sex_t,.home_sextip,.home_sex_ac").hide();
    $(this).find(".home_sex_av,.home_sex_t").show();
    $(".home_btn").fadeIn(1000);
});

// 确认性别
$(".home_btn").on("click", function () {
    // Btnmusic.play();
    $(".Scene_ico div").eq(0).addClass("game_Active");
    $(".Scene_box").fadeIn();
    AddShpFun(1);
    MeunFun();
    ResetFun()
});

AddIcon("Scene_ico",5,"Scene_ico");

function ResetFun() {
    $(".gamepage").fadeIn().siblings().hide();
    $(".home_sex_av,.home_sex_t,.home_sextip,.home_sex_ac").hide();
    $(".game_ok").hide();
    $(".gameicobox div").removeClass("game_Active");
    $(".game_tipbox").fadeIn();
    $(".Scene_box").show().siblings(".game_menubox").hide();
    $(".gameicobox1").show().siblings(".gameicobox").hide();
    $(".gameMenu_btn div img").css("opacity", 0);
    $(".gameMenu_btn div").eq(0).find("img").css("opacity", 1);
    $(".Scene_ico").scrollLeft(0);
}

function MeunFun() {
    AddIcon("game_icobox1", 4, "posture_" + Tsex);

    var Dress_num = 10;
    var hairnum = 8;
    if (Tsex == "b") {
        Dress_num = 8;
        hairnum = 9;
    }
    AddIcon("game_hair", hairnum, "hairdo_" + Tsex + "_ico");//头发
    AddIcon("game_model", 11, "expression_ico");//脸部装饰
    AddIcon("game_icobox3", Dress_num, "Dress_ico_"+Tsex);//服装

}

// 返回首页选择性别
$(".game_Return").on("click", function () {
    // Btnmusic.play();
    $(".homepage").fadeIn().siblings().hide();
    $(".home_sex_t,.home_sex_ac").hide();
    $(".home_sex_ac,.home_sextip").show();
    $(".home_sex_av,.home_btn").hide();
    $(".gameicobox1").show().siblings().hide();
    $(".game_ok,.game_menubox").hide()
});

function AddIcon(Id, num, name) {
    $("." + Id).html("");
    for (var ii = 1; ii <= num; ii++) {
        $("." + Id).append('<div class=""><img src="https://workathome.elloworld.com/Public/img/' + name + ii + '.png?v=0.11" class="xy50"></div>');
    }
}


// 新手教程
$(".game_tipbox").on("click", function () {
    // Btnmusic.play();
    // $(".Scene_box,.game_Return").removeClass("disabled");
    $(".game_tipbox").fadeOut();
});


var shepINdex=1;//默认第一个场景
// 选择场景
$(".Scene_box").on("click",".Scene_ico div", function () {
    // Btnmusic.play();
    shepINdex = $(this).index() + 1;
    AddShpFun(shepINdex);
    $(".game_tipbox").fadeOut()
});


// 确认场景下一步
$(".Scene_ok").on("click", function () {
    // Btnmusic.play();
    $(".Scene_box").fadeOut().siblings(".game_menubox").show();
    $(".game_tipbox").fadeOut();
});

var MenuON = true;

function menuonoff() {
    $(".game_menubox").css("-webkit-transform", "translateY(0)");
    $(".game_ico").css("-webkit-transform", "rotate(180deg)");
    MenuON = true;
}

// 关闭菜单
$(".game_ico").on("click", function () {
    if (!MenuON) {
        menuonoff();
        return false;
    }
    // Btnmusic.play();
    $(".game_menubox").css("-webkit-transform","translateY(2.1rem)");
    $(".game_ico").css("-webkit-transform", "rotate(0)");
    MenuON = false;
});

AddIcon("game_icobox4", 11, "work_ico");//添加办公必备
AddIcon("game_icobox5", 15, "Pendant_ico");//添加心里话
AddIcon("game_icobox6", 34, "Interferon_ico");//添加办公搭档

// 选择装饰
$(".gameMenu_btn div").on("click", function () {
    // Btnmusic.play();
    var index = $(this).index();
    $(".gameMenu_btn div img").css("opacity", 0);
    $(".gameMenu_btn div").eq(index).find("img").css("opacity", 1);
    $(".gameicobox" + (index + 1)).fadeIn().siblings().hide();
    if (!MenuON) {
        menuonoff()
    }
});


// 选择姿势
$(".game_icocont").on("click", ".game_icobox1 div", function () {
    if (Isren) {
        // Btnmusic.play();
        PerArr[0] = $(this).index() + 1;
        // $(this).addClass("game_Active").siblings().removeClass("game_Active");
        AddRen();
    }

});


// 选择造型
$(".game_icocont").on("click", ".game_model div", function () {
   if(Isren){
       // Btnmusic.play();
       PerArr[2] = $(this).index()+1;
       $(this).addClass("game_Active").siblings().removeClass("game_Active");
       AddRen();
   }
});

// 重置造型
$(".game_icocont").on("click", ".game_hadebtn", function () {
    if(Isren){
        PerArr[2]=0;
        PerArr[3]=1;
        AddRen();
    }
});


// 选择发型
$(".game_icocont").on("click", ".game_hair div", function () {
   if(Isren){
       // Btnmusic.play();
       PerArr[3] = $(this).index() + 1;
       $(this).addClass("game_Active").siblings().removeClass("game_Active");
       AddRen();
   }
});


// 选择工服
$(".game_icocont").on("click", ".game_icobox3 div", function () {
   if(Isren){
       // Btnmusic.play();
       PerArr[1] = $(this).index() + 1;
       $(this).addClass("game_Active").siblings().removeClass("game_Active");
       AddRen();
   }
});

// 必备工具
$(".game_icocont").on("click", ".game_icobox4 div", function () {
    // Btnmusic.play();
    var id = $(this).index() + 1;
    var url = "https://workathome.elloworld.com/Public/img/work_" + id + ".png";
    Addicofun(url);

});

// 挂件心里话
$(".game_icocont").on("click", ".game_icobox5 div", function () {
    // Btnmusic.play();
    var id = $(this).index() + 1;
    var url = "https://workathome.elloworld.com/Public/img/Pendant_" + id + ".png";
    Addicofun(url, false, false, true);


});

// 办公搭档
$(".game_icocont").on("click", ".game_icobox6 div", function () {
    // Btnmusic.play();
    var id = $(this).index() + 1;
    var url = "https://workathome.elloworld.com/Public/img/Interferon_" + id + ".png?v=0.11";
    Addicofun(url);
});


// 合成
$(".game_ok").on("click", function () {
    MtaH5.clickStat("create_poster");
    // Btnmusic.play();
    deleteCtr();
    setTimeout(function () {
        var imgsrc = new Image();
        imgsrc.src = canvas.toDataURL();
        imgsrc.onload = function () {
            var poster = new createjs.Bitmap(imgsrc);
            var OBox = new createjs.Container();
            OBox.addChild(poster);
            OBox.cache(0, 50, 750, 1297);
            var photo = OBox.cacheCanvas.toDataURL();//生成图片地址，1为质量
            $(".postre_src").attr("src", photo);
            OBox.cache(0, 50, 750, 1250);
            var photo2 = OBox.cacheCanvas.toDataURL();
            DressStage.removeAllChildren();
            var bg = new Image();
            bg.src = "https://workathome.elloworld.com/Public/img/poster_bg.jpg?v=0.11";
            bg.onload = function () {
                var Tbg = new createjs.Bitmap(bg);
                DressCanvas.width = bg.width;
                DressCanvas.height = bg.height;
                var postimg = new Image();
                postimg.src = photo2;
                postimg.onload = function () {
                    var Tpost = new createjs.Bitmap(postimg);
                    Tpost.set({
                        x: 63,
                        y: 93,
                        scaleX: 0.828,
                        scaleY: 0.828
                    });
                    var tit = new Image();
                    tit.src = "https://workathome.elloworld.com/Public/img/post_tit.png?v=0.11";
                    tit.onload = function () {
                        var Ttit = new createjs.Bitmap(tit);
                        Ttit.set({
                            x: 60,
                            y: 1130
                        });
                        var code = new Image();
                        code.src = "https://workathome.elloworld.com/Public/img/qrcode.png?v=0.11";
                        code.onload = function () {
                            var Tcode = new createjs.Bitmap(code);
                            Tcode.set({
                                x: 564,
                                y: 1016
                            });
                            DressStage.addChild(Tbg, Tpost, Ttit, Tcode);
                            DressStage.update();
                            var posterimg = DressCanvas.toDataURL();//生成图片地址，1为质量
                            $(".posterimg").attr("src", posterimg);
                            $(".posterbox").fadeIn().siblings().hide();
                        }
                    }
                }
            }
        }
    }, 500);
});


// 再来一次
$(".Again_btn").on("click", function () {
    AddShpFun(1);
    ResetFun();
});

// link
$(".end_link").on("click", function () {
    // Btnmusic.play();
    MtaH5.clickStat("skip_longimg")
    $(".Ending").fadeIn();
});

// $(".Ending").scroll(function () {
//     var divwidth = $("#wrapper").width();//设备真实宽度
//     var vv = 750 / divwidth;//宽度比例
//     var nScrollWidth = $(this)[0].scrollWidth * vv;//滚动条总宽度
//     var ww = nScrollWidth - $(this).width() * vv;//滚动条差
//     var nScrollLeft = ($(this)[0].scrollTop * vv - ww);//当前滚动条的宽度
//     // console.log(nScrollLeft);
//     if (nScrollLeft > 200) {
//         $(".End_Return").fadeIn();
//     }
// });

$(".game_icobox,.Scene_ico").scroll(function () {
    var divwidth = $("#wrapper").width();//设备真实宽度
    var vv = 750 / divwidth;//宽度比例
    var nScrollWidth = $(this)[0].scrollWidth * vv;//滚动条总宽度
    var ww = nScrollWidth - $(this).width() * vv;//滚动条差
    var Left = $(this).scrollLeft();//当前滚动条的宽度
    var Right = -($(this)[0].scrollLeft * vv - ww);//当前滚动条的宽度

    if (Left <= 5) {
        $(this).siblings(".game_arrowL").hide()
    }else {
        $(this).siblings(".game_arrowL").show()
    }

    if(Right<=5){
      $(this).siblings(".game_arrowR").hide()
    }else {
        $(this).siblings(".game_arrowR").show()
    }
});

$(".game_icobox2").scroll(function () {
    var divwidth = $("#wrapper").width();//设备真实宽度
    var vv = 750 / divwidth;//宽度比例
    var nScrollWidth = $(this)[0].scrollWidth * vv;//滚动条总宽度
    var ww = nScrollWidth - $(this).width() * vv;//滚动条差
    var Left = $(this).scrollLeft();//当前滚动条的宽度
    var Right = -($(this)[0].scrollLeft * vv - ww);//当前滚动条的宽度

    if (Left <= 5) {
        $(this).siblings(".game_arrowL").hide()
    }else {
        $(this).siblings(".game_arrowL").show()
    }

    if(Right<=5){
        $(this).siblings(".game_arrowR").hide();
    }else {
        $(this).siblings(".game_arrowR").show()
    }

});


$(".End_Return").on("click", function () {
    // Btnmusic.play();
    $(".posterbox").fadeIn().siblings().hide();
});

// if(PageHeight(750)<1300){
    // $(".Again_btn").css("top","1.53rem");
    // $(".end_link").css("top","12.63rem");
    // $(".long_btn").css("top","12.1rem");
// }


$(".End_btns").on("click",function () {
    $(".End_btns").find("img").attr("src","https://workathome.elloworld.com/Public/img/End_btns1.png?v=0.11");
    $(this).find("img").attr("src","https://workathome.elloworld.com/Public/img/End_btns2.png?v=0.11");
});


$(".Ending_1 .End_btns").on("click",function () {
    // QQ
    MtaH5.clickStat("lingk_qq");
    window.location.href="http://im.qq.com";
});
$(".Ending_2 .End_btns").on("click",function () {
    // 企业微信
    MtaH5.clickStat("link_wx");
    window.location.href="https://work.weixin.qq.com/wework_admin/commdownload?from=2020start";
});
$(".Ending_3 .End_btns").on("click",function () {
    // 腾讯会议
    MtaH5.clickStat("link_huiyi");
    window.location.href="https://meeting.tencent.com/download-center.html?from=50033";
});
$(".Ending_4 .End_btns").on("click",function () {
    // 腾讯文档
    MtaH5.clickStat("link_wendang");
    window.location.href="https://docs.qq.com/scenario/app-guide.html?need_click=1";
});
$(".Ending_5 .End_btns").on("click",function () {
    // 腾讯微云
    MtaH5.clickStat("link_weiyun");
    window.location.href="https://mobile.qzone.qq.com/l?g=3819";
});

var timeOutEvent;
$(".posterimg").on({
    touchstart: function(e) {
        // 长按事件触发
        timeOutEvent = setTimeout(function() {
            timeOutEvent = 0;
            MtaH5.clickStat("save_image");
        }, 400);
        //长按400毫秒
        // e.preventDefault();
    },
    touchmove: function() {
        clearTimeout(timeOutEvent);
        timeOutEvent = 0;
    },
    touchend: function() {
        clearTimeout(timeOutEvent);
        timeOutEvent = 0;
        return false;
    }
})
