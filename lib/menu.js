const electron = require('electron');

const { app, shell } = electron;
const homedir = require('os').homedir();
const path = require('path');

module.exports = mainWindow => {
    const template = [
        {
            label: 'Tools',
            submenu: [
                {
                    label: 'Open Log File',
                    click: () => {
                        if(process.platform === "darwin"){
                            console.log(`${homedir}/Library/Logs/CE-Deploy/log.log`);
                            return shell.openItem(`${homedir}/Library/Logs/CE-Deploy/log.log`);
                        }
                        if(process.platform === "win32"){
                            console.log(`${homedir}/AppData/Roaming/CE-Deploy/log.log`);
                            return shell.openItem(path.join(homedir,'AppData/Roaming/CE-Deploy','log.log'));
                        }
                    },


                },
                { type: 'separator' },
                {
                    label: 'GitHub Repo',
                    click: _ => { shell.openExternal('https://github.com/voipnorm') }
                }
            ]
        }
    ]

    if (process.platform === 'darwin') {
        const name = app.getName()
        template.unshift({
            label: name,
            submenu: [
                {
                    label: 'About ' + name,
                    role: 'about'
                },
                { type: 'separator' },
                {
                    label: 'Hide ' + name,
                    accelerator: 'Command+H',
                    role: 'hide'
                },
                {
                    label: 'Hide Others',
                    accelerator: 'Command+Shift+H',
                    role: 'hideothers'
                },
                {
                    label: 'Show All',
                    role: 'unhide'
                },
                { type: 'separator' },
                {
                    label: 'Quit',
                    accelerator: 'Command+Q',
                    click: _ => { app.quit() }
                }
            ]
        })
    }

    return template
}