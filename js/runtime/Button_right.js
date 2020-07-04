import { Sprite } from "../base/Sprite";

export class Button_right extends Sprite{
  constructor(){
    const image = Sprite.getImage('button_right');
    super(image, 
      0, 0, image.width, image.height,
      window.innerWidth*7/10, window.innerHeight*7/9, 
      80, 80);
  }
}