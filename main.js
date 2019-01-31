const { app, BrowserWindow, ipcMain } = require('electron');
const path = require ('path');
const fs = require('fs');
const os = require('os');
const log = require('./logging/logger');
const deploy = require('./lib/deployment');

let window;

function createWindow(){
    window = new BrowserWindow({
        width:1200,
        height: 725,
        show: false
    });

    window.loadURL(`file://${__dirname}/index.html`);
    window.once('ready-to-show', function (){
        window.show();
    });

    window.webContents.openDevTools();

    let contents = window.webContents;

    window.on('closed', function() {
        window = null;
    });
}

ipcMain.on('form-submission', function (event, data) {
    (async  _ => {
        try{

            const {username, password,macrosPath,inRoomPath,csvPath,} = data;
            window.webContents.send('consoleOutput', "Reading CSV file and building endpoint list......");
            await deploy.deployEndpoints(csvPath);
            window.webContents.send('consoleOutput', "Next step deploying Macros and InRoom Controls......")
            await deploy.deployMacros(username, password, macrosPath, inRoomPath);
            window.webContents.send('consoleOutput', "Uploading Macros.......");


        }catch (e){

        }
    })();
});

app.on('ready', function(){
    createWindow();
});

