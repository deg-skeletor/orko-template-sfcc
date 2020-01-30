/**
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

const {files, plugins} = require('../common/css.config.js');
const outputDir = 'export';

const assetMap = {};

function mapUrl(asset, dir) {
	if(assetMap.hasOwnProperty(asset.url)) {
		return assetMap[asset.url];
	}

	return asset.url;
}

module.exports = {
    name: 'css',
    plugins: [
        {
            name: '@deg-skeletor/plugin-postcss',
            config: {
                files: [
                    ...files(`${outputDir}`)
                ],
                plugins: [
					...plugins,
					require('postcss-url')({
						url: mapUrl
					})
				]
            }
        }
    ]
};
