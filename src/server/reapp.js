
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
