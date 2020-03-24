module.exports = {
    entry: './src/main.js',
    output: {
        path: __dirname,
        filename: 'dist/main.js',
        libraryTarget: 'commonjs2'
    },
    devtool: 'none',
    externals: {
        assets: 'assets',
        scenegraph: 'scenegraph',
        application: 'application',
        commands: 'commands',
        clipboard: 'clipboard',
        cloud: 'cloud',
        uxp: 'uxp',
        viewport: 'viewport',
        interactions: 'interactions'
    }
};
