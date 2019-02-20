const ipcRenderer = require('electron').ipcRenderer;
const log = require('electron-log');

function sendForm(event){
    log.info('FormSubmitted'+event);
    var macro = null;
    var inRoom = null;
    var panelName;
    var wallpaper = null;
    var brandingBackground = null;
    var brandingLogo = null;
    var brandingHalfAwake = null;
    var macroName;
    var macroActivate = false;
    var deploymentMethod = null;
    event.preventDefault(); // stop the form from submitting
    let user = document.getElementById("username").value;
    let pwd = document.getElementById("password").value;
    let endpointCSV = document.getElementById("endpointCSV").files[0].path;
    if(document.getElementById("secureDeployment").checked === true){
        deploymentMethod = 'secure';
    };
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
        panelName =document.getElementById("panelName").value;
    }
    if(document.getElementById("wallpaperCheck").checked === true){
        wallpaper = document.getElementById("wallpaper").files[0].path;
    }
    if(document.getElementById("brandingCheck").checked === true){
        brandingBackground = document.getElementById("brandingBackground").files[0].path;
        brandingLogo = document.getElementById("brandingLogo").files[0].path;
        if(document.getElementById("brandingHalfAwake").files.length == 0){
            brandingHalfAwake = document.getElementById("brandingLogo").files[0].path;
        }else{
            brandingHalfAwake = document.getElementById("brandingHalfAwake").files[0].path;
        }
    }

    log.info("Data: "+user+ macro+macroName+macroActivate+inRoom+endpointCSV+ wallpaper);
    ipcRenderer.send('form-submission',
        [
            user,
            pwd,
            macro,
            macroName,
            macroActivate,
            inRoom,
            panelName,
            endpointCSV,
            wallpaper,
            brandingBackground,
            brandingLogo,
            brandingHalfAwake,
            deploymentMethod
        ]);
    macroActivate = false;
}

function checkCredentials(event){
    event.preventDefault();
    let user = document.getElementById("username").value;
    let pwd = document.getElementById("password").value;
    let endpointCSV = document.getElementById("endpointCSV").files[0].path;
    let deploymentMethod = null;
    if(document.getElementById("secureDeployment").checked === true){
        deploymentMethod = 'secure';
    };
    ipcRenderer.send('check-id', [user, pwd, endpointCSV, deploymentMethod]);
}

ipcRenderer.on('consoleOutput',(evt, message) => {
    document.getElementById('log-output').innerHTML = message;
});

ipcRenderer.on('checkOutput',(evt, message) => {
    if(message === "Authentication was a success"){
        document.getElementById('h5-output').className = "p-3 mb-2 bg-success text-white";
        document.getElementById('h5-output').innerHTML = message;
    }else{
        document.getElementById('h5-output').className = "p-3 mb-2 bg-danger text-white";
        document.getElementById('h5-output').innerHTML = message;
    }

});

ipcRenderer.on('progressOutput',(evt, message) => {
    document.getElementById('progressBar').style = "width: "+message;
});

