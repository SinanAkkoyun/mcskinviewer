// viewer.js
const { app, BrowserWindow } = require('electron');
const fs = require('fs');
const path = require('path');
const server = require('./app.js');

let mainWindow = null;

function openViewer(skinPath, name) {
    const createWindow = () => {
        // Create the browser window.
        mainWindow = new BrowserWindow({
            width: 600,
            height: 800,
            frame: true,
            title: "Generated Skin Preview",
            webPreferences: {
                nodeIntegration: true,
                contextIsolation: false
            },
            autoHideMenuBar: true
        });

        let base64Image = null;
        if (skinPath) {
            // Read the file synchronously and convert it to Base64
            const image = fs.readFileSync(path.resolve(skinPath));
            base64Image = `data:image/png;base64,${image.toString('base64')}`;
        }

        const url = `http://localhost:3040/index.html?skin=${encodeURIComponent(base64Image)}&name=${encodeURIComponent(name)}`;
        mainWindow.loadURL(url);
        mainWindow.setAlwaysOnTop(true, 'normal');

        // Listen for the window being closed
        mainWindow.on('closed', () => {
            // Close the server if it's running
            if (server.isServing()) {
                server.close();
            }
            // Quit the app when all windows are closed
            app.quit();
            process.exit()
        });
    };

    app.on('ready', createWindow);

    app.on('window-all-closed', () => {
        if (process.platform !== 'darwin') {
            app.quit();
        }
    });

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
}

module.exports = { open: openViewer };
