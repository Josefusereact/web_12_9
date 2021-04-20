<template>
	<div class="page">
		<p-page-header title="富文本编辑器"></p-page-header>
		{{str}}
		<editor-test v-model="str" height="300px" img-type="upload"></editor-test>
	</div>
</template>

<script>
	import EditorTest from '@/components/Editor.vue'
	export default{
		name:'editor',
		components:{
			EditorTest
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
