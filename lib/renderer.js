const ipcRenderer = require('electron').ipcRenderer;
const log = require('electron-log');

function sendForm(event){
    log.info('FormSubmitted'+event);
    var macro = null;
    var inRoom = null;
    var wallpaper = null;
    var macroName;
    var macroActivate = false;
    event.preventDefault(); // stop the form from submitting
    let user = document.getElementById("username").value;
    let pwd = document.getElementById("password").value;
    let endpointCSV = document.getElementById("endpointCSV").files[0].path;
    log.info(document.getElementById("macroCheck").checked === true);
    if(document.getElementById("macroCheck").checked === true){
        macro = document.getElementById("macro").files[0].path;
        macroName = document.getElementById("macroName").value;
        if(document.getElementById("macroActivateCheck").checked === true){
            macroActivate = true;
            log.info("Activate Macro on Deployment true");
        }
    }
    if(document.getElementById("inRoomCheck").checked === true){
        inRoom = document.getElementById("inRoom").files[0].path;
    }
    if(document.getElementById("wallpaperCheck").checked === true){
        wallpaper = document.getElementById("wallpaper").files[0].path;
    }
    log.info("Data: "+user+ macro+macroName+macroActivate+inRoom+endpointCSV+ wallpaper);
    ipcRenderer.send('form-submission', [user, pwd,macro,macroName,macroActivate,inRoom,endpointCSV, wallpaper]);
    macroActivate = false;
}

ipcRenderer.on('consoleOutput',(evt, message) => {
    document.getElementById('log-output').innerHTML = message;
});

ipcRenderer.on('progressOutput',(evt, message) => {
    document.getElementById('progressBar').style = "width: "+message;
});

