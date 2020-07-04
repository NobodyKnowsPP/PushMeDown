import { DataStore } from "./DataStore";

// 精灵的基类，负责初始化精灵加载的资源和大小以及位置
export class Sprite {
  constructor(
    // ctx = null, //
    img = null, //绘制的图片对象
    srcX = 0, //剪裁的x坐标
    srcY = 0, 
    srcW = 0, //剪裁的宽度
    srcH = 0, 
    x = 0, //图形资源在canvas上的摆放位置
    y = 0, 
    width = 0, //剪裁完后使用的宽度大小
    height = 0){
    this.dataStore = DataStore.getInstance();
    this.ctx = this.dataStore.ctx;
    this.img = img;
    this.srcX = srcX;
    this.srcY = srcY;
    this.srcW = srcW;
    this.srcH = srcH;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  static getImage(key){
    return DataStore.getInstance().res.get(key);
  }

  draw(img = this.img, 
    srcX = this.srcX,
    srcY = this.srcY,
    srcW = this.srcW,
    srcH = this.srcH,
    x = this.x,
    y = this.y,
    width = this.width,
    height = this.height){
    this.ctx.drawImage(
      img,
      srcX,
      srcY,
      srcW,
      srcH,
      x,
      y,
      width,
      height
    );
  }
}