const { app, BrowserWindow, ipcMain } = require('electron');
const path = require ('path');
const fs = require('fs');
const os = require('os');
const log = require('./logging/logger');
const deploy = require('./lib/deployment');


let window;

function createWindow(){
    window = new BrowserWindow({
        width:550,
        height: 700,
        show: false,
        resizable: true,//change to false later
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
            window.webContents.send('progressOutput', "25%");
            log.info(data);
            const [username, password,macrosPath,inRoomPath,csvPath, wallpaperPath] = data;
            log.info("25% completed");
            window.webContents.send('consoleOutput', "Reading CSV file and building endpoint list......");
            log.info(csvPath);

            window.webContents.send('progressOutput', "50%");
            const getEndpoints = await deploy.deployEndpoints(csvPath);
            log.info("50% completed");
            window.webContents.send('consoleOutput', getEndpoints[1]);

            window.webContents.send('progressOutput', "75%");
            window.webContents.send('consoleOutput', "Deploying Files ......");

            const deployFiles = await deploy.deployMacros(username, password, macrosPath, inRoomPath, wallpaperPath);
            log.info("100% completed");
            window.webContents.send('progressOutput', "100%");
            window.webContents.send('consoleOutput', "Deployment Completed with "+deployFiles.length+ " errors. Check logs for details.");
        }catch (e){
            log.error("Failure on Main:"+ e);
            window.webContents.send('consoleOutput',"Error occurred: "+ e)
        }
    })();
});



app.on('ready', function(){
    createWindow();
});

