export class Security {

    static sanitize(value: String) {
        if(value != null) {
            value.replace(/<[^>]+>/g, '');
            // @ts-ignore
            value.replace(/[<>&"'`]/g, function(match) {
                return {
                    '<': '&lt;',
                    '>': '&gt;',
                    '&': '&amp;',
                    '"': '&quot;',
                    "'": '&#39;',
                    '`': '&#x60;'
                }[match];
            })
        }
    }
}