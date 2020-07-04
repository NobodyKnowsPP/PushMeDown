import { DataStore } from "../base/DataStore";

// 记分器
export class Score {
  constructor(){
    this.ctx = DataStore.getInstance().ctx;
    this.scoreNumber = 0;
    //因为canvas刷新很快，所以需要一个变量控制加分，只加一次
    // this.isScore = true;//开始设置为true，第一次可以加分，加后置false
  }
  draw(){
    this.ctx.font = '30px Arial';
    this.ctx.fillStyle = '#8dbefd';
    this.ctx.fillText(
      this.scoreNumber, 
      window.innerWidth/2,//横坐标
      window.innerHeight/18,//纵坐标
      1000//最大大小，不写也可以
    );
  }
}