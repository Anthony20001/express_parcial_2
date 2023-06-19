"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Security = void 0;
class Security {
    static sanitize(value) {
        if (value != null) {
            value.replace(/<[^>]+>/g, '');
            // @ts-ignore
            value.replace(/[<>&"'`]/g, function (match) {
                return {
                    '<': '&lt;',
                    '>': '&gt;',
                    '&': '&amp;',
                    '"': '&quot;',
                    "'": '&#39;',
                    '`': '&#x60;'
                }[match];
            });
        }
    }
}
exports.Security = Security;
