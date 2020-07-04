//变量缓存器，方便我们在不同的类中访问和修改变量
export class DataStore {
  static getInstance(){
    if(!DataStore.instance){
      DataStore.instance = new DataStore();
    }
    return DataStore.instance;
  }

  constructor(){
    this.map = new Map();//需要随时销毁的东西放到map中，长期保存的放到类变量中
  }

  put(key,value){
    if(typeof value === 'function'){
      value = new value();
    }
    this.map.set(key,value);
    return this;//方便链式操作
  }
  get(key){
    return this.map.get(key);
  }

  destroy(){
    for(let value of this.map.values()){
      value = null;
    }
  }
}