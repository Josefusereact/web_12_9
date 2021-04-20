<template>
	<div class="page">
		<p-page-header title="富文本编辑器"></p-page-header>
		{{str}}
		<!-- 
		 富文本组件说明
		 v-model是富文本内部输入的内容，会得到html的源码
		 height设置富文本组件的高度默认是100%
		 img-type用来决定当前组件的图片上传是走接口上传还是转成base64编码，默认是base64
		 这里因为我们学习了文件上传所以通过接口的形式上传文件
		 由于富文本组件比较复杂，并且免费开源的很少，这里使用的富文本组件是封装了tinymce实现的
		 tinymce本身是付费组件，这里通过了复杂的方式绕过了付费，所以学会如何使用就可以
		 -->
		<p-editor v-model="str" height="300px" img-type="upload"></p-editor>
	</div>
</template>

<script>
	import PEditor from '@/components/Editor.vue'
	export default{
		name:'editor',
		components:{
			PEditor
		},
		data(){
			return {
				str:''
			}
		}
	}
</script>

<style>
</style>
