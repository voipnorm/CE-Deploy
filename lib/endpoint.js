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

        this.secureWebWallpaper = `https://${endpoint.ipAddress}/api/wallpapers`;

        this.nonSecureWebWallpaper = `http://${endpoint.ipAddress}/api/wallpapers`;

        this.xapi;

        this.endpoint = endpoint;

        this.init();

    }

    init() {
        this.auth();
    }

    auth() {
        //log.info(`IP info: ${this.endpoint.url||this.endpoint.ipAddress}`);
        this.xapi = new ciscoTPClient({
            username: this.username,
            password: this.password,
        }, this.endpoint.url || this.endpoint.ipAddress);
        return this;
    }
    checkStatus() {
        return new Promise((resolve,reject) => {
            (async () => {
                try {
                    const statusResponse = await this.xapi.getStatus();
                    log.info("Endpoint passed authentication check");
                    resolve("Authentication was a success");
                } catch (e) {
                    log.error("Endpoint failed to respond on Status check");
                    reject("Authentication Failed");
                }
            })()
        })

    }
    postXML(Xml) {
        return new Promise((resolve, reject) => {
            this.xapi.putXml(Xml)
                .then(result => {
                    log.info(result);
                    return resolve(result)
                })
                .catch(e => {
                    reject(e);
                })
        })

    }
    postWallpaper(imgPath) {
        return new Promise((resolve, reject) => {
            log.info(imgPath);
            log.info("Posting wall paper");
            var filename = imgPath.split('/').pop();

            var formData = {
                file: {
                    value: fs.createReadStream(imgPath),
                    options: {
                        filename: filename,
                        contentType: 'image/jpeg'
                    }
                }
            };
            log.info(JSON.stringify(formData));
            var r = request.post({
                url: `http://${this.endpoint.ipAddress}/api/wallpapers`,
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

}