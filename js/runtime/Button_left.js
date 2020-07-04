import { Sprite } from "../base/Sprite";

export class Button_left extends Sprite{
  constructor(){
    const image = Sprite.getImage('button_left');
    super(image, 
      0, 0, image.width, image.height,
      window.innerWidth/9, window.innerHeight*7/9, 
      80, 80);
  }
}