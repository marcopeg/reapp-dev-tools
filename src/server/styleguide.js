/* eslint no-empty:0 */

import fs from 'fs';
import path from 'path';

import getGuideSourceCode from './get-guide-source-code';

var cwd = '';
var components = [];
var sources = [];

export function init(_cwd, _args) {
    var args = [..._args];
    cwd = _cwd;
    
    if (args.length > 2) {
        let arg = args.pop();
        if (
            arg === 'styleguide' ||
            arg === 'guide'
        ) {
            addComponents();
        } else {
            addComponent(arg);
        }
    }
}

export function addComponent(name) {

    var plugin;
    if (name.indexOf('/') !== -1) {
        name = name.split('/');
        plugin = name[0];
        name = name[1];
    }

    var fileName = name + '.js';
    var guideFile = name + '.guide.js';

    var guidePath;
    if (plugin) {
        guidePath = path.join(cwd, 'app', 'plugins', plugin, 'styleguide', 'components', guideFile);
    } else {
        guidePath = path.join(cwd, 'app', 'styleguide', 'components', guideFile);
    }

    var component = {
        plugin,
        name,
        fileName,
        guideFile,
        guidePath,
    };

    try {
        sources.push(getGuideSourceCode(guidePath));
    } catch (e) {}

    components.push(component);
    return component;
}

export function addComponents() {
    var componentsPath = path.join(cwd, 'app', 'styleguide', 'components');
    fs.readdirSync(componentsPath)
        .filter(isGuideComponent)
        .map(getComponentName)
        .map(addComponent);
}

export function getInfo() {
    return {
        components: components,
        sources: sources,
        cwd,
    };
}

export function isActive() {
    return components.length > 0;
}

function isGuideComponent(fileName) {
    return fileName.indexOf('.guide') !== -1;
}

function getComponentName(fileName) {
    return fileName.replace('.guide.js', '');
}
