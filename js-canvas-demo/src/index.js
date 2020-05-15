import DisplayObject from './DisplayObject.js';
import './style.css';
const deleteIcon = require('./assets/2.png');
let a = 0;

/**
 * 需要实现的功能
 * 1. 点击图片将图片放入画布中（已实现）
 * 2. 点击画布中的图片，增加选中效果；如果有多张图片，则选中最后面添加的图片(已实现)
 * 3. 点击画布中的图片，增加删除按钮；如果有多张图片，则选中最后面添加的图片(已实现)
 * 4. 手指滑动时，选中的图片跟着滑动相同的距离（已实现）
 * 5. 手指缩放旋转时，选中的图片跟着缩放和旋转
 */
!function() {
    const canvas = document.querySelector('#canvas');
    const canvasW = canvas.width;
    const canvasH = canvas.height;
    const position = canvas.getBoundingClientRect();
    const canvasX = position.left;
    const canvasY = position.top;
    const zoom = canvas.offsetWidth / canvas.width;
    const ctx = canvas.getContext('2d');
    let graph = {}
    let chosenDisplayObject = null;
    let clickedDisplayObject = null;
    const BORDERWIDTH = 100;

    saveGraph();
    addChosenAndDeleteEffect();
    addMoveEffect();
    addPinchEffect();
    addRotateEffect();
    addVconsole();
    // addAnimation();
    
    // 在canvas中画入图片
    function saveGraph() {
        const imageList = document.querySelectorAll('.img');
        imageList.forEach(image => {
            image.addEventListener('click', e => {
                const name = image.dataset.name;
                if (graph[name]) { return; }
                const x = +image.dataset.x;
                const y = +image.dataset.y;
                ctx.drawImage(image, x, y);
                graph[name] = new DisplayObject(image, x, y, name);
            })
        })
    }
    
    // 给canvas中的图片增加选中效果
    /**
     * 逻辑说明
     * 1. 鼠标点中的区域或者触摸的位置是否处于画布中的图片中
     * 2. 如果处于，判断是否已经选中；如果选中，不处理
     * 3. 如果未选中，删除其它图片的选中效果，同时给它增加选中效果
     * 
     * 两种思路
     * 1. 清除选中图片和边框所在的矩形范围，并重新绘入选中图片，这样就达到了去除选中效果的目的，
     * 带来的问题是范围可能包含其它图片，会把其它图片也删除
     * 2. 清空画布的所有内容，通过graph保存的状态重新绘入所有的图
     */
    function addChosenAndDeleteEffect() {
        window.addEventListener('click', e => {
            const x = e.x;
            const y = e.y;
            // 已经有选中的时候，点击空白区域会导致选中的效果消失, 因此需要设置默认值
            clickedDisplayObject = getClickedDisplayObject(canvas, x, y, graph) || clickedDisplayObject;
            console.log(clickedDisplayObject)
            // 鼠标没有点到画布中的图片
            if (!clickedDisplayObject) { return; }
        
            // 鼠标点到的图片已经被选中
            if (clickedDisplayObject === chosenDisplayObject) { return; }
        
            // 思路1，该思路不通
            // deleteAndAdd();
        
            // 思路2
            clearCanvasAndReDraw();
        })

        // 该思路不通
        // function deleteAndAdd() {
        //     // 将鼠标点到的图片设置为选中时，先清除之前的选中状态
        //     if (chosenDisplayObject) {
        //         deleteBorder(chosenDisplayObject);
        //     }
        
        //     addBorder();
        //     chosenDisplayObject = clickedDisplayObject;
            
        //     function deleteBorder(chosenDisplayObject) {
        //         const { x, y, width, height, image } = chosenDisplayObject;
        //         // delete graph[chosenDisplayObject.name]
        //         // 这里有一个问题
        //         ctx.clearRect(x - BORDERWIDTH, y - BORDERWIDTH, width + BORDERWIDTH * 2, height + BORDERWIDTH * 2)
        //         ctx.drawImage(image, x, y, width, height);
        //     } 
        // }

        function getClickedDisplayObject(canvas, x, y, graph) {
            let imageList = [];
            let isInImage = false;
            for(let key in graph) {
                let displayObject = graph[key];
                let image = displayObject.image;
                let imageX = canvasX + displayObject.x * zoom;
                let imageY = canvasY + displayObject.y * zoom;
                let imageW = image.naturalWidth * zoom;
                let imageH = image.naturalHeight * zoom;
                isInImage = (imageX <= x) && (x <= imageX + imageW) && (imageY <= y) && (y <= imageY + imageH)
                isInImage && imageList.push(displayObject)
            }

            if (imageList.length === 0) {
                return false
            } else if (imageList.length === 1) {
                return imageList[0]
            } else {
                imageList.sort(sort);
                return imageList[0];
            }
    
            function sort(x, y) {
                x = +x.name;
                y = +y.name;
                if (x >= y) {
                    return -1
                } else {
                    return 1
                }
            }
        }
    }

    function addMoveEffect() {
        let startX, startY,
        endX, endY,
        initX, initY,
        x, y;
        window.addEventListener('touchstart', e => {
            if (!chosenDisplayObject) { return; }
            let touch = e.touches[0];
            if (!touch) { return; }
            startX = touch.pageX;
            startY = touch.pageY;
            initX = chosenDisplayObject.x;
            initY = chosenDisplayObject.y;
        })
        
        window.addEventListener('touchmove', e => {
            if (!chosenDisplayObject) { return; }
            moveDisplayObject(e)
        })
        
        window.addEventListener('touchend', e => {
            if (!chosenDisplayObject) { return; }
            moveDisplayObject(e)
        })
        
        function moveDisplayObject(e) {
            let touch = e.touches[0];
            if (!touch) { return; }
            endX = touch.pageX;
            endY = touch.pageY;
            x = endX - startX;
            y = endY - startY;

            // 注意这里的zoom
            chosenDisplayObject.x = initX + x / zoom;
            chosenDisplayObject.y = initY + y / zoom;
            clearCanvasAndReDraw();
        }
    }
    
    function addPinchEffect() {
        let startLength, endLength
        window.addEventListener('touchstart', e => {
            if (!chosenDisplayObject) { return; }
            startLength = getLength(e)
        })

        window.addEventListener('touchmove', e => {
            if (!chosenDisplayObject) { return; }
            endLength = getLength(e);
            if (!endLength) { return; }
            chosenDisplayObject.zoom = endLength / startLength;
            clearCanvasAndReDraw()
        })

        window.addEventListener('touchend', e => {
            if (!chosenDisplayObject) { return; }
            endLength = getLength(e);
            if (!endLength) { return; }
            chosenDisplayObject.zoom = endLength / startLength;
            clearCanvasAndReDraw()
        })

        function getLength(e) {
            let touches = e.touches;
            //返回原始比例
            if (touches.length !== 2) {
                return false;
            }
            let [touch0, touch1] = [touches[0], touches[1]];
            let [x0, y0] = [touch0.clientX, touch0.clientY];
            let [x1, y1] = [touch1.clientX, touch1.clientY];
            let length = Math.pow((Math.pow(x1 - x0, 2) + Math.pow(y1 - y0, 2)), 0.5)
            return length;
        }
    }

    function addRotateEffect() {
        let startAngel, endAngel, rotation;
        let x, y, length;
        window.addEventListener('touchstart', e => {
            if (!chosenDisplayObject) { return; }
            x = chosenDisplayObject.x;
            y = chosenDisplayObject.y;
            length = Math.sqrt(x * x + y * y);
            startAngel = getAngel(e)
        })
        window.addEventListener('touchmove', e => {
            if (!chosenDisplayObject) { return; }
            endAngel = getAngel(e)
            if (endAngel === false) {
                return
            }
            rotation = endAngel - startAngel;
            chosenDisplayObject.rotation = startAngel + rotation;
            clearCanvasAndReDraw();
        })

        window.addEventListener('touchend', e => {
            if (!chosenDisplayObject) { return; }
            endAngel = getAngel(e)
            if (endAngel === false) {
                return
            }
            rotation = endAngel - startAngel;
            chosenDisplayObject.rotation = startAngel + rotation;
            clearCanvasAndReDraw();
        })

        function getAngel(e) {
            const touches = e.touches;
            if (!touches || touches.length !== 2) {
                return false
            }
            const [touch0, touch1] = touches;
            const [x0, y0] = [touch0.pageX, touch0.pageY]
            const [x1, y1] = [touch1.pageX, touch1.pageY]
            const angel = Math.atan2(y1 - y0, x1 - x0) / Math.PI;
            return angel
        }
    }

    function clearCanvasAndReDraw() {
        // 这里又SB了
        // ctx.clearRect(canvasX, canvasY, canvasW, canvasH);
        ctx.clearRect(0, 0, canvasW, canvasH);

        // 点击到了删除图标
        if (+clickedDisplayObject.name === 999) {
            delete graph[chosenDisplayObject.name];
            delete graph[clickedDisplayObject.name];
            chosenDisplayObject = null;
            clickedDisplayObject = null;
            reDraw();
            return;
        }

        if (chosenDisplayObject) {
            chosenDisplayObject.isChosen = false;
            delete graph['999']
        }

        // 只有点中的展示对象存在才处理
        if (clickedDisplayObject) {
            clickedDisplayObject.isChosen = true;
        }
        reDraw();
        addBorder();
        addDeleteIcon();
    }

    function reDraw() {
        for (let key in graph) {
            let displayObject = graph[key];
            let { image, x, y, width, height, zoom, rotation } = displayObject;
            if (rotation !== 0) {
                ctx.rotate(rotation);
                ctx.translate(x + width / 2, y + height / 2);
                ctx.drawImage(image, -width / 2, -height / 2);
                ctx.rotate(-rotation);
                ctx.translate( -x - width / 2, -y - height / 2)
            } else {
                ctx.drawImage(image, x, y, zoom * width, zoom * height);
            }
            if (displayObject.isChosen) {
                chosenDisplayObject = displayObject;
            }
        }
    }
    
    function addBorder() {
        ctx.strokeStyle = 'red'
        ctx.lineWidth = BORDERWIDTH;
        let { x, y, width, height, zoom, rotation } = clickedDisplayObject;
        // 展示原点与坐标系的关系
        // ctx.strokeRect(x, y, width + BORDERWIDTH, height + BORDERWIDTH);
        x = x - BORDERWIDTH / 2;
        y = y - BORDERWIDTH / 2;
        width = width * zoom + BORDERWIDTH;
        height = height * zoom + BORDERWIDTH
        if (rotation !== 0) {
            ctx.rotate(rotation);
            ctx.translate(x + width / 2, y + height / 2);
            ctx.strokeRect(x, y, width, height);
            ctx.rotate(-rotation);
            ctx.translate( -x - width / 2, -y - height / 2);
        } else {
            ctx.strokeRect(x, y, width, height);
        }
    }
    
    async function addDeleteIcon() {
        const image = new Image();
        image.src = deleteIcon;
        const loadedImage = await loadImage(image);
        const rotation = chosenDisplayObject.rotation;
        const width = loadedImage.naturalWidth;
        const height = loadedImage.naturalHeight;
        const x = chosenDisplayObject.x - BORDERWIDTH / 2
        const y = chosenDisplayObject.y + chosenDisplayObject.height * chosenDisplayObject.zoom - loadedImage.naturalHeight / 2 * chosenDisplayObject.zoom;
        if (rotation !== 0) {
            ctx.rotate(rotation);
            ctx.translate(x + width / 2, y + height / 2);
            ctx.drawImage(image, -width / 2, -height / 2);
            ctx.rotate(-rotation);
            ctx.translate( -x - width / 2, -y - height / 2);
        } else {
            ctx.drawImage(loadedImage, x, y, width, height);
        }
        graph['999'] = new DisplayObject(loadedImage, x, y, 999);
    }

    function loadImage(image) {
        return new Promise((resolve, reject) => {
            image.onload = function() {
                resolve(image)
            }
            image.onerror = function(err) {
                reject(err)
            }
        })
    }

    function addVconsole() {
        if (location.host.indexOf('localhost') === -1) {
            new VConsole()
        }
    }


    function addAnimation() {
        window.requestAnimationFrame(addAnimation)
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
        ctx.arc(a, 70, 20, 0, 360*Math.PI/180, true);
        ctx.closePath();
        ctx.fillStyle = 'red';
        ctx.fill();
        a += 2;
    }
}();