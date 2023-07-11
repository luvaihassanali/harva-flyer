const { app, BrowserWindow } = require('electron')
const path = require('path')
const { ipcMain } = require('electron')
const Store = require('electron-store');
const store = new Store();

let mainWindow
function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 800,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })
    mainWindow.maximize()
    mainWindow.loadFile('index.html')
    //mainWindow.webContents.openDevTools()
}

app.whenReady().then(() => {
    createWindow()

    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
})

ipcMain.handle('custom-endpoint', async (event, data) => {
    //storage.clear()
    if (String(data).startsWith('data:image/png;base64,')) {
        let base64Data = data.replace(/^data:image\/png;base64,/, "");
        //console.log(base64Data)
        require("fs").writeFile(path.join(__dirname, '/assets/img/bg.png'), base64Data, 'base64', function (err) {
            console.log(err)
        })
    } else if (data == "ready") {
        let dataToSend = store.get('data')
        console.log("send: " + dataToSend)
        mainWindow.webContents.send('custom-endpoint', dataToSend);
    } else {
        console.log("recv: " + data);
        store.set('data', data)
    }
})