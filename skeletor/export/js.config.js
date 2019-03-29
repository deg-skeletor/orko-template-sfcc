const {rollupConfig} = require('../common/js.config.js');
const outputDir = 'export/js';

module.exports = {
	name: 'js',
	plugins: [
		{
			name: '@deg-skeletor/plugin-rollup',
			config: rollupConfig(outputDir, true)
		}
	]
};