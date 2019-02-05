const electron = require('electron');

const { app } = electron


module.exports = mainWindow => {
    const template = [
        {
            label: 'Effects',
            submenu: [
                {
                    label: 'Cycle',


                },
                { type: 'separator' },
                {
                    label: 'TBD',

                },
                {
                    label: 'TBD',

                },
                {
                    label: 'TBD',

                },
                {
                    label: 'TBD',

                }
            ]
        },
        {
            label: 'View',
            submenu: [
                {
                    label: 'TBD',

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