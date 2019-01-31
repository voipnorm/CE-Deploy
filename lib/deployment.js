
const log = require('../logging/logger');
const excel = require('./excel');
const Endpoint = require('./endpoint');
const xml = require('./buildXml');
const fs = require('fs');

var endpointArray=[];

module.exports =  function(){
    function deployEndpoints(path) {
        return new Promise((resolve, reject) => {
            (async () => {
                try {
                    let endpointList = await excel.readcsv(path);
                    log.info(endpointList[0]);
                    resolve(endpointArray = endpointList);
                } catch (e) {
                   reject(log.error("UpdateEndpointStatus error: "+e));
                }
            })()
        })

    };
    function deployMacros(username, password, macroPath, inRoomPath){

        return new Promise((resolve, reject) => {
            (async () => {
                try {
                    const macroText = await fs.readFile(macroPath);
                    const inRoomText = await fs.readFile(inRoomPath);

                    let macroXml = await xml.macroXml(macroText);
                    let inRoomXml = await xml.inRoomXml(inRoomText);

                    for(let i = 0; i< endpointArray.length ; i++){
                        const endpoint = {
                            ipAddress : endpointArray[i],
                            username : username,
                            password : password,
                        }
                        let tp = new Endpoint(endpoint);
                        await tp.deployMacro(macroXml);
                        await tp.deployRoomXML(inRoomXml);
                    }
                } catch (e) {
                    reject(log.error("UpdateEndpointStatus error: "+e));
                }
            })()
        })
    }

    return {
        deployEndpoints: deployEndpoints,
        deployMacros: deployMacros,
    }
}()