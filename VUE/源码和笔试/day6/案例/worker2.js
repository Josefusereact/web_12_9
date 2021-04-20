//线程2的执行逻辑
this.onmessage = () => {
  for(let i = 0;i<1000;i++){
    console.log('worker2',i)
  }
}