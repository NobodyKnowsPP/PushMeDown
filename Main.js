import { ResourceLoader } from "./js/base/ResourceLoader";
import { Director } from "./js/Director";
import { BackGround } from "./js/runtime/BackGround";
import { DataStore } from "./js/base/DataStore";
import { StartButton } from "./js/player/StartButton";
import { Score } from "./js/player/Score";
import { Man_mid } from "./js/player/Man_mid";
import { Man_left } from "./js/player/Man_left";
import { Woman_mid } from "./js/player/Woman_mid";
import { Woman_right } from "./js/player/Woman_right";
import { Hand_left } from "./js/runtime/Hand_left"
import { Hand_right } from "./js/runtime/Hand_right"
import { Button_left } from "./js/runtime/Button_left"
import { Button_right } from "./js/runtime/Button_right"

export class Main{
  constructor(){
    console.log('main constructor');

    this.canvas = wx.createCanvas();
    this.ctx = this.canvas.getContext('2d');
    this.dataStore = DataStore.getInstance();
    this.director = Director.getInstance();
    const loader = ResourceLoader.create();

    loader.onLoaded(map => this.onResourceFirstLoaded(map));
  }

  onResourceFirstLoaded(map){//资源只需要加载一次
    console.log('load resouces');
    this.dataStore.ctx = this.ctx;
    this.dataStore.res = map;
    this.init();
    console.log('init');
  }

  init(){
    console.log('init');
    //首先重置游戏是没有结束的。
    this.director.isGameOver = false;

    //重置其他变量
    this.director.man_touch_flag = false;
    this.director.woman_touch_flag = false;
    this.director.man_time = 0;
    this.director.woman_time = 0;

    this.director.left_hand_time = 0;
    this.director.right_hand_time = 0;
    this.director.left_hand_place = false;
    this.director.right_hand_place = false;

    this.director.left_hand_freeze_time = 0;
    this.director.right_hand_freeze_time = 0;


    this.dataStore
    .put('background', BackGround)
    .put('man_mid', Man_mid)
    .put('man_left', Man_left)
    .put('woman_mid', Woman_mid)
    .put('woman_right', Woman_right)
    .put('hand_left', Hand_left)
    .put('hand_right', Hand_right)
    .put('button_left', Button_left)
    .put('button_right', Button_right)
    .put('start_button', StartButton)
    .put('score', Score);


    this.registerEvent();
    this.director.run();
    console.log('director run');
  }

  registerEvent(){
    wx.offTouchStart();
    wx.onTouchStart((touches,changedTouches,timestamp) => {
      if(this.director.isGameOver){
        console.log('游戏开始')
        this.init();
      } else {
        console.log('点击坐标: ',touches.changedTouches[0].pageX)
        this.director.touchEvent(touches.changedTouches[0].pageX);
      };
    });
  }
}