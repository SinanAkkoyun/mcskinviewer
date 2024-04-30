const minecraftSkinViewer = require('./viewer.js');
const server = require('./app.js');
const { spawn } = require('child_process');
const { join } = require('path');

function openSkinViewer(skinPath, name) {
  // Resolve the path to the `electron` binary in the local project
  const electronPath = join(__dirname, 'node_modules', '.bin', 'electron');

  // Resolve the path to the `viewer.js` file within the installed `minecraft-skin-preview` package
  // FOR TEST:
  // const minecraftSkinViewerPath = require.resolve('./main.js') 
  // PROD:
  const minecraftSkinViewerPath = require.resolve('minecraft-skin-preview.js/main.js');

  // Start the Electron process
  const electronProcess = spawn(electronPath, [minecraftSkinViewerPath, skinPath, name], { detached: true, stdio: 'ignore' });
  electronProcess.unref(); // Allows the parent process to exit without waiting for the child process
}

function openSkin(image_path, name) {
  (async () => {
    if(!(await server.isServing())) {
      // console.log('started server')
      server.serve('public')
    }
  })()
  // Open the viewer with the specified image
  minecraftSkinViewer.open(image_path, name)
}

module.exports = { openSkin, openSkinViewer }