const path = require('path');

function mapUrl(asset, dir) {
	if(assetMap.hasOwnProperty(asset.url)) {
		return assetMap[asset.url];
	}

	return asset.url;
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
		require('postcss-url')({
			url: mapUrl
		}),
    	require('autoprefixer')
	]
};
