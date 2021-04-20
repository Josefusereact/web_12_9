<template>
  <div class="about">
    <van-contact-edit
      is-edit
      show-set-default
      :contact-info="editingContact"
      set-default-label="设为默认联系人"
      @save="onSave"
      @delete="onDelete"
    />
    <van-tabbar :value="1">
      <van-tabbar-item @click="handleClick('/')" icon="home-o">标签</van-tabbar-item>
      <van-tabbar-item @click="handleClick()" icon="search">标签</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
import { Toast } from 'vant';

export default {
  data() {
    return {
      editingContact: {},
    };
  },
  methods: {
    onSave(contactInfo) {
      Toast('保存');
    },
    onDelete(contactInfo) {
      Toast('删除');
    },
    handleClick(path){
      this.$router.push(path)
    }
  },
};
</script>