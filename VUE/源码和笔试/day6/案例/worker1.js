//线程1的执行逻辑
this.onmessage = () => {
  for(let i = 0;i<1000;i++){
    console.log('worker1',i)
  }
}