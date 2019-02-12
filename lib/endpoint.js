"use strict";

const ciscoTPClient = require('cisco-tp-client');
const EventEmitter = require('events');
const _ = require('lodash');
const request = require('request');
const fs = require('fs');
const log = require('electron-log');

module.exports = class TPXapi extends EventEmitter {

    constructor(endpoint) {

        super();

        this.username = endpoint.username;

        this.password = endpoint.password;

        this.baseUrl = `http://${endpoint.ipAddress}`;

        this.secureBaseUrl = `https://${endpoint.ipAddress}`;

        this.secureWebWallpaper = `https://${endpoint.ipAddress}/api/wallpapers`;

        this.nonSecureWebWallpaper = `http://${endpoint.ipAddress}/api/wallpapers`;

        this.endpoint = endpoint;

    }

    checkStatus(method) {
        return new Promise(async (resolve, reject) => {
            try {
                if (method === 'secure') {
                    await this.postRequest(null, this.secureBaseUrl + '/status.xml','GET');
                    resolve("Authentication was a success");
                } else {
                    await this.postRequest(null, this.baseUrl + '/status.xml', 'GET');
                    resolve("Authentication was a success");
                }

            } catch (e) {
                log.error("Endpoint failed to respond on Status check");
                reject("Authentication Failed");
            }

        })

    }
    postXML(xml, method){
        return new Promise(async (resolve, reject) =>{
            try{
                if(!xml || !method){
                    log.error("Xml or method not defined.");
                    reject("Xml or method not defined.")
                }
                if(method === 'secure'){
                    await this.postRequest(xml,this.secureBaseUrl+'/putxml','POST' );
                    resolve("Authentication was a success");
                }else{
                    await this.postRequest(xml,this.baseUrl+'/putxml','POST' );
                    resolve("Authentication was a success");
                }
            }catch(e){
                log.error(e);
                reject("Post failed");
            }

        })
    }
    postWallpaper(imgPath, method) {
        return new Promise((resolve, reject) => {
            log.info(imgPath);
            log.info("Posting wall paper");

            var filename = imgPath.split('/').pop();
            let url = this.nonSecureWebWallpaper;
            if(method === 'secure'){
                url = this.secureWebWallpaper;
            }
            var formData = {
                file: {
                    value: fs.createReadStream(imgPath),
                    options: {
                        filename: filename,
                        contentType: 'image/jpeg',
                    }
                }
            };
            log.info(JSON.stringify(formData));
            var r = request.post({
                url: url,
                rejectUnauthorized: false,
                formData: formData
            }, (err, httpResponse, body) => {
                if (err ) {
                    return reject(err);
                }
                if(httpResponse.statusCode == 401){
                    log.error(`${this.endpoint.ipAddress} rejected with ${body}`);
                    return reject(body);
                }
                log.info(httpResponse);
                log.info('Upload successful!  Server responded with Body Content: ' + body);
                resolve()
            }).auth(this.username, this.password, false);

        })
    }
    postRequest(xml, url,method, options){
        return new Promise(async (resolve, reject) => {
            var r = request({
                url: url,
                body: xml,
                method: method,
                rejectUnauthorized: false,
                followAllRedirects: true
            }, (err, httpResponse, body) => {
                if (err) {
                    //log.error('PostRequest failed to deliver.'+err);
                    return reject(err);
                }
                if (httpResponse.statusCode == 401) {
                    log.error(`${this.endpoint.ipAddress} rejected with ${body}`);
                    return reject(body);
                }
                //log.info(httpResponse);
                log.info('Upload successful!  Server responded with Body Content: ' + body);
                resolve('Upload successful!');
            }).auth(this.username, this.password, false);
        })

    }

}