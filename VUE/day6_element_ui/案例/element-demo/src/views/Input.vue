<template>
  <div>
    <el-row>
    	<el-input></el-input>
    </el-row>
    <el-row :gutter="100">
    	<el-col  :span="12">
      	<div class="item">
          1
        </div>
      </el-col>
      <el-col :span="12">
      	<div class="item">
      	  2
      	</div>
      </el-col>
    </el-row>
    <el-row>
    	<el-col :span="8">
      	<el-input placeholder="请输入"></el-input>
      </el-col>
    </el-row>
    <el-row>
    	<el-col :span="6">
      	<el-input placeholder="请输入" v-model="inputStr"></el-input>
      </el-col>
      {{inputStr}}
    </el-row>
    <el-row>
    	<el-col :span="6">
      	<el-input placeholder="请输入" disabled></el-input>
      </el-col>
      <el-col :span="6">
        <el-input placeholder="请输入" readonly></el-input>
      </el-col>
    </el-row>
    <el-row>
    	<el-col :span="6">
      	<el-input
          v-model="inputStr"
          show-word-limit
          maxlength="10"
          placeholder="请输入"
          clearable></el-input>
      </el-col>
    </el-row>
    <el-row>
    	<el-col :span="4">
      	<el-input placeholder="请输入"
          prefix-icon="el-icon-user" clearable></el-input>
        <el-input placeholder="请输入"
          suffix-icon="el-icon-remove" clearable></el-input>
        <el-input placeholder="请输入"
          prefix-icon="el-icon-user"
          suffix-icon="el-icon-remove" clearable></el-input>

      </el-col>
    </el-row>
    <el-row>
      <el-col :span="6">
        <el-input  v-model="inputStr"></el-input>
        <el-input size="medium" v-model="inputStr"></el-input>
        <el-input size="small" v-model="inputStr"></el-input>
        <el-input size="mini" v-model="inputStr"></el-input>
        <el-input type="textarea">

        </el-input>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default{
    data(){
      return {
        inputStr:''
      }
    }
  }
</script>

<style>
  .item{
    background-color: #CCCCCC;
  }
</style>
