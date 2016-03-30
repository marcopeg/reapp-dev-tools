
export function json2query(source) {
    var query = [];
    Object.keys(source)
    .filter(validValues(source))
    .forEach(function (key) {
        var rule = ['$' + key, queryValue(source[key])];
        query.push(rule.join(':'));
    });

    query = query.join(';');

    if (query.length) {
        query += ';';
    }
    // console.log(query);
    return query;
}

function queryValue(value) {
    // encodeURIComponent
    if (value.toString().indexOf('/') !== -1) {
        return '"' + value + '"';
    }
    return value;
}

function validValues(source) {
    return key => ['function', 'object'].indexOf(typeof source[key]) === -1;
}
