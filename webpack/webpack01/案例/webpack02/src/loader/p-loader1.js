module.exports = function (source) {
	const loaderUtils = require("loader-utils");
	let loaderOptions = loaderUtils.getOptions(this) || {};
	console.log(loaderOptions)
	console.log(source)
	source = source.replace(/let|const/g, 'var')
	return source
}