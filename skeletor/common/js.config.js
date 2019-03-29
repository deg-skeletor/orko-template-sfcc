const path = require('path');

const rollupFiles = {
    'source/js/main.js': 'main.js'
};

const legacyBabelPresets = [
    [
        '@babel/preset-env',
        {
            modules: false,
            targets: '> 1%, ie 11'
        }
    ]
];

const modernBabelPresets = [
    [
        '@babel/preset-env',
        {
            modules: false,
            targets: 'Firefox >= 62, Edge >= 17, Chrome >= 69, iOS >= 11.4, ChromeAndroid >= 70'
        }
    ]
];

function createRollupOutput(outputFile, isModern = true) {
    return [
        {
            file: outputFile,
            format: isModern ? "es" : "iife"
        }
    ]
}

function createRollupPlugins(isModern, minify){
    const plugins = [
        require('rollup-plugin-replace')({
            ENVIRONMENT: () => JSON.stringify(process.env.NODE_ENV || 'development'),
            'process.env.NODE_ENV': () => JSON.stringify(process.env.NODE_ENV || 'development')
        }),
        require('rollup-plugin-babel')({
            include: [
                'source/js/**',
                'node_modules/@degjs/**'
            ],
            babelrc: false,
            presets: isModern ? modernBabelPresets : legacyBabelPresets
        }),
        require('rollup-plugin-node-resolve')({
            browser: true
        }),
        require('rollup-plugin-commonjs')({
            include: 'node_modules/**'
        })
    ];

    if(minify) {
        plugins.push(require('rollup-plugin-terser').terser());
    }

    return plugins;
}

function getOutputFilepath(outputFilename, destPath, isModern) {
    const filename = isModern ? 
        outputFilename : 
        `${path.basename(outputFilename, '.js')}-nomodule.js`;

    return path.join(destPath, filename);
}

function createRollupConfigForFile(inputFile, outputFile, isModern, minify) {
    return {
        input: inputFile,
        output: createRollupOutput(outputFile, isModern),
        plugins: createRollupPlugins(isModern, minify)
    }
}

module.exports = {
    rollupConfig: function(destPath, minify = false) {
        return Object.keys(rollupFiles).reduce((accum, inputFile) => {

            const outputFile = getOutputFilepath(rollupFiles[inputFile], destPath, true);
            accum.push(createRollupConfigForFile(inputFile, outputFile, true, minify));

            const legacyOutputFile = getOutputFilepath(rollupFiles[inputFile], destPath, false);
            accum.push(createRollupConfigForFile(inputFile, legacyOutputFile, false, minify));
            
            return accum;
        }, []);
    }
};
