const { app, BrowserWindow } = require('electron');
const fs = require('fs');
const path = require('path');
const url = require('url');

function createWindow() {
    // Command line arguments processing
    const startArgIndex = 1 // process.argv[0].endsWith('electron') || process.argv[0].endsWith('electron.exe') ? 1 : 2;
    const argv = process.argv.slice(startArgIndex);

    let filePath = null;
    let name = null;

    // Parse arguments
    argv.forEach(arg => {
        if (arg.startsWith('name=')) {
            name = arg.split('=')[1];
        } else {
            filePath = arg; // Assume if it's not a named argument, it's the file path
        }
    });

    // Create the browser window.
    const mainWindow = new BrowserWindow({
        width: 600,
        height: 800,
        frame: true,
        title: "3D Skin Preview",
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        },
        autoHideMenuBar: true
    });

    // Read image into base64
    let base64Image = null;
    let imgFilePath
    if (filePath && filePath != '.') imgFilePath = filePath
    else imgFilePath = path.join(__dirname, 'assets', 'steve.png')

    const image = fs.readFileSync(imgFilePath);
    base64Image = `data:image/png;base64,${image.toString('base64')}`;

    // Load the index.html from the public folder
    const query = {
        //skin: encodeURIComponent(base64Image),
        //name: encodeURIComponent(name || '')
    };

    query.skin = encodeURIComponent(base64Image)
    if(name) query.name = encodeURIComponent(name)

    const indexUrl = url.format({
        pathname: path.join(__dirname, 'public', 'index.html'),
        protocol: 'file:',
        slashes: true,
        query: query
    });

    // Load the index.html with query parameters
    mainWindow.loadURL(indexUrl);

    // mainWindow.loadFile(path.join(__dirname, 'public', 'index.html'));

    // mainWindow.webContents.openDevTools();
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There,
// it's common for applications and their menu bar to stay active
// until the user quits explicitly with Cmd + Q.
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});


// const skinPath = process.argv[2] ?? '/home/ai/.mc/ai/skin/minecraft_skin_generator/kieling.png';