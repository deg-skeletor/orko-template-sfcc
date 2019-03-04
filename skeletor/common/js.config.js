const path = require('path');

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

module.exports = {
    input: [
        'source/js/main.js'
    ],
    output: function(destPath, isModern = true) {
        return [
            {
                dir: isModern ? destPath : path.join(destPath, 'nomodule'),
                format: isModern ? "es" : "iife"
            }
        ]
    },
    plugins: (isModern = true) => [
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
    ]
};
