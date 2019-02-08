var fs = require('fs');
const log =  require('electron-log');

// function to encode file data to base64 encoded string

module.exports = {
    base64encode: function(files){
        return new Promise(function(resolve){
            var base64Array = [];

            files.map(file => {
                var bitmap = fs.readFileSync(file);
                // convert binary data to base64 encoded string
                var baseString = Buffer(bitmap).toString('base64');
                //log.info(baseString);
                base64Array.push(baseString);
            });

            resolve(base64Array);
        })
    }
};
