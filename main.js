const { BrowserWindow, app } = require("electron")
const path = require('path')

// we need the dotenv to load all env variables in .env file to the process.env object
const dotenv = require('dotenv')

dotenv.config()

const isDev = process.env.NODE_ENV ? process.env.NODE_ENV === 'development': ""


function createMainWindow(){
    const mainWindow = new BrowserWindow({
        width: isDev ? 1200: 8000,
        height:600,
        webPreferences:{
            nodeIntegration:true,
            preload: path.join(__dirname, 'preload.js')
        }
    })
    // mainWindow.loadFile(path.join(__dirname, '/e-permit/public/index.html'))
    mainWindow.loadURL(`http://localhost:3000/`)

    // optionally load the dev tools while we are in the development environment
    if(isDev){
        mainWindow.webContents.openDevTools();
    }
}

app.whenReady().then(() => {
    createMainWindow()

    app.on('activate', () => {
        if(BrowserWindow.getAllWindows().length !== 0){
            createMainWindow();
        }
    })
})

app.on('window-all-closed', ()=>{
    if(process.platform !== 'darwin') {
        app.quit()
    }
})