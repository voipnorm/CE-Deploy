const excel = require('./excel');
const Endpoint = require('./endpoint');
const xml = require('./buildXml');
const fs = require('fs');
const log = require('electron-log');

var endpointArray = [];

module.exports = function () {
    var errorLog = [];

    function deployEndpoints(path) {
        return new Promise((resolve, reject) => {
            (async () => {
                try {
                    log.info(path);
                    let endpointList = await excel.readcsv(path);
                    log.info(endpointList[0]);
                    endpointArray = endpointList;
                    resolve([endpointArray, 'Reading CSV complete ......']);
                } catch (e) {
                    reject(e);
                }
            })()
        })

    };
    function deployMacros(username, password, macroPath,macroName,macroActivate, inRoomPath, wallpaperPath) {
        return new Promise((resolve, reject) => {
            (async () => {
                try {
                    let  macroXml, inRoomXml;
                    if (macroPath != null) {
                        const macroText = fs.readFileSync(macroPath, {encoding:'utf-8'});
                        log.info("Reading Macro file: " + macroText);

                        macroXml = await xml.macroXml(macroName, macroText,macroActivate);

                        log.info("Macro name " + macroName);
                        log.info("MacroXML output: " + macroXml);
                    }
                    if (inRoomPath != null) {
                        const inRoomText = fs.readFileSync(inRoomPath, {encoding:'utf-8'});
                        inRoomXml = await xml.inRoomXml(inRoomText);
                    }

                    var promises = endpointArray.map(async endpointIp => {
                        try {
                            const endpoint = {
                                ipAddress: endpointIp,
                                username: username,
                                password: password,
                            };
                            let tp = new Endpoint(endpoint);

                            if (macroPath != null) {
                                await tp.postXML(macroXml);
                            }
                            if (inRoomPath != null) {
                                log.info(inRoomXml);
                                await tp.postXML(inRoomXml);
                            }
                            if (wallpaperPath != null) {
                                await tp.postWallpaper(wallpaperPath);
                            }

                        } catch (e) {
                            log.error("Deployment error :"+e);
                            errorLog.push(e);

                        }
                    });

                    const results = await Promise.all(promises);

                    resolve(errorLog);

                } catch (e) {
                    log.error(e);
                    reject(e)
                }
            })()
        })
    }
    return {
        deployEndpoints: deployEndpoints,
        deployMacros: deployMacros,
    }
}();