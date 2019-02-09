const log =  require('electron-log');
const util = require('util');
const fs = require('fs');

const readFile = util.promisify(fs.readFile);

// function to encode file data to base64 encoded string

module.exports = {
    base64encode: async (files) => {
        try{

            var base64Array = [];

            await Promise.all(files.map(async file => {

                    var bitmap = await readFile(file);

                    base64Array.push(bitmap.toString('base64'));
            }));

            log.info("Base64 Processing Completed");

            return base64Array;

        }catch(e){
            throw "Base encode error: "+e;

        }
    }
};
