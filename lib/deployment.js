const excel = require('./excel');
const Endpoint = require('./endpoint');
const xml = require('./buildXml');
const fs = require('fs');
const log = require('electron-log');
const image64 = require('./image64');
const homedir = require('os').homedir();
const path = require('path');
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
                        panelConfigName,
                        inRoomDeployment,
                        endpointCSV,
                        wallpaperPath,
                        bBPath,
                        bLPath,
                        bHWPath,
                        security,
                        logs,
                        signage,
                        webexTouch
                    ] = deploymentData;

                    let  macroXml, inRoomXml, brandingXML, logDir, signageXml, webexTouchXml;

                    if(signage != null){
                        signageXml = await xml.signageXML(signage);
                        log.info(signageXml);
                    }

                    if (macroPath != null) {
                        const macroText = fs.readFileSync(macroPath, {encoding:'utf-8'});
                        log.info("Reading Macro file: " + macroText);

                        macroXml = await xml.macroXml(macroName, macroText,macroActivate);

                        log.info("Macro name " + macroName);
                        log.info("MacroXML output: " + macroXml);
                    }
                    //Single Panel deployment
                    if (inRoomPath != null) {
                        const inRoomText = fs.readFileSync(inRoomPath, {encoding:'utf-8'});
                        if(inRoomDeployment === 'config'){
                            inRoomXml = await xml.inRoomConfigXml(inRoomText,panelConfigName);
                        }else{
                            inRoomXml = await xml.inRoomPanelXml(inRoomText,panelConfigName);
                        }

                    }
                    if(bBPath != null && bLPath != null){
                        const branding64 = await image64.base64encode([bBPath, bLPath, bHWPath]);
                        brandingXML = await xml.brandingXml(branding64);
                    }
                    if(logs === 'true'){
                        if(process.platform === "darwin"){
                            logDir = `${homedir}/Library/Logs/CE-Deploy/download/`;
                        }
                        if(process.platform === "win32"){
                            logDir = path.join(homedir,'AppData/Roaming/CE-Deploy/download/');
                        }
                        if(process.platform === 'linux'){
                            logDir = `${homedir}/.config/CE-Deploy/download/`
                        }

                        fs.mkdir(logDir, (err) => {
                            if(err){
                                log.error('Log directory creation error: '+err)
                            }
                        });
                    }
                    if(webexTouch === 'true'){
                        webexTouchXml = await xml.webBoardTouch();
                    }
                    //Run through deployment options for each endpoint
                    var promises = endpointArray.map(async endpointIp => {
                        try {
                            const endpoint = {
                                ipAddress: endpointIp,
                                username: username,
                                password: password,
                            };
                            let tp = new Endpoint(endpoint);
                            if(signage != null){
                                await tp.postXML(signageXml,security);
                            }
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
                                log.info(security);
                                await tp.disableWallpaper(security);
                                await tp.postXML(brandingXML, security);
                            }
                            if(logs === 'true'){
                                await tp.dlLogs(logDir);
                            }
                            if(webexTouch === 'true'){
                                //do stuff
                                await tp.postXML(webexTouchXml, security);
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