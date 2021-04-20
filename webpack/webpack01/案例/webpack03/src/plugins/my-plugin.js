class MyPlugin {
	apply(compiler) {
		//输出compiler中的key
		console.log(Object.keys(compiler))
		console.log(Object.keys(compiler.hooks))
		//生命周期
		compiler.hooks.entryOption.tap('MyPlugin', (context, entry) => {
			/* ... */
			console.log('项目路径：', context)
			console.log('entry数据:', entry)
			console.log('加载完entry的回调')
		});
		compiler.hooks.done.tap('MyPlugin', (stats) => {
			/* ... */
			console.log('\n')
			console.log('编译完成的回调')

		});
		compiler.hooks.afterDone.tap('MyPlugin', (stats) => {
			/* ... */
			console.log('编译彻底结束的回调')

		});


	}
}

module.exports = MyPlugin;