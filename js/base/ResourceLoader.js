import {Resources} from './Resources'

export class ResourceLoader {
  map = null;

  constructor(){
    this.map = new Map(Resources);
    console.log(this.map);
    for(let[key, value] of this.map){
      console.log(key);
      const image = wx.createImage();
      //const image = new Image();//其他地方是new Image();
      image.src = value;//加载图片资源
      this.map.set(key, image);
      //将相对路径替换成图片实例本身
    }//循环走完之后map就会变成key和image对象的键值对
  }

  onLoaded(callback){//一个回调
    //确保图片已经加载完毕
    let loadedCount = 0;
    for(let value of this.map.values()){
      value.onload = () => {//一个箭头函数，视频3-5
        loadedCount++;
        if(loadedCount>=this.map.size){
          callback(this.map);
        }
      }
    }
  }

  static create(){
    return new ResourceLoader();
  }
}