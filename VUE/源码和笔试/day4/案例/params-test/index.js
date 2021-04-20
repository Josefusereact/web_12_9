const obj = {
  name:'小明',
  age:12,
  sex:""
}
let arr = []
for(let i = 0;i<32000;i++){
  arr.push({
    id:Math.round(Math.random()*1000000),
    name:obj.name+i,
    age:obj.age+i,
    sex:Math.random()>0.5?'男':'女',
  })
}
const fs = require('fs')
const path = require('path')
fs.writeFileSync(path.resolve(__dirname,'index-32000.json'),JSON.stringify({
  data:arr
}))
