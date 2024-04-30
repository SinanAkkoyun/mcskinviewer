# minecraft-skin-electron.js
![sample text: mlg 360 noscope](https://github.com/SinanAkkoyun/minecraft-skin-electron.js/blob/main/assets/preview_window.png?raw=true)

Simply display a minecraft skin in a new electron window.

## Usage
```javascript
const {openSkinViewer} = require('minecraft-skin-electron.js')

openSkinViewer('/path/to/skin.png', 'PlayerName')
```

It will automatically serve the website if no server is currently running.

# DISCLAIMER
This project was quickly hacked together and has not been tested in any way, nor should this repo provide any value outside of my specific usecase. Use at your own risk.