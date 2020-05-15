export default class DisplayObject {
    constructor(image, x, y, name) {
        this.image = image;
        this.width = image.naturalWidth;
        this.height = image.naturalHeight;
        this.x = x;
        this.y = y;
        this.name = name;
        this.isChosen = false;
        this.zoom = 1;
        this.rotation = 0;
    }
}