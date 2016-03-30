
import fs from 'fs';
import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';

var styleguide = require('./styleguide');

export function run(cwd, cfg) {
    if (
        !cfg.proxyIsEnabled ||
        styleguide.isActive()
    ) {
        return;
    }

    var app = express();
    app.use(bodyParser.json());

    // list here the apis you plan to use
    fs.readdirSync(path.join(cwd, 'app', 'server'))
        .filter(i => i.substr(0, 1) !== '.')
        .filter(i => i.substr(0, 1) !== '_')
        .forEach(api => {
            var apiPath = path.join(cwd, './app/server/' + api);
            app.use('/' + api.replace('.js', ''), require(apiPath));
        }
    );

    app.listen((cfg.proxyPort), () => {
        console.log(
            'Fake API /dist available at http://%s:%s',
            cfg.proxyHost,
            cfg.proxyPort
        );
    });
}

export function table(serverCfg) {
    var table = {
        '/' : styleguideEntryPoint(serverCfg),
        '/index.html' : styleguideEntryPoint(serverCfg),
    };

    serverCfg.proxyUrls.forEach(function (url) {
        table[url] = 'http://' + serverCfg.proxyHost + ':' + serverCfg.proxyPort + '/';
    });

    Object.keys(serverCfg.proxyRules).forEach(function (key) {
        table[key] = serverCfg.proxyRules[key];
    });

    return table;
}

export function styleguideEntryPoint(serverCfg) {
    var {
        guideEntryPoint = '/config/guide.html',
        clientEntryPoint = '/config/client.html',
    } = serverCfg;

    return {
        bypass: function () {
            return styleguide.isActive() ? guideEntryPoint : clientEntryPoint;
        },
    };
}
