const { app, BrowserWindow, ipcMain, Menu } = require('electron');
const path = require ('path');
const fs = require('fs');
const os = require('os');
const deploy = require('./deployment');
const menuTemplate = require('./menu');
const log = require('electron-log');

let window;

function createWindow(){
    window = new BrowserWindow({
        width:575,
        height: 700,
        show: false,
        resizable: true,//change to false later
    });

    window.loadURL(`file://${__dirname}/index.html`);
    window.once('ready-to-show', function (){
        window.show();
    });

    //window.webContents.openDevTools();

    let contents = window.webContents;
    const menuContents = Menu.buildFromTemplate(menuTemplate(window));
    Menu.setApplicationMenu(menuContents);

    window.on('closed', function() {
        window = null;
    });
}

ipcMain.on('form-submission', (event, data) => {
    (async  _ => {
        try{
            window.webContents.send('progressOutput', "25%");
            log.info(data);
            const [username, password,macrosPath,macroName,macroActivate,inRoomPath,panelName,csvPath, wallpaperPath, bBPath,bLPath,bHWPath,security] = data;
            log.info("25% completed");
            window.webContents.send('consoleOutput', "Reading CSV file and building endpoint list......");
            log.info(csvPath);

            window.webContents.send('progressOutput', "50%");
            const getEndpoints = await deploy.deployEndpoints(csvPath);
            log.info("50% completed");
            window.webContents.send('consoleOutput', getEndpoints[1]);

            window.webContents.send('progressOutput', "75%");
            window.webContents.send('consoleOutput', "Deploying Files ......");

            const deploymentData = [
                username,
                password,
                macrosPath,
                macroName,
                macroActivate,
                inRoomPath,
                panelName,
                wallpaperPath,
                bBPath,
                bLPath,
                bHWPath,
                security
            ];

            const deployFiles = await deploy.deployMacros(deploymentData);
            log.info("100% completed");
            window.webContents.send('progressOutput', "100%");
            window.webContents.send('consoleOutput', "Deployment Completed with "+deployFiles.length+ " errors. Check logs for details.");
        }catch (e){
            log.error("Failure on Main:"+ e);
            window.webContents.send('consoleOutput',"Error occurred: "+ e)
        }
    })();
});

ipcMain.on('check-id', (event, data) => {
    (async _ => {
        try{
            const [username, password,csvPath, security] = data;
            //get IP address of single endpoint
            log.info(`Check-id ${csvPath}`);

            const getEndpoints = await deploy.deployEndpoints(csvPath);
            const endpointIP = getEndpoints[0][0];

            log.info(`Check-id ${endpointIP}`);

            const checkCreds = await deploy.checkCredentials(username,password,endpointIP,security);

            window.webContents.send('checkOutput', checkCreds);

        }catch(e){
            log.error("Failure on Check-id: "+ e);
            window.webContents.send('checkOutput', e);
        }
    })();
});

app.on('ready', function(){
    createWindow();
});

