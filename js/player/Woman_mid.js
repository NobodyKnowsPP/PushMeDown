import { Sprite } from "../base/Sprite";

export class Woman_mid extends Sprite{
  constructor(){
    const mid = Sprite.getImage('woman_mid');
    const mid_x = 182;
    const mid_y = 152;
    const mid_width = 125;
    const mid_height = 370;

    super(mid,
      0, 0, mid.width, mid.height,
      mid_x, mid_y, mid_width, mid_height);
  }
}