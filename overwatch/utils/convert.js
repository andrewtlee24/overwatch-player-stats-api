module.exports.convert_to_key = function(txt) {
    var k = txt.trim().toLowerCase().replace(/ /g, '_')
    k = k.replace(/__/g, '_').replace(/_-_/g, '_')
    k = k.replace(/ö/g, 'o').replace(/'/g, '')      // Torbjorn name and "emp'd"
    return k;
}

module.exports.convert_value_type = function(value) {
    const is_percent = value.includes('%');
    const is_time = value.includes(":");
    const is_decimal = value.includes('.');

    if(is_percent) {
        return get_percentage_decimal(value);
    }
    if(is_time) {
        return get_seconds_from_time(value);
    }
    if(is_decimal) {
        return parseFloat(value);
    }
    if(is_number(value)) {
        return parseInt(value);
    }

    return value;
}

function get_percentage_decimal(value) {
    const p = value.replace('%','')
    const as_int = parseInt(p);
    const as_decimal = as_int / 100.0;
    return as_decimal; 
}

// https://stackoverflow.com/questions/9640266/convert-hhmmss-string-to-seconds-only-in-javascript
function get_seconds_from_time(value) {
    return value.split(':').reduce((acc,time) => (60 * acc) + +time);
}

function is_number(value) {
    const v = +value;
    return !isNaN(v);
}