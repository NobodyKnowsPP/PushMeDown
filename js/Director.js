import { DataStore } from "./base/DataStore";
import { Score } from "./player/Score";

export class Director{
  constructor(){
    console.log('director constructor');
    this.dataStore = DataStore.getInstance();

    this.duration = 40;//扭曲时间
    this.man_touch_flag = false;//男性是否被点击的flag
    this.woman_touch_flag = false;
    this.man_time = 0;//man_time在0和duration=40之间++，遇到点击便置0，如果man_time不为0则表示此时是正在扭曲的状态，为0表示为mid状态
    this.woman_time = 0;

    this.hand_prepare_duration = 100;//产生随机数之后乘100，生成0-100随机时间
    this.min_hand_prepare_duration = 40;//0-100随机时间再加上最小的准备时间空档
    this.left_hand_time = 0;//0到准备时间之间的数，每次++，准备时间过完了之后才生成推手的动画
    this.right_hand_time = 0;
    this.left_hand_place = false;//false为mid，true为扭曲
    this.right_hand_place = false;

    this.hand_freeze_duration = 50;//Hand_left类中的push_duration设置为30，30-50之间的动画静止，检测是否碰撞
    this.left_hand_freeze_time = 0;//0到50之间++
    this.right_hand_freeze_time = 0;
    this.hand_push_duration = 30;//与hand一致，为30，方便判断
  }

  static getInstance(){
    if(!Director.instance){
      Director.instance = new Director();
    }
    return Director.instance;
  }

  //获取touch的坐标
  touchEvent(x){
    if(x < window.innerWidth/2){
      this.man_touch_flag = true;
      this.man_time = 0;
    }else{
      this.woman_touch_flag = true;
      this.woman_time = 0;
    }
  }

  prepareHand(){
    if(this.left_hand_time === 0 && this.left_hand_freeze_time >= this.hand_freeze_duration){
      // console.log('生成准备时间，手臂出现位置')
      this.left_hand_time = Math.floor(Math.random() * this.hand_prepare_duration) + this.min_hand_prepare_duration;//下次出现手的时间距离
      if(Math.random() <= 0.5){//随机决定左手出现的位置
        this.left_hand_place = true;
      }else{
        this.left_hand_place = false;
      }
      this.left_hand_freeze_time = 0;
    }else if(this.left_hand_time === 0){
      this.left_hand_freeze_time++;//冻结时间要设置得比动画push时间要长
    }else{
      this.left_hand_time--;//剩余准备时间减少。
    }

    if(this.right_hand_time === 0 & this.right_hand_freeze_time >= this.hand_freeze_duration){
      this.right_hand_time = Math.floor(Math.random() * this.hand_prepare_duration) + this.min_hand_prepare_duration;
      if(Math.random() <= 0.5){
        this.right_hand_place = true;
      }else{
        this.right_hand_place = false;
      }
      this.right_hand_freeze_time = 0;
    }else if(this.right_hand_time === 0){
      this.right_hand_freeze_time++;
    }else{
      this.right_hand_time--;
    }
  }

  check(){
    const score = this.dataStore.get('score');

    if(this.left_hand_freeze_time > 30){//30秒推手动画过后判断是否hit
      if(this.man_time > 0 && this.left_hand_place===true){
        console.log('man_left_hit');
        this.isGameOver = true;
      }else if(this.man_time === 0 && this.left_hand_place === false){
        console.log('man_mid_hit');
        this.isGameOver = true;
      }else if(this.left_hand_freeze_time === 50){
        score.scoreNumber++;
      }
    }else if(this.right_hand_freeze_time > 30){
      if(this.woman_time > 0 && this.right_hand_place===true){
        console.log('woman_right_hit');
        this.isGameOver = true;
      }else if(this.woman_time === 0 && this.right_hand_place === false){
        console.log('woman_mid_hit');
        this.isGameOver = true;
      }else if(this.right_hand_freeze_time === 50){
        score.scoreNumber++;
      }
    }
  }

  run(){
    this.check();
    if(!this.isGameOver){
      //背景图
      this.dataStore.get('background').draw();
      //画man
      if(this.man_touch_flag && this.man_time < this.duration){
        this.dataStore.get('man_left').draw();
        this.man_time++;
      }else{
        this.man_touch_flag = false;
        this.man_time = 0;
        this.dataStore.get('man_mid').draw();
      }
      //画woman
      if(this.woman_touch_flag && this.woman_time < this.duration){
        this.dataStore.get('woman_right').draw();
        this.woman_time++;
      }else{
        this.woman_touch_flag = false;
        this.woman_time = 0;
        this.dataStore.get('woman_mid').draw();
      }

      //画hand
      this.prepareHand();
      if(this.left_hand_time === 0){
        this.dataStore.get('hand_left').draw(this.left_hand_place);
      }
      if(this.right_hand_time === 0){
        this.dataStore.get('hand_right').draw(this.right_hand_place);
      }

      //画button
      // this.dataStore.get('button_left').draw();
      // this.dataStore.get('button_right').draw();

      //score
      this.dataStore.get('score').draw();

      let timer = requestAnimationFrame(() => this.run());
      this.dataStore.put('timer', timer);
    }else{
      console.log('游戏结束');
      this.dataStore.get('start_button').draw();

      cancelAnimationFrame(this.dataStore.get('timer'));
      this.dataStore.destroy();
      //微信小游戏垃圾回收
      wx.triggerGC();
    }
  }
}