/**
 * Sets the paths and plugins to be used for all of the CSS tasks run by Skeletor
 *
 * @const assetsMap {Object} mapping of local URLs and remote URLs or empty Object
 * @note assetsMap needs to be an Object with the original url as the key and the new url as the value
 * You can also create a JSON file elsewhere - such as assets.json - and require it instead of listing them here
 * @example
 * 	assetsMap = {
 * 	    "images/my_image.png": "https://www.deg.com/image/on/the/server.png",
 * 	    "images/my_second_image.png": "https://www.deg.com/second/image/on/the/server.png"
 * 	    ...
 * 	}
 * 	*/
const path = require('path');
const assetsMap = {};

/**
 * Checks if given asset exists in assetsMap and returns it if it does instead of the url passed in to postcss-url
 * */
function mapUrl(asset, dir) {
	if (assetsMap.hasOwnProperty(asset.url)) {
		return assetsMap[asset.url]
	}
	return asset.url
}

module.exports = {
	files: destPath => [
		{
			src: path.resolve('source/css/global.css'),
			dest: path.resolve(destPath, 'global.css')
		}
	],
	plugins: [
		require('postcss-easy-import'),
    	require('postcss-custom-properties'),
    	require('postcss-custom-selectors'),
    	require('postcss-custom-media'),
   		require('postcss-color-mod-function'),
    	require('postcss-nesting'),
		require('postcss-url')({ url: mapUrl}),
    	require('autoprefixer')
	]
};
