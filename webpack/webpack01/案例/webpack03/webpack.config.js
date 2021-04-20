const path = require('path')
const MyPlugin = require('./src/plugins/my-plugin.js')
module.exports = {
	entry:{
		index:'./src/index.js'
	},
	output:{
		path:path.resolve(__dirname,'dist'),
		filename:'[name].bundle.js'
	},
	plugins:[
		new MyPlugin({
			name:'plugin'
		})
	]
}