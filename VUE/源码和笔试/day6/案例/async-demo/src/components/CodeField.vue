<template>
  <div class="code-field">
    <transition-group name="fade">
      <div
        v-for="(item, index) in data"
        class="code-item fade-item"
        :class="[item.type]"
        :key="item.address"
      >
        <div v-if="type == 'code'" class="btns">
          <el-button
            v-if="item.editing == false"
            plain
            type="warning"
            @click="handleEdit(item, index)"
            icon="el-icon-edit"
            >edit</el-button
          >
          <el-button
            v-else
            plain
            @click="handleSave(item, index)"
            type="success"
            icon="el-icon-folder-checked"
            >save</el-button
          >
          <el-button
            plain
            @click="handleRemove(index)"
            type="danger"
            icon="el-icon-remove"
            >remove</el-button
          >
        </div>
        代码类型:{{item.type=='sync'?'同步':'异步'}}
        <br>
        代码地址:{{ item.address }}
        <div class="code-item-div">
          <span> {{ index + 1 }}. </span>
          <el-input
            v-if="type == 'code'"
            :readonly="!item.editing"
            class="code-item-pre"
            type="textarea"
            v-model="item.content"
          >
          </el-input>
          <div v-else>
            {{ item.content }}
          </div>
        </div>
      </div>
    </transition-group>
  </div>
</template>
<script>
export default {
  data() {
    return {
      editItem: {},
      editIndex: 0,
    };
  },
  props: {
    data: {
      type: Array,
      default() {
        return [];
      },
      required: true,
    },
    inserting: {
      type: Boolean,
      default: false,
      reuqired: true,
    },
    type: {
      type: String,
      default: "code",
      required: false,
    },
  },
  methods: {
    handleRemove(i) {
      let list = this.data;
      list = list.filter((item, index) => index != i);
      console.log(list);
      this.$emit("update:data", list);
      this.$emit("update:inserting", false);
    },
    handleEdit(item, index) {
      item.editing = true;
      // this.editItem = item
      // this.editIndex = index
    },
    handleSave(item, index) {
      let list = this.data;
      list[index].editing = false;
      // this.$emit('update:data',list)
      this.$emit("update:inserting", false);
    },
  },
};
</script>
<style lang="scss" scoped>
.fade-enter{
  transform: translateX(100px);
  opacity: 0;
}
.fade-enter-to{
  transform: translateX(0px);
  opacity: 1;
}
.fade-enter-active{
  // animation-name:fade ;
  // animation-duration: .3s;
}
.fade-leave{
  transform: translateX(0px);
  opacity: 1;
}
.fade-leave-to{
  transform: translateX(100px);
  opacity: 0;
}
.fade-leave-active{
  position: absolute;
  // animation-name:fade ;
  // animation-duration: .3s;
  // animation-direction: reverse;
}
.fade-item{
  transition:all 0.3s;
  display: inline-block;
}
@keyframes fade {
  from{
    transform: translateX(100px);
    opacity: 0;
  }
  to{
    transform: translateX(0px);
    opacity: 1;
  }
}
.code-field {
  display: flex;
  flex-direction: column;
  .code-item {
    border-radius: 9px;
    box-shadow: 0px 2px 10px 1px rgba(0, 0, 0, 0.3);
    margin: 15px;
    padding: 15px 15px;
    font-weight: bold;
    color: #fff;
    cursor: pointer;
    transition: all .5s;
    // position: relative;
    .btns {
      text-align: right;
      padding: 10px 0px;
    }
    &.sync {
      background: #409eff;
    }
    &.async {
      background: #e6a23c;
    }
    .code-item-div {
      display: flex;
      align-items: center;
      .code-item-pre {
        flex-grow: 1;
      }
    }
  }
}
</style>