"use strict";"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var generateCode = function () {
    var code = ['#'];
    var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMOPQRSTUVWXYZ';
    for (var i = 0; i < 11; i++) {
        var randomValue = Math.floor(Math.random() * chars.length);
        code.push(chars[randomValue]);
    }
    return code.join('');
};
function codeGenerator() {
    var codeValue = generateCode();
    var number = /[0-9]/gi;
    var hasNumber = codeValue.match(number);
    do {
        codeValue = generateCode();
    } while (!hasNumber);
    return codeValue;
}
exports.default = codeGenerator;
