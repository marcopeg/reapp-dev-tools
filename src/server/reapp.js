
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');

var proxy = require('./proxy');
var styleguide = require('./styleguide');

var serverCfg;
var cwd;

export function init(_cwd, _serverCfg) {
    cwd = _cwd;
    serverCfg = _serverCfg;

    styleguide.init(cwd, process.argv);
}

export function config(cfg = {}) {
    return Object.assign({}, cfg, {
        proxy: proxy.table(serverCfg),
    });
}

// npm start       --> start full dev environment
// npm start api   --> start api server alone (no Webpack)
// npm start guire --> star styleguide
export function start(webpackConfig) {
    var args = [...process.argv];
    if (args.pop() === 'api') {
        console.log('Starting API Server...');
        serverCfg.proxyIsEnabled = true;
        serverCfg.proxyHost = serverCfg.host;
        serverCfg.proxyPort = serverCfg.port;
        proxy.run(cwd, serverCfg);
    } else {
        new WebpackDevServer(
            webpack(webpackConfig),
            config(webpackConfig.devServer)
        ).listen(serverCfg.port, serverCfg.host, callback);
    }
}

export function callback(err) {
    if (err) {
        console.log(err);
    }
    console.log('Listening at localhost:' + serverCfg.port);
    proxy.run(cwd, serverCfg);
}

export function isStyleguideActive() {
    return styleguide.isActive();
}

export function getStyleguideInfo() {
    return styleguide.getInfo();
}
