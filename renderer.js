const ipcRenderer = require('electron').ipcRenderer;
const log = require('./logging/logger');

document.getElementById('deploy').addEventListener('click', (event) => {
    log.info('FormSubmitted'+event);
    var macro = null;
    var inRoom = null;
    var wallpaper = null;
    event.preventDefault(); // stop the form from submitting
    let user = document.getElementById("username").value;
    let pwd = document.getElementById("password").value;
    let endpointCSV = document.getElementById("endpointCSV").files[0].path;
    log.info(document.getElementById("macroCheck").checked === true);
    if(document.getElementById("macroCheck").checked === true){
        macro = document.getElementById("macro").files[0].path;
    }
    if(document.getElementById("inRoomCheck").checked === true){
        inRoom = document.getElementById("inRoom").files[0].path;
    }
    if(document.getElementById("wallpaperCheck").checked === true){
        wallpaper = document.getElementById("wallpaper").files[0].path;
    }
    log.info("Data: "+user+ pwd+macro+inRoom+endpointCSV+ wallpaper);
    ipcRenderer.send('form-submission', [user, pwd,macro,inRoom,endpointCSV, wallpaper]);
})

ipcRenderer.on('consoleOutput',(evt, message) => {
    document.getElementById('log-output').innerHTML = message;
});

ipcRenderer.on('progressOutput',(evt, message) => {
    document.getElementById('progressBar').style = "width: "+message;
});