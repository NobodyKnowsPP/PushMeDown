import { Sprite } from "../base/Sprite";

export class Woman_right extends Sprite{
  constructor(){
    const right = Sprite.getImage('woman_right');
    const right_x = 173;
    const right_y = 180;
    const right_width = 200;
    const right_height = 340;
    super(right,
      0, 0, right.width, right.height,
      right_x, right_y, right_width, right_height);
  }
}