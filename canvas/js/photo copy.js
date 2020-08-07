var canvas = $('#canvas')[0];
var canvasW = canvas.width,
    canvasH = canvas.height;
var stage = new createjs.Stage(canvas);
createjs.Touch.enable(stage);


var lefts, tops, scaleVal, rotates = 0,
    ctrEle = null;

createjs.Ticker.timingMode = createjs.Ticker.RAF;
createjs.Ticker.addEventListener("tick", tick);
createjs.Ticker.setFPS(60);

function tick(event) {
    stage.update(event);
}

// 添加场景背景
function AddShpFun(num,IS) {
    remCtrEle="";
    PerArr = [1, 0, 0, 1];
    stage.removeAllChildren();
    var TimgBg = new Image();
    TimgBg.src = "https://workathome.elloworld.com/Public/img/game_bg_" + num + ".jpg";
    TimgBg.onload = function () {
        var bgimg = new createjs.Bitmap(TimgBg);
        var kong1 = new createjs.Bitmap("https://workathome.elloworld.com/Public/img/expression_0.png?v=0.1");
        var kong2 = new createjs.Bitmap("https://workathome.elloworld.com/Public/img/expression_0.png?v=0.1");
        stage.addChild(bgimg, kong1, kong2);
        if (num == 1) {
            var teaTable = new createjs.Bitmap("https://workathome.elloworld.com/Public/img/parlour_desk.png?v=0.1");
            stage.addChild(teaTable);
            stage.setChildIndex(teaTable, 1);
            teaTable.x = 0;
            teaTable.y = 824;
        }
        if (num == 4) {
            var teaTable = new createjs.Bitmap("https://workathome.elloworld.com/Public/img/Study_desk.png?v=0.1");
            stage.addChild(teaTable);
            stage.setChildIndex(teaTable, 1);
            teaTable.x = 0;
            teaTable.y = 544;
        }
        if (num == 5) {
            var teaTable = new createjs.Bitmap("https://workathome.elloworld.com/Public/img/kitchen_desk.png?v=0.1");
            stage.addChild(teaTable);
            stage.setChildIndex(teaTable, 1);
            teaTable.x = 0;
            teaTable.y = 752;
        }
    };
    $(".Scene_ico div").eq(num-1).addClass("game_Active").siblings().removeClass("game_Active");
}


var offset, update = false, idx = 0;
var remCtrEle;//是否是人
var ChildIndex;//图层层级
var Firstadd = true;//是否是第一次添加
function Addicofun(url, ren, IsSUcRen, Ispendant) {
    $(".game_menutip").remove();
    // url 图片地址
    // ren 是否是人物
    // 是否有人物在里面
    idx++;
    var imgBg = new Image();
    imgBg.src = url;
    imgBg.onload = function () {
        var cPhoto = new createjs.Bitmap(imgBg);
        rotates = cPhoto.rotation = 0;
        cPhoto.name = "bmp_" + idx;
        cPhoto.scaleX = cPhoto.scaleY = scaleVal = 1;

        // 画布中的图片居中摆放
        cPhoto.regX = imgBg.width / 2;
        cPhoto.regY = imgBg.height / 2;
        cPhoto.x = lefts = canvasW / 2;
        cPhoto.y = tops = canvasH / 2;

        // 画布中的图片可以移动、缩放和旋转
        if (IsSUcRen) {
            cPhoto.rotation = remCtrEle.rotation;
            cPhoto.scaleX = cPhoto.scaleY = scaleVal = remCtrEle.scaleY;
            cPhoto.x = lefts = remCtrEle.x;
            cPhoto.y = tops = remCtrEle.y;
        }
        var oFrame = new createjs.Container();
        oFrame.addChild(cPhoto);
        if (Firstadd == true) {
            Firstadd = false;
            $(".gametip").show();
            setTimeout(function () {
                $(".gametip").hide();
            },2000)
            // var Tip = new createjs.Bitmap("https://workathome.elloworld.com/Public/img/tip.png");
            // Tip.set({
            //     regX: 285 / 2,
            //     x: cPhoto.x,
            //     y: cPhoto.y + imgBg.height / 2
            // });
            // createjs.Tween.get(Tip, {loop: false})
            //     .to({scaleX: 1.02, scaleY: 1.02}, 150).to({scaleX: 1, scaleY: 1}, 150, createjs.Ease.quadOut)
            //     .call(function () {
            //         createjs.Tween.get(Tip, {loop: false})
            //             .wait(2000).to({alpha: 0}, 1000);
            //     });
            // stage.addChild(Tip)
        }
        stage.addChild(oFrame);
        // 判断为人物底图最底层
        ctrEle = cPhoto;
        if (ren == true) {
            $(".game_ok").show();
            remCtrEle = ctrEle;
            stage.setChildIndex(oFrame, 1);
        } else {
            if (Ispendant == true) {
                ChildIndex = stage.getNumChildren() - 1;
            } else {
                if (ChildIndex > 1) {
                    stage.setChildIndex(oFrame, ChildIndex - 1);
                }
            }
        }

        // 这里的ctr应该是选中的意思
        ctrEleAM();
        addCtr(ctrEle);
        update = true;
        cPhoto.on("click", function (evt) {
            deleteCtr();
            update = true;
            lefts = evt.target.x;
            tops = evt.target.y;
            ctrEle = oFrame.getChildByName(cPhoto.name);
            ctrEleAM();
            addCtr(ctrEle);
            // 不是人物选中的在最上层
            if (ren == true) {
                remCtrEle = ctrEle;
                stage.setChildIndex(oFrame, 1);
            } else {
                if (Ispendant == true) {
                    stage.setChildIndex(oFrame, stage.getNumChildren() - 1);
                } else {
                    if (ChildIndex > 1) {
                        stage.setChildIndex(oFrame, stage.getNumChildren() - 2);
                    } else {
                        stage.removeChild(oFrame);
                        stage.addChild(oFrame)
                    }

                }

            }
            stage.update(this);

        });
        cPhoto.on("pressup", function (evt) {
            // update = false;
            // console.log(evt)
        });
    };
}

// 合并人物
var PerArr = [1, 0, 0, 1];//姿势，服装,表情，发型
var DressCanvas = $('#DressCanvas')[0];
var DressStage = new createjs.Stage(DressCanvas);
var Isren = true;//是否有添加成功
function AddRen() {
    Isren = false;
    DressStage.removeAllChildren();
    // $(".game_icobox1 div").eq(PerArr[0] - 1).addClass("game_Active").siblings().removeClass("game_Active");
    $(".game_hair div").eq(PerArr[3] - 1).addClass("game_Active").siblings().removeClass("game_Active");
    // 姿势
    var ren = new Image();
    ren.src = "https://workathome.elloworld.com/Public/img/game_ren_" + Tsex + "_" + PerArr[0] + ".png";
    ren.onload = function () {
        DressCanvas.width = ren.width;
        DressCanvas.height = ren.height;
        var Tren = new createjs.Bitmap(ren);
        // 服装
        var dress = new Image();
        dress.src = "https://workathome.elloworld.com/Public/img/game_ren_" + Tsex + "_" + PerArr[0] + "_y" + PerArr[1] + ".png";
        dress.onload = function () {
            var Tdress = new createjs.Bitmap(dress);
            Tdress.x = ren.width - dress.width;
            Tdress.y = 2;
            // 表情
            var expr = new Image();
            expr.src = "https://workathome.elloworld.com/Public/img/expression_" + PerArr[2] + ".png";
            expr.onload = function () {
                var Texpr = new createjs.Bitmap(expr);
                Texpr.x = DressCanvas.width - expr.width+5;
                Texpr.y = -2;
                // console.log("表情",DressCanvas.width,expr.width,expr.y);
                // 发型
                var hair = new Image();
                hair.src = "https://workathome.elloworld.com/Public/img/hairdo_" + Tsex + PerArr[3] + ".png";
                hair.onload = function () {
                    var Thair = new createjs.Bitmap(hair);
                    console.log(Thair)
                    Thair.x = DressCanvas.width - hair.width+5;
                    Thair.y = -1;
                    // console.log("头发",DressCanvas.width,hair.width,Thair.y);
                    DressStage.addChild(Tren, Thair, Tdress,Texpr);
                    DressStage.update();
                    var photos = DressStage.toDataURL();//生成图片地址，1为质量
                    if (photos) {
                        if (remCtrEle) {
                            stage.removeChild(remCtrEle.parent);
                            // remCtrEle.children()[0]["image"].src=photos
                            // return false;
                            Addicofun(photos, true, true);
                            return;
                        }
                        Addicofun(photos, true);
                    }
                }
            }

        }
    }
}


// 添加边框效果
var BorderBox = new createjs.Container();
var border_s, Tdel;

function addCtr(ctrEle) {
    BorderBox.removeAllChildren();
    stage.removeChild(BorderBox);
    border_s = new createjs.Shape();
    border_s.graphics.setStrokeStyle(2).beginStroke("#0188fb").drawRect(0, 0, ctrEle["image"].width, ctrEle["image"].height);
// .setStrokeDash([10, 5], 0)//虚线
    border_s.regX = ctrEle.regX;
    border_s.regY = ctrEle.regY;
    BorderBox.rotation = ctrEle.rotation;
    border_s.scaleX = ctrEle.scaleX;
    border_s.scaleY = ctrEle.scaleY;
    BorderBox.x = ctrEle.x;
    BorderBox.y = ctrEle.y;
    var imgdel = new Image();
    imgdel.src = "https://workathome.elloworld.com/Public/img/delete.png";
    imgdel.onload = function () {
        Tdel = new createjs.Bitmap(imgdel);
        // Tdel.rotation=ctrEle.rotation;
        TdelMove();
        BorderBox.addChild(border_s, Tdel);
        stage.addChild(BorderBox);
        Tdel.on("click", function (evt) {
            if (ctrEle) {
                // Btnmusic.play();
                deleteCtr(true);
            }
        });
    }
}

// 删除选中效果
function deleteCtr(delIco) {
    if (!ctrEle) return;
    stage.removeChild(BorderBox);
    if (delIco) {
        // if (remCtrEle) {
        //     remCtrEle = null;
        // }
        stage.removeChild(ctrEle.parent);
    }

}

function TdelMove() {
    Tdel.x = (border_s.x - ctrEle["image"].width / 2) * ctrEle.scaleX - Tdel["image"].width / 2;
    Tdel.y = (border_s.y + ctrEle["image"].height / 2) * ctrEle.scaleX - Tdel["image"].height / 2;
    // Tmove.x = (border_s.x + ctrEle["image"].width / 2) * ctrEle.scaleX - Tmove["image"].width / 2;
    // Tmove.y = (border_s.y - ctrEle["image"].height / 2) * ctrEle.scaleX - Tmove["image"].height / 2;
}

var curStatus = 0; //记录当前手势的状态, 0:拖动, 1:缩放, 2:旋转
touch.on('#canvas', 'touchstart', function (ev) {
    if (!update) {
        return false;
    }
    curStatus = 0;
    scaleVal = ctrEle.scaleX;
    ev.preventDefault(); //阻止默认事件
});
// 开始拖动
touch.on('#canvas', 'drag', function (ev) {
    if (!update) {
        return false;
    }
    ctrEle.x = lefts + ev.x;
    ctrEle.y = tops + ev.y;
    BorderBox.x = lefts + ev.x;
    BorderBox.y = tops + ev.y;

});
// 拖动结束
touch.on('#canvas', 'dragend', function (ev) {
    if (!update) {
        return false;
    }
    lefts = lefts + ev.x;
    tops = tops + ev.y;
});
touch.on('#canvas', 'pinch rotate', function (ev) {
    if (!update || BorderBox.children.length != 2) {
        return false;
    }
    var ss = scaleVal * ev.scale;
    if (ss < 0.1) {
        return false;
    }
    ctrEle.scaleX = ctrEle.scaleY = ss;
    border_s.scaleX = border_s.scaleY = ss;
    TdelMove();
    var totalAngle = rotates + ev.rotation;
    if (ev.fingerStatus === 'end') {
        rotates = rotates + ev.rotation;
    }
    ctrEle.rotation = BorderBox.rotation = totalAngle;
});
// touch.on('#canvas', 'pinchend', function (ev) {
//     console.log(ev)
// });

// touch.on('#canvas', 'tap', function (ev) {
//     console.log(ev)
//     deleteCtr();
//     update=false
// });
