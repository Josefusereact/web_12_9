const pages = ['index','demo']
let obj = {}
let pageArr = pages.forEach(item => {
	obj[item] = {
		entry: `src/${item}.js`,
		template: `public/${item}.html`,
		filename: `${item}.html`,
		chunks: ['chunk-vendors', 'chunk-common', item]
	}
})
console.log(obj)

module.exports = {
	lintOnSave:false,
	pages:obj
}