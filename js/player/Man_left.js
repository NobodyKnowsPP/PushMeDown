import { Sprite } from "../base/Sprite";

export class Man_left extends Sprite{
  constructor(){
    const left = Sprite.getImage('man_left');
    const left_x = 6;
    const left_y = 155;
    const left_width = 195;
    const left_height = 365;
    super(left,
      0, 0, left.width, left.height,
      left_x, left_y, left_width, left_height);
  }
}