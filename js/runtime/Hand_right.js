import { Sprite } from "../base/Sprite";

export class Hand_right extends Sprite{
  constructor(){
    const image = Sprite.getImage('hand_right');
    super(image, 
      0, 0, image.width, image.height,
      window.innerWidth*5/9, window.innerHeight*2/5, 70, 160);

    this.count = 0;
    this.push_speed = 1;
    this.push_duration = 30;
    this.hand_freeze_time = 51;

    this.image = image;
    this.clippingWidth = image.width;
    this.clippingHeight = image.height;
  }

  draw(place){
    this.count = (this.count + this.push_speed) % this.hand_freeze_time;

    if(place){//如果place为true则是要扭曲
      if(this.count > this.push_duration){
        super.draw(this.image,
          0, 0, this.clippingWidth, this.clippingHeight,
          window.innerWidth*7/9, window.innerHeight*2/5-this.push_duration, 
          70-this.push_duration, 160-this.push_duration*2);
      }else{
        super.draw(this.image,
          0, 0, this.clippingWidth, this.clippingHeight,
          window.innerWidth*7/9, window.innerHeight*2/5-this.count, 
          70-this.count, 160-this.count*2);
      }
    }else{
      if(this.count > this.push_duration){
        super.draw(this.image,
          0, 0, this.clippingWidth, this.clippingHeight,
          window.innerWidth*6/10, window.innerHeight*2/5-this.push_duration, 
          70-this.push_duration, 160-this.push_duration*2);
      }else{
        super.draw(this.image,
          0, 0, this.clippingWidth, this.clippingHeight,
          window.innerWidth*6/10, window.innerHeight*2/5-this.count, 
          70-this.count, 160-this.count*2);
      }
    }


  }
}