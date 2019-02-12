const excel = require('./excel');
const Endpoint = require('./endpoint');
const xml = require('./buildXml');
const fs = require('fs');
const log = require('electron-log');
const image64 = require('./image64');
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
    function deployMacros(deploymentData) {
        return new Promise((resolve, reject) => {
            (async () => {
                try {
                    const [
                        username,
                        password,
                        macroPath,
                        macroName,
                        macroActivate,
                        inRoomPath,
                        wallpaperPath,
                        bBPath,
                        bLPath,
                        security
                    ] = deploymentData;

                    let  macroXml, inRoomXml, brandingXml;

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
                    if(bBPath != null && bLPath != null){
                        const branding64 = await image64.base64encode([bBPath, bLPath]);
                        brandingXml = await xml.brandingXml(branding64);
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
                                await tp.postXML(macroXml, security);
                            }
                            if (inRoomPath != null) {
                                log.info(inRoomXml);
                                await tp.postXML(inRoomXml,security);
                            }
                            if (wallpaperPath != null) {
                                await tp.postWallpaper(wallpaperPath, security);
                            }
                            if(bBPath != null && bLPath != null){
                                await tp.postXML(brandingXml, security)
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
    function checkCredentials(username, password, ip, security) {
        return new Promise((resolve, reject) =>{
            (async () => {
                try{
                    const endpoint = {
                        ipAddress: ip,
                        username: username,
                        password: password,
                    };
                    let tp = new Endpoint(endpoint);
                    const pollEndpoint = tp.checkStatus(security);
                    resolve(pollEndpoint);
                }catch(e){
                    log.error(e);
                    reject("Failed to authenticate")
                }

            })()
        })
    }
    return {
        deployEndpoints: deployEndpoints,
        deployMacros: deployMacros,
        checkCredentials: checkCredentials,
    }
}();