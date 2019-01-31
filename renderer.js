const ipcRenderer = require('electron').ipcRenderer;


function sendForm(event) {
    console.log('FormSubmitted');
    event.preventDefault() // stop the form from submitting
    let user = document.getElementById("username").value;
    let pwd = document.getElementById("password").value;
    let macro = document.getElementById("macro").files[0].path;
    let inRoom = document.getElementById("inRoom").files[0].path;
    let endpointCSV = document.getElementById("endpointCSV").files[0].path;
    ipcRenderer.send('form-submission', [user, pwd,macro,inRoom,endpointCSV]);
}

ipcRenderer.on('consoleOutput',(evt, message) => {
    document.getElementById('log-output').innerHTML = message;
});