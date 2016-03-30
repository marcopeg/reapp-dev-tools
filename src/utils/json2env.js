
export function json2env(json) {
    var target = {};
    Object.keys(json).forEach(key => target[key] = JSON.stringify(json[key]));
    return target;
}
