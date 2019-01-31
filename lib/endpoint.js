"use strict";

const ciscoTPClient = require('cisco-tp-client');
const log = require('../logging/logger');
const EventEmitter = require('events');
const _ = require('lodash');



module.exports = class TPXapi extends EventEmitter {

    constructor(webUrl, endpoint) {

        super();

        this.username = endpoint.username;

        this.password = endpoint.password;


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
    deployMacro(macroXml) {
        new Promise((resolve, reject)=>{
            (async _ => {
                try{
                    this.postXml(macroXml);
                }catch(e){

                }
            })()
        })

    }
    deployRoomXML(roomXml) {
        new Promise((resolve, reject)=>{
            (async _ => {
                try{
                    this.postXml(roomXml)
                }catch(e){

                }
            })()
        })
    }
    postXml(xml) {
        return new Promise((resolve, reject) => {
            try {
                this.xapi.putXml(xml);
                resolve();

            } catch (e) {
                reject(e);
            }
        })
    }
}