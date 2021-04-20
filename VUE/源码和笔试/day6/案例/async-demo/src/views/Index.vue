<template>
  <div class="code">
    <div class="item">
      <div class="title">
        主代码逻辑
      </div>
      <el-button 
        icon="el-icon-video-play"
        @click="handleRunCode"
        type="success">run</el-button>
      <el-button
        type="primary"
        @click="handleInsertCode"
        icon="el-icon-plus">
        insert-code
      </el-button>
      <el-button 
        @click="handleClearLog"
        type="danger" plain>
        clear-log
      </el-button>
      <el-switch
        v-model="async"
        active-text="异步"
        inactive-text="同步">
      </el-switch>
      <code-field 
        type="code"
        :data.sync="codeList"
        :inserting.sync="inserting"></code-field>
    </div>
    <div class="item">
      <div class="item-item">
        运行日志
        <div class="log">
          <div v-for="(item,index) in logList"
            :key="item+index">
            {{index+1}}.{{item}}
          </div>
        </div>
      </div>
      <div class="item-item">
        微任务队列
        <div >
          <code-field 
            type="micro"
            :data.sync="microList"
            :inserting.sync="inserting"></code-field>
        </div>
      </div>
      <div class="item-item">
        宏任务队列
        <div >
          <code-field 
            type="global"
            :data.sync="globalList"
            :inserting.sync="inserting"></code-field>
        </div>
      </div>
    </div>
     
  </div>
</template>
<script>
import CodeField from '@/components/CodeField'
export default {
  components:{
    CodeField
  },
  data(){
    return {
      codeList:[
        {
          address:'123',
          type:'sync',
          editing:false,
          content:`console.log(123)
          `
        },
        {
          address:'456',
          type:'async',
          editing:false,
          content:`let p1 = new Promise(resolve => resolve(123))
          p1.then(res => console.log(res))
          `
        },
        {
          address:'789',
          type:'async',
          editing:false,
          content:`let p = new Promise(resolve => resolve(123))
            p.then(res => console.log(res))
          `
        },
        {
          address:'102',
          type:'async',
          editing:false,
          content:`setTimeout(function(){console.log(111)},1000)
          `
        },
        {
          address:'111',
          type:'sync',
          editing:false,
          content:`console.log(456)
          `
        }
      ],
      inserting:false,
      async:false,
      globalList:[],
      microList:[],
      mainList:[],
      logList:[],
      interval:2000
    }
  },
  methods:{
    handleRunCode(){
      this.logList = []
      this.logList.push('编译主逻辑代码')
      this.mainList = this.codeList.filter(item => item.type=='sync')
      this.logList.push('执行主逻辑代码')
      let codes = this.mainList.map(item => item.content).join('')
      eval(codes)
      this.logList.push('主逻辑代码执行完毕')
      this.logList.push('检测是否存在微任务')
      let microList = this.codeList.filter(item => item.type=='async'&&item.content.indexOf('Promise') != -1)

      if(microList.length == 0){
        this.logList.push('不存在微任务')
      }
      let initToDoList = (list,index,fn ,type) => {
        let msg = type==1?'宏任务':'微任务'
        if(index<list.length){
          this.logList.push(`注入eventLoop${msg}队列,代码地址为:`+list[index].address)
          if(type == 0){
            this.microList.push(list[index])
          }else{
            this.globalList.push(list[index])
          }
          index++
          setTimeout(()=>{
            initToDoList(list,index,fn,type)
          },this.interval)
        }else{
          this.logList.push(`注入eventLoop${msg}队列完毕`)
          setTimeout(()=>{
            fn()
          },this.interval)
        }
      } 
      let runToDoCode = (list,type,fn) => {
        let msg = type==1?'宏任务':'微任务'
        if(list.length>0){
          let code = list[0].content
          this.logList.push(`执行${msg}队列中地址为${list[0].address}的异步代码`)
          eval(code)
          
          this.logList.push(`执行完毕`)
          list.shift()
          if(type == 1){
            this.globalList = list
          }else{
            this.microList = list
          }
          setTimeout(() => {
            runToDoCode(list,type,fn)
          },this.interval)
        }else{
           this.logList.push(`执行${msg}队列完毕`)
          setTimeout(()=>{
            fn()
          },this.interval)
        }
      }
      initToDoList(microList,0,() => {
        this.logList.push('检测是否存在宏任务')
        let globalList = this.codeList.filter(item => item.type=='async'&&item.content.indexOf('Promise') == -1)
        if(globalList.length == 0){
          this.logList.push('不存在微任务')
        }
        initToDoList(globalList,0,() => {
          if(this.microList.length>0){
            this.logList.push('处理微任务')
            runToDoCode(this.microList,0,()=>{
              if(this.globalList.length>0){
                this.logList.push('处理宏任务')
                runToDoCode(this.globalList,1,()=>{
                  
                })
              }
            })
          }
          
        },1)
      },0)
     
    },
    handleClearLog(){
      this.logList = []
    },
    handleInsertCode(){
      if(!this.inserting){
        this.inserting = true
        let obj = {
          address:Math.random().toString(36).substr(2),
          type:this.async?'async':'sync',
          content:'',
          editing:true
        }
        this.codeList.push(obj)
      }
      
    }
  }
}
</script>
<style lang="scss" scoped>
  .code{
    display: flex;
    .item:first-child{
      width: 300px;
      flex-shrink: 0;
    }
    .item:last-child{
      flex-grow: 1;
      display: flex;
      .item-item{
        width: 300px;
        border:1px solid;
        flex-grow: 0;
      }
      .item-item:first-child{
        flex-grow: 1;
        background: #000;
        color: #fff;
        font-weight: bold;
      }
    }
    .log{
      font-size: 12px;
      font-weight: bold;
      color: #fff;
      background: #000;
      
    }
  }
</style>