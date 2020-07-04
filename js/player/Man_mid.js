import { Sprite } from "../base/Sprite";

export class Man_mid extends Sprite{
  constructor(){
    const mid = Sprite.getImage('man_mid');
    const mid_x = 33;
    const mid_y = 140;
    const mid_width = 168;
    const mid_height = 380;

    super(mid,
      0, 0, mid.width, mid.height,
      mid_x, mid_y, mid_width, mid_height);
  }
}