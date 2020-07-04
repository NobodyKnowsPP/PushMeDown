import { Sprite } from "../base/Sprite";

export class StartButton extends Sprite{
  constructor(){
    const image = Sprite.getImage('start_button');
    super(image,
      0, 0, image.width, image.height,
      0, 0, window.innerWidth, window.innerHeight);
  }
}